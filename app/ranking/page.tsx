import React from "react";
import Link from "next/link";
import { getLeaderboard, RankedUser } from "@/lib/ranking";
import {
  Trophy,
  Medal,
  Award,
  Sparkles,
  TrendingUp,
  Linkedin,
  Globe,
  Share2,
  Mail,
  MessageSquare,
  ShieldCheck,
} from "lucide-react";

export const dynamic = "force-dynamic";

export default async function RankingPage() {
  const leaderboard = await getLeaderboard();

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* HEADER HERO */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
          <Trophy className="w-3.5 h-3.5" />
          <span>Leaderboard Científico Peer-to-Peer</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
          Ranking de Contribución & Impacto
        </h1>
        <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
          Puntuación calculada dinámicamente según el rigor y la repercusión de tus
          argumentos en la comunidad de la TECD.
        </p>
      </div>

      {/* TOP 3 PODIUM */}
      {leaderboard.length >= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end pt-4">
          {/* #2 Rank */}
          {leaderboard[1] && (
            <div className="glass-card rounded-3xl p-6 border border-zinc-700/60 text-center space-y-3 order-2 md:order-1">
              <div className="w-12 h-12 rounded-2xl bg-zinc-800 text-zinc-300 font-bold mx-auto flex items-center justify-center border border-zinc-600">
                #2
              </div>
              <div>
                <Link
                  href={`/profile/${leaderboard[1].id}`}
                  className="font-bold text-zinc-100 hover:text-teal-400 transition-colors text-base"
                >
                  {leaderboard[1].publicName}
                </Link>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {leaderboard[1].identityType === "ALIAS" ? "Alias" : "Nombre"}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center">
                <div className="text-2xl font-black text-zinc-200 font-mono">
                  {leaderboard[1].score}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  Puntos TECD
                </div>
              </div>
            </div>
          )}

          {/* #1 Rank (Gold - Center) */}
          {leaderboard[0] && (
            <div className="glass-card rounded-3xl p-8 border border-amber-500/40 text-center space-y-4 shadow-glow order-1 md:order-2 relative bg-gradient-to-b from-amber-500/10 via-zinc-950 to-zinc-950">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 text-zinc-950 font-black text-xl mx-auto flex items-center justify-center shadow-lg">
                👑 #1
              </div>
              <div>
                <Link
                  href={`/profile/${leaderboard[0].id}`}
                  className="font-extrabold text-lg text-white hover:text-amber-300 transition-colors"
                >
                  {leaderboard[0].publicName}
                </Link>
                <div className="text-[10px] text-amber-400/80 font-mono">
                  Líder de la Red • {leaderboard[0].identityType === "ALIAS" ? "Alias" : "Investigador"}
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-zinc-900/90 border border-amber-500/30 text-center">
                <div className="text-3xl font-black text-amber-400 font-mono">
                  {leaderboard[0].score}
                </div>
                <div className="text-[10px] text-amber-300/70 uppercase tracking-wider font-semibold">
                  Puntos Totales TECD
                </div>
              </div>
            </div>
          )}

          {/* #3 Rank */}
          {leaderboard[2] && (
            <div className="glass-card rounded-3xl p-6 border border-zinc-700/60 text-center space-y-3 order-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-900/30 text-amber-500 font-bold mx-auto flex items-center justify-center border border-amber-800/40">
                #3
              </div>
              <div>
                <Link
                  href={`/profile/${leaderboard[2].id}`}
                  className="font-bold text-zinc-100 hover:text-teal-400 transition-colors text-base"
                >
                  {leaderboard[2].publicName}
                </Link>
                <div className="text-[10px] text-zinc-500 font-mono">
                  {leaderboard[2].identityType === "ALIAS" ? "Alias" : "Nombre"}
                </div>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-center">
                <div className="text-2xl font-black text-zinc-200 font-mono">
                  {leaderboard[2].score}
                </div>
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                  Puntos TECD
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* COMPLETE TABLE */}
      <div className="glass-card rounded-3xl border border-zinc-800/80 overflow-hidden">
        <div className="p-5 border-b border-zinc-800/80 flex items-center justify-between">
          <h3 className="font-bold text-sm text-zinc-200 flex items-center gap-2">
            <Medal className="w-4 h-4 text-teal-400" />
            <span>Tabla General de Posiciones</span>
          </h3>
          <span className="text-xs font-mono text-zinc-500">
            {leaderboard.length} Investigadores clasificados
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-800/60 bg-zinc-900/40 text-zinc-400 uppercase font-mono tracking-wider text-[10px]">
                <th className="py-3.5 px-4 font-semibold text-center w-16">Pos</th>
                <th className="py-3.5 px-4 font-semibold">Identidad Pública</th>
                <th className="py-3.5 px-4 font-semibold text-center">Respuestas</th>
                <th className="py-3.5 px-4 font-semibold text-center">Debates Provocados</th>
                <th className="py-3.5 px-4 font-semibold text-center">Promedio Debates</th>
                <th className="py-3.5 px-4 font-semibold text-center">Score Total</th>
                <th className="py-3.5 px-4 font-semibold text-right">Contacto</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40">
              {leaderboard.map((user, idx) => {
                const pos = idx + 1;
                return (
                  <tr
                    key={user.id}
                    className="hover:bg-zinc-900/40 transition-colors"
                  >
                    {/* Rank */}
                    <td className="py-4 px-4 text-center font-mono font-bold text-zinc-300">
                      {pos === 1 && "🥇"}
                      {pos === 2 && "🥈"}
                      {pos === 3 && "🥉"}
                      {pos > 3 && `#${pos}`}
                    </td>

                    {/* Public Identity */}
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 border border-teal-500/30 flex items-center justify-center font-bold text-teal-300 text-[11px]">
                          {user.publicName.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <Link
                            href={`/profile/${user.id}`}
                            className="font-bold text-zinc-200 hover:text-teal-400 transition-colors"
                          >
                            {user.publicName}
                          </Link>
                          <div className="text-[10px] text-zinc-500 font-mono">
                            {user.identityType === "ALIAS" ? "Alias" : "Nombre Real"}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Total Answers */}
                    <td className="py-4 px-4 text-center font-mono text-zinc-300 font-semibold">
                      {user.totalAnswers}
                    </td>

                    {/* Debates received */}
                    <td className="py-4 px-4 text-center font-mono text-zinc-300">
                      {user.totalCommentsReceived}
                    </td>

                    {/* Average Debates */}
                    <td className="py-4 px-4 text-center font-mono text-teal-400/80">
                      {user.averageCommentsPerAnswer}
                    </td>

                    {/* Score */}
                    <td className="py-4 px-4 text-center">
                      <span className="font-mono font-black text-sm text-teal-300 bg-teal-500/10 px-2.5 py-1 rounded-full border border-teal-500/20">
                        {user.score}
                      </span>
                    </td>

                    {/* Public Social Links */}
                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 text-zinc-400">
                        {user.visibility?.linkedinUrl && (
                          <a
                            href={user.visibility.linkedinUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
                            title="LinkedIn"
                          >
                            <Linkedin className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {user.visibility?.genericSocialUrl && (
                          <a
                            href={user.visibility.genericSocialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
                            title="Red Social"
                          >
                            <Share2 className="w-3.5 h-3.5" />
                          </a>
                        )}
                        {user.visibility?.websiteUrl && (
                          <a
                            href={user.visibility.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                            title="Página Web"
                          >
                            <Globe className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
