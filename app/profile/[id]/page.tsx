import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";
import {
  User,
  Shield,
  Linkedin,
  Globe,
  Share2,
  Mail,
  Zap,
  MessageSquare,
  ArrowLeft,
  Calendar,
  CheckCircle2,
} from "lucide-react";

export const dynamic = "force-dynamic";

interface ProfilePageProps {
  params: {
    id: string;
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const user = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      visibility: true,
      answers: {
        include: {
          question: {
            select: {
              id: true,
              slug: true,
              title: true,
              category: true,
            },
          },
          comments: {
            select: { id: true, authorId: true },
          },
        },
        orderBy: { createdAt: "desc" },
      },
    },
  });

  if (!user) {
    notFound();
  }

  const totalAnswers = user.answers.length;
  let totalCommentsReceived = 0;
  user.answers.forEach((ans) => {
    totalCommentsReceived += ans.comments.filter((c) => c.authorId !== user.id).length;
  });

  const avgDebates = totalAnswers > 0 ? totalCommentsReceived / totalAnswers : 0;
  const rawScore = totalAnswers + avgDebates;
  const score = Math.round(rawScore * 100) / 100;

  const publicName =
    user.publicIdentityType === "ALIAS" && user.alias ? user.alias : user.name;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <Link
          href="/ranking"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver al Ranking</span>
        </Link>
      </div>

      {/* PROFILE HEADER CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-zinc-800/80 space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white text-2xl font-black shadow-glow">
              {publicName.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-white">
                  {publicName}
                </h1>
                <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  {user.publicIdentityType === "ALIAS" ? "Alias Público" : "Nombre Real"}
                </span>
                {user.role === "ADMIN" && (
                  <span className="text-xs font-mono px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/20">
                    Admin
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1 font-mono">
                <Calendar className="w-3.5 h-3.5 text-zinc-500" />
                <span>Investigador activo desde {formatDate(user.createdAt)}</span>
              </div>
            </div>
          </div>

          {/* SCORE PILL */}
          <div className="p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center min-w-[140px]">
            <div className="text-3xl font-black text-teal-400 font-mono">
              {score}
            </div>
            <div className="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">
              Puntaje TECD
            </div>
          </div>
        </div>

        {/* STATS ROW */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-6 border-t border-zinc-800/80">
          <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="text-xl font-bold text-zinc-100 font-mono">
              {totalAnswers}
            </div>
            <div className="text-xs text-zinc-400">Respuestas Publicadas</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800">
            <div className="text-xl font-bold text-zinc-100 font-mono">
              {totalCommentsReceived}
            </div>
            <div className="text-xs text-zinc-400">Debates Recibidos</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800 col-span-2 sm:col-span-1">
            <div className="text-xl font-bold text-teal-400 font-mono">
              {Math.round(avgDebates * 100) / 100}
            </div>
            <div className="text-xs text-zinc-400">Ratio Debates/Respuesta</div>
          </div>
        </div>

        {/* PUBLIC CONTACT & LINKS (Configured in Step 3) */}
        <div className="pt-4 border-t border-zinc-800/80 space-y-2">
          <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider font-mono">
            Canales de Contacto Verificados
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {user.visibility?.showEmail && (
              <a
                href={`mailto:${user.email}`}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-teal-300 hover:border-teal-500/40 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-teal-400" />
                <span>{user.email}</span>
              </a>
            )}
            {user.visibility?.linkedinUrl && (
              <a
                href={user.visibility.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-blue-400 hover:border-blue-500/40 transition-colors"
              >
                <Linkedin className="w-3.5 h-3.5 text-blue-400" />
                <span>LinkedIn</span>
              </a>
            )}
            {user.visibility?.websiteUrl && (
              <a
                href={user.visibility.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
              >
                <Globe className="w-3.5 h-3.5 text-emerald-400" />
                <span>Web Personal</span>
              </a>
            )}
            {user.visibility?.genericSocialUrl && (
              <a
                href={user.visibility.genericSocialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-purple-400 hover:border-purple-500/40 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5 text-purple-400" />
                <span>Red Social</span>
              </a>
            )}

            {!user.visibility?.showEmail &&
              !user.visibility?.linkedinUrl &&
              !user.visibility?.websiteUrl &&
              !user.visibility?.genericSocialUrl && (
                <span className="text-zinc-500 italic text-xs">
                  Este investigador mantiene sus canales de contacto en modo privado.
                </span>
              )}
          </div>
        </div>
      </div>

      {/* USER ANSWERS HISTORY */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-zinc-100 flex items-center gap-2">
          <Zap className="w-5 h-5 text-teal-400" />
          <span>Historial de Contribuciones ({user.answers.length})</span>
        </h2>

        {user.answers.length === 0 ? (
          <div className="glass-card rounded-3xl p-8 text-center text-zinc-500 text-xs border border-zinc-800">
            Aún no ha registrado respuestas en el feed científico.
          </div>
        ) : (
          <div className="space-y-4">
            {user.answers.map((ans) => (
              <div
                key={ans.id}
                className="glass-card rounded-3xl p-6 border border-zinc-800/80 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-teal-500/10 text-teal-300 border border-teal-500/20">
                    {ans.question.category}
                  </span>
                  <span className="text-[11px] text-zinc-500 font-mono">
                    {formatDate(ans.createdAt)}
                  </span>
                </div>

                <Link
                  href={`/question/${ans.question.slug}`}
                  className="block font-bold text-sm text-zinc-200 hover:text-teal-300 transition-colors"
                >
                  En respuesta a: "{ans.question.title}"
                </Link>

                <p className="text-xs text-zinc-400 leading-relaxed bg-zinc-950/40 p-3.5 rounded-2xl border border-zinc-900">
                  {ans.content}
                </p>

                <div className="text-[11px] text-zinc-500 font-mono flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{ans.comments.length} debates generados</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
