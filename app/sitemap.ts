import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://aion-neural.vercel.app";

  // Páginas estáticas principales
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/ranking`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
  ];

  // Slugs canónicos de respaldo por si el entorno de compilación no tiene DB directa
  const fallbackSlugs = [
    "universo-red-informacion-binaria-it-from-bit",
    "tiempo-medida-entropica-medicion-fluida",
    "ecosistemas-categorias-traductores-functoriales",
    "invariantes-topologicas-robustez-ood",
    "metricas-diferenciables-escalares-difusos-smart",
    "ingenieria-disipativa-principio-minima-accion",
  ];

  let questionRoutes: MetadataRoute.Sitemap = [];

  try {
    const questions = await prisma.question.findMany({
      select: { slug: true, updatedAt: true },
    });

    if (questions.length > 0) {
      questionRoutes = questions.map((q) => ({
        url: `${baseUrl}/question/${q.slug}`,
        lastModified: q.updatedAt || new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));
    } else {
      questionRoutes = fallbackSlugs.map((slug) => ({
        url: `${baseUrl}/question/${slug}`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.9,
      }));
    }
  } catch {
    questionRoutes = fallbackSlugs.map((slug) => ({
      url: `${baseUrl}/question/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    }));
  }

  return [...staticRoutes, ...questionRoutes];
}
