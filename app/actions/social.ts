"use server";

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitAnswer(questionId: string, content: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Debes iniciar sesión para publicar una respuesta." };
  }

  if (!content || content.trim().length < 10) {
    return {
      success: false,
      error: "La respuesta debe contener al menos 10 caracteres de análisis o fundamentación.",
    };
  }

  try {
    const answer = await prisma.answer.create({
      data: {
        content: content.trim(),
        questionId,
        authorId: session.user.id,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            publicIdentityType: true,
            alias: true,
            visibility: true,
          },
        },
      },
    });

    revalidatePath(`/question/${questionId}`);
    revalidatePath("/");
    revalidatePath("/ranking");

    return { success: true, answer };
  } catch (err: any) {
    console.error("Error al publicar respuesta:", err);
    return { success: false, error: "No se pudo guardar la respuesta." };
  }
}

export async function submitComment(answerId: string, content: string, parentId?: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "Debes iniciar sesión para debatir o comentar." };
  }

  if (!content || content.trim().length < 3) {
    return {
      success: false,
      error: "El comentario debe tener contenido válido.",
    };
  }

  try {
    const comment = await prisma.comment.create({
      data: {
        content: content.trim(),
        answerId,
        authorId: session.user.id,
        parentId: parentId || null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            publicIdentityType: true,
            alias: true,
          },
        },
      },
    });

    // Find questionId to revalidate page
    const answer = await prisma.answer.findUnique({
      where: { id: answerId },
      select: { question: { select: { slug: true } } },
    });

    if (answer?.question?.slug) {
      revalidatePath(`/question/${answer.question.slug}`);
    }
    revalidatePath("/ranking");

    return { success: true, comment };
  } catch (err: any) {
    console.error("Error al debatir:", err);
    return { success: false, error: "No se pudo publicar el comentario." };
  }
}

export async function createQuestion(data: {
  title: string;
  summary: string;
  content: string;
  category: string;
  intersectionNumber?: number;
}) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return { success: false, error: "No autenticado." };
  }

  if (session.user.role !== "ADMIN") {
    return {
      success: false,
      error: "Permiso denegado. Solo el Desarrollador/Administrador puede publicar preguntas oficiales.",
    };
  }

  if (!data.title || !data.content || !data.category) {
    return { success: false, error: "Faltan campos obligatorios." };
  }

  try {
    const slugBase = data.title
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    const slug = `${slugBase}-${Date.now().toString().slice(-4)}`;

    const question = await prisma.question.create({
      data: {
        title: data.title,
        slug,
        summary: data.summary,
        content: data.content,
        category: data.category,
        intersectionNumber: data.intersectionNumber || null,
        authorId: session.user.id,
      },
    });

    revalidatePath("/");
    return { success: true, question };
  } catch (err: any) {
    console.error("Error al crear pregunta:", err);
    return { success: false, error: "Error al publicar la pregunta en la base de datos." };
  }
}
