import React from "react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  Atom,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Search,
  Filter,
  Users,
  Compass,
  Zap,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface HomePageProps {
  searchParams?: {
    categoria?: string;
    q?: string;
  };
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const selectedCategory = searchParams?.categoria || "Todas";
  const searchFilter = searchParams?.q || "";

  // Fetch Questions from Database
  const questions = await prisma.question.findMany({
    where: {
      AND: [
        selectedCategory !== "Todas"
          ? {
              category: {
                contains: selectedCategory,
                mode: "insensitive" as any,
              },
            }
          : {},
        searchFilter
          ? {
              OR: [
                { title: { contains: searchFilter, mode: "insensitive" as any } },
                { summary: { contains: searchFilter, mode: "insensitive" as any } },
              ],
            }
          : {},
      ],
    },
    include: {
      author: {
        select: {
          name: true,
          publicIdentityType: true,
          alias: true,
        },
      },
      answers: {
        select: {
          id: true,
          comments: {
            select: { id: true },
          },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  // Global counts for metrics banner
  const totalQuestions = await prisma.question.count();
  const totalAnswers = await prisma.answer.count();
  const totalScientists = await prisma.user.count();

  const categories = [
    "Todas",
    "Ontología de Noción Única",
    "Medición por Contraste",
    "Atracción y SMART",
    "Tiempo Fluidificado",
    "Síntesis Global",
  ];

  return (
    <div className="space-y-10">
      {/* HERO BANNER - Jobgio / Kowalski Refined Style */}
      <section className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-zinc-800/80 bg-gradient-to-b from-zinc-900/90 via-zinc-950/90 to-zinc-950">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Red Social & Think-Tank de Ciencia de Datos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Teoría de la Emergencia Categorial Disipativa{" "}
            <span className="bg-gradient-to-r from-teal-400 via-teal-300 to-indigo-400 bg-clip-text text-transparent">
              (TECD)
            </span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Plataforma peer-to-peer donde científicos e investigadores debaten
            preguntas fundamentales: ¿emerge el espaciotiempo de redes de información binaria?
            Aporta hipótesis, discute con colegas y escala en el ranking científico.
          </p>
        </div>

        {/* METRICS PILLS (Reflects Jobgio floating pills) */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-zinc-800/60">
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="text-2xl font-black text-teal-400 font-mono">
              {totalQuestions}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">Dilemas Oficiales</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="text-2xl font-black text-indigo-400 font-mono">
              {totalAnswers}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">Respuestas Emitidas</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="text-2xl font-black text-purple-400 font-mono">
              {totalScientists}
            </div>
            <div className="text-xs text-zinc-400 mt-0.5">Científicos Activos</div>
          </div>
          <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
            <div className="text-2xl font-black text-emerald-400 font-mono">5</div>
            <div className="text-xs text-zinc-400 mt-0.5">Intersecciones TECD</div>
          </div>
        </div>
      </section>

      {/* FILTER PILLS BAR */}
      <section className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive =
              (cat === "Todas" && (!searchParams?.categoria || searchParams.categoria === "Todas")) ||
              searchParams?.categoria === cat;

            return (
              <Link
                key={cat}
                href={cat === "Todas" ? "/" : `/?categoria=${encodeURIComponent(cat)}`}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-teal-500 text-zinc-950 shadow-glow font-bold"
                    : "bg-zinc-900/80 text-zinc-400 hover:text-zinc-200 border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </section>

      {/* FEED DE PREGUNTAS Y DEBATES */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <Compass className="w-5 h-5 text-teal-400" />
            <span>Feed Principal de Preguntas & Nodos Sociales</span>
          </h2>
          <span className="text-xs font-mono text-zinc-500">
            {questions.length} publicaciones encontradas
          </span>
        </div>

        {questions.length === 0 ? (
          <div className="glass-card rounded-3xl p-12 text-center border border-zinc-800 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-zinc-800/80 text-zinc-400 mx-auto flex items-center justify-center">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-zinc-200">
              No hay publicaciones en esta categoría todavía
            </h3>
            <p className="text-xs text-zinc-500">
              Pronto el administrador publicará nuevos dilemas de la TECD.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5">
            {questions.map((question) => {
              const totalDebatesInQuestion = question.answers.reduce(
                (acc, ans) => acc + ans.comments.length,
                0
              );

              return (
                <div
                  key={question.id}
                  className="group relative rounded-3xl p-6 sm:p-8 bg-zinc-950/80 border border-zinc-800/80 hover:border-teal-500/40 transition-all duration-300 space-y-4 hover:shadow-2xl shadow-zinc-950"
                >
                  {/* Category Pill & Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
                      {question.category}
                    </span>

                    <div className="flex items-center gap-3 text-xs text-zinc-500 font-mono">
                      <span>Publicado por {question.author.name}</span>
                      <span>•</span>
                      <span>{formatDate(question.createdAt)}</span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-2">
                    <Link href={`/question/${question.slug}`}>
                      <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 group-hover:text-teal-300 transition-colors">
                        {question.title}
                      </h3>
                    </Link>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-2">
                      {question.summary}
                    </p>
                  </div>

                  {/* Social Node Counters & Action */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                    <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
                      <div className="flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-teal-400" />
                        <span className="font-bold text-zinc-200">
                          {question.answers.length}
                        </span>{" "}
                        respuestas
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageSquare className="w-4 h-4 text-indigo-400" />
                        <span className="font-bold text-zinc-200">
                          {totalDebatesInQuestion}
                        </span>{" "}
                        debates
                      </div>
                    </div>

                    <Link
                      href={`/question/${question.slug}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 hover:bg-teal-500/20 text-zinc-200 hover:text-teal-300 border border-zinc-800 hover:border-teal-500/40 text-xs font-semibold transition-all group-hover:translate-x-1"
                    >
                      <span>Participar en el Debate</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
