"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { Home, Trophy, User, PlusCircle, Compass } from "lucide-react";

interface MobileNavProps {
  onOpenLogin?: () => void;
  onOpenRegister?: () => void;
}

export function MobileNav({ onOpenLogin, onOpenRegister }: MobileNavProps) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // No mostrar en la landing de bienvenida principal si corresponde
  if (pathname === "/") return null;

  const isFeed = pathname === "/blog" || pathname.startsWith("/question");
  const isRanking = pathname === "/ranking";
  const isProfile = session?.user && pathname.startsWith("/profile");

  return (
    <nav
      aria-label="Navegación Móvil Estilo Social"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur-xl border-t border-zinc-800/80 px-2 py-2 safe-area-bottom"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {/* Feed de Artículos */}
        <Link
          href="/blog"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            isFeed
              ? "text-teal-300 font-semibold scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div
            className={`p-1.5 rounded-xl ${
              isFeed ? "bg-teal-500/20 text-teal-300" : ""
            }`}
          >
            <Compass className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Debates</span>
        </Link>

        {/* Ranking */}
        <Link
          href="/ranking"
          className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
            isRanking
              ? "text-amber-300 font-semibold scale-105"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          <div
            className={`p-1.5 rounded-xl ${
              isRanking ? "bg-amber-500/20 text-amber-300" : ""
            }`}
          >
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-[10px] tracking-tight">Ranking</span>
        </Link>

        {/* Publicar si es Admin */}
        {session?.user?.role === "ADMIN" && (
          <Link
            href="/admin/new-question"
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl text-teal-400 hover:text-teal-300 transition-all"
          >
            <div className="p-1.5 rounded-xl bg-teal-500/10 border border-teal-500/30">
              <PlusCircle className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">Publicar</span>
          </Link>
        )}

        {/* Perfil o Iniciar Sesión */}
        {session?.user ? (
          <Link
            href={`/profile/${session.user.id}`}
            className={`flex flex-col items-center gap-1 py-1 px-3 rounded-2xl transition-all ${
              isProfile
                ? "text-teal-300 font-semibold scale-105"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <div
              className={`p-1.5 rounded-xl ${
                isProfile ? "bg-teal-500/20 text-teal-300" : ""
              }`}
            >
              <User className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">Perfil</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              if (onOpenRegister) onOpenRegister();
              else if (onOpenLogin) onOpenLogin();
            }}
            className="flex flex-col items-center gap-1 py-1 px-3 rounded-2xl text-zinc-400 hover:text-teal-300 transition-all cursor-pointer"
          >
            <div className="p-1.5 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-300">
              <User className="w-5 h-5" />
            </div>
            <span className="text-[10px] tracking-tight">Acceder</span>
          </button>
        )}
      </div>
    </nav>
  );
}
