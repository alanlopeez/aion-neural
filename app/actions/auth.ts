"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
  publicIdentityType: "USERNAME" | "ALIAS";
  alias?: string;
  showEmail: boolean;
  linkedinUrl?: string;
  genericSocialUrl?: string;
  websiteUrl?: string;
  legalConsent: boolean;
}

export async function registerUser(data: RegisterInput) {
  try {
    const {
      name,
      email,
      password,
      publicIdentityType,
      alias,
      showEmail,
      linkedinUrl,
      genericSocialUrl,
      websiteUrl,
      legalConsent,
    } = data;

    if (!legalConsent) {
      return {
        success: false,
        error: "Debes aceptar el consentimiento legal y ético obligatorio para participar.",
      };
    }

    if (!email || !password || !name) {
      return { success: false, error: "Nombre, email y contraseña son obligatorios." };
    }

    if (password.length < 8) {
      return {
        success: false,
        error: "La contraseña debe tener al menos 8 caracteres para garantizar la seguridad del perfil.",
      };
    }

    if (publicIdentityType === "ALIAS" && (!alias || alias.trim().length === 0)) {
      return {
        success: false,
        error: "Si eliges usar un alias, debes especificarlo.",
      };
    }

    const cleanEmail = email.trim().toLowerCase();

    // Check existing user
    const existing = await prisma.user.findUnique({
      where: { email: cleanEmail },
    });

    if (existing) {
      return {
        success: false,
        error: "Ya existe un investigador registrado con este correo electrónico.",
      };
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 12);

    // Create user and profile visibility in a transaction
    const newUser = await prisma.user.create({
      data: {
        name: name.trim(),
        email: cleanEmail,
        passwordHash,
        publicIdentityType,
        alias: publicIdentityType === "ALIAS" ? alias?.trim() : null,
        ethicsAcceptedAt: new Date(),
        visibility: {
          create: {
            showEmail: !!showEmail,
            linkedinUrl: linkedinUrl?.trim() || null,
            genericSocialUrl: genericSocialUrl?.trim() || null,
            websiteUrl: websiteUrl?.trim() || null,
          },
        },
      },
      include: {
        visibility: true,
      },
    });

    return {
      success: true,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
      },
    };
  } catch (error: any) {
    console.error("Error en registro:", error);
    return {
      success: false,
      error: "Ocurrió un error inesperado al procesar el registro.",
    };
  }
}
