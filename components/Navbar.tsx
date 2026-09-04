"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { useTheme } from "./providers/ThemeProvider";
import { RegisterModal } from "./auth/RegisterModal";
import { LoginModal } from "./auth/LoginModal";
import { MobileNav } from "./MobileNav";
import {
  Atom,
  Trophy,
  Moon,
  Sun,
  LogIn,
  UserPlus,
  PlusCircle,
  LogOut,
  Globe,
  Sparkles,
  UserCheck,
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { theme, toggleTheme } = useTheme();
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [lang, setLang] = useState<"ES" | "EN">("ES");

  if (pathname === "/") return null;

  const displayName =
    session?.user?.publicIdentityType === "ALIAS" && session?.user?.alias
      ? session.user.alias
      : session?.user?.name || "Investigador";

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-panel border-b border-zinc-800/80 transition-colors duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand */}
          <Link href="/blog" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
              <Atom className="w-5 h-5 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-zinc-100 via-teal-200 to-zinc-400 bg-clip-text text-transparent">
                  TECD
                </span>
                <span className="hidden sm:inline-block text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  Blog • Aion Neural
                </span>
              </div>
              <span className="text-[11px] text-zinc-400 hidden sm:block">
                Emergencia Categorial Disipativa
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-3 py-1.5 text-xs font-semibold rounded-full text-zinc-400 hover:text-teal-300 hover:bg-zinc-800/60 transition-colors border border-zinc-800"
            >
              ← Aion Neural
            </Link>
            <Link
              href="/blog"
              className="px-3.5 py-1.5 text-sm font-medium rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors"
            >
              Artículos & Debates
            </Link>
            <Link
              href="/ranking"
              className="px-3.5 py-1.5 text-sm font-medium rounded-full text-zinc-300 hover:text-white hover:bg-zinc-800/60 transition-colors flex items-center gap-1.5"
            >
              <Trophy className="w-4 h-4 text-amber-400" />
              Ranking Científico
            </Link>
            {session?.user?.role === "ADMIN" && (
              <Link
                href="/admin/new-question"
                className="px-3.5 py-1.5 text-sm font-medium rounded-full bg-teal-500/15 text-teal-300 hover:bg-teal-500/25 border border-teal-500/30 transition-colors flex items-center gap-1.5"
              >
                <PlusCircle className="w-4 h-4" />
                Publicar Pregunta
              </Link>
            )}
          </nav>

          {/* Right Action Tools */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <button
              onClick={() => setLang(lang === "ES" ? "EN" : "ES")}
              title="Cambiar idioma (i18n)"
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono rounded-lg border border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{lang}</span>
            </button>

            {/* Dark/Light toggle */}
            <button
              onClick={toggleTheme}
              title="Alternar modo claro / oscuro"
              className="p-2 rounded-lg border border-zinc-700/60 text-zinc-400 hover:text-zinc-200 hover:border-zinc-500 transition-colors"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : (
                <Moon className="w-4 h-4 text-zinc-700" />
              )}
            </button>

            {/* Auth Actions */}
            {session?.user ? (
              <div className="flex items-center gap-2 pl-2 border-l border-zinc-800">
                <Link
                  href={`/profile/${session.user.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-700 hover:border-teal-500/50 transition-all text-xs"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-teal-500 to-indigo-500 flex items-center justify-center text-white text-[10px] font-bold">
                    {displayName.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-zinc-200 truncate max-w-[70px] sm:max-w-[120px]">
                      {displayName}
                    </span>
                    <span className="text-[10px] text-teal-400 font-mono">
                      {session.user.publicIdentityType === "ALIAS" ? "Alias" : "Nombre"}
                    </span>
                  </div>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  title="Cerrar sesión"
                  className="p-2 rounded-lg text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLogin(true)}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium text-zinc-300 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Ingresar</span>
                </button>
                <button
                  onClick={() => setShowRegister(true)}
                  className="px-3.5 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-zinc-950 font-semibold shadow-glow transition-all flex items-center gap-1.5"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Unirse a la Red</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Bottom Social Navigation Bar */}
      <MobileNav
        onOpenLogin={() => setShowLogin(true)}
        onOpenRegister={() => setShowRegister(true)}
      />

      {/* Modals */}
      <RegisterModal
        isOpen={showRegister}
        onClose={() => setShowRegister(false)}
        onOpenLogin={() => {
          setShowRegister(false);
          setShowLogin(true);
        }}
      />
      <LoginModal
        isOpen={showLogin}
        onClose={() => setShowLogin(false)}
        onOpenRegister={() => {
          setShowLogin(false);
          setShowRegister(true);
        }}
      />
    </>
  );
}
