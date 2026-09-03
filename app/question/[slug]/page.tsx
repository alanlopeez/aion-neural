import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import { AnswerCard } from "@/components/social/AnswerCard";
import { AnswerEditor } from "@/components/social/AnswerEditor";
import {
  ArrowLeft,
  Atom,
  MessageSquare,
  Sparkles,
  Share2,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface QuestionPageProps {
  params: {
    slug: string;
  };
}

export default async function QuestionPage({ params }: QuestionPageProps) {
  const session = await getServerSession(authOptions);

  const question = await prisma.question.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          publicIdentityType: true,
          alias: true,
        },
      },
      answers: {
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
          comments: {
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
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!question) {
    notFound();
  }

  const totalDebates = question.answers.reduce(
    (acc, ans) => acc + ans.comments.length,
    0
  );

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Back button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al feed de preguntas</span>
        </Link>
      </div>

      {/* ARTICLE / QUESTION HEADER & BODY */}
      <article className="glass-card rounded-3xl p-6 sm:p-10 border border-zinc-800/80 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-semibold bg-teal-500/10 text-teal-300 border border-teal-500/20">
            {question.category}
          </span>
          <div className="text-xs text-zinc-500 font-mono">
            Publicado por {question.author.name} • {formatDate(question.createdAt)}
          </div>
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
          {question.title}
        </h1>

        <div className="p-4 rounded-2xl bg-teal-500/5 border border-teal-500/20 text-teal-200 text-sm italic">
          "{question.summary}"
        </div>

        {/* Full theoretical content */}
        <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-wrap font-sans space-y-4 pt-2">
          {question.content}
        </div>

        {/* Metadata Footer */}
        <div className="pt-6 border-t border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-teal-400" />
              {question.answers.length} Respuestas de la comunidad
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <MessageSquare className="w-4 h-4 text-indigo-400" />
              {totalDebates} Debates anidados
            </span>
          </div>
        </div>
      </article>

      {/* ANSWER SUBMISSION AREA */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-sm font-bold text-zinc-100">
          <HelpCircle className="w-4 h-4 text-teal-400" />
          <span>Tu Contribución / Respuesta Científica</span>
        </div>
        <AnswerEditor questionId={question.id} />
      </section>

      {/* USER ANSWERS (SOCIAL NODES) FEED */}
      <section className="space-y-6 pt-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-teal-400" />
            <span>Nodos de Respuesta & Hilos de Debate ({question.answers.length})</span>
          </h2>
        </div>

        {question.answers.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center border border-zinc-800/80 text-zinc-400 text-xs">
            Aún ningún investigador ha publicado una respuesta para este dilema. ¡Sé el primero en formular una hipótesis!
          </div>
        ) : (
          <div className="space-y-6">
            {question.answers.map((answer) => (
              <AnswerCard
                key={answer.id}
                answer={answer}
                currentUserId={session?.user?.id}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
