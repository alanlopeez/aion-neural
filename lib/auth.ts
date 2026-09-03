import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        identifier: { label: "Email o Usuario", type: "text" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Por favor ingresa tu identificador y contraseña.");
        }

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.identifier.toLowerCase() },
              { name: credentials.identifier },
            ],
          },
        });

        if (!user || !user.passwordHash) {
          throw new Error("Credenciales inválidas.");
        }

        const isValid = await bcrypt.compare(credentials.password, user.passwordHash);
        if (!isValid) {
          throw new Error("Contraseña incorrecta.");
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          publicIdentityType: user.publicIdentityType,
          alias: user.alias,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.publicIdentityType = user.publicIdentityType;
        token.alias = user.alias;
      }
      if (trigger === "update" && session) {
        token.role = session.role ?? token.role;
        token.publicIdentityType = session.publicIdentityType ?? token.publicIdentityType;
        token.alias = session.alias ?? token.alias;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.publicIdentityType = token.publicIdentityType as string;
        session.user.alias = token.alias as string | null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "tecd-super-secret-quantum-entropy-key-2026",
};
