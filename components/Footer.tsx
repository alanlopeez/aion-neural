"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Atom, Shield, Scale } from "lucide-react";

export function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return (
    <footer className="w-full border-t border-zinc-800/80 bg-zinc-950/70 backdrop-blur-xl mt-24 text-zinc-400 text-xs transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pb-24 sm:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand & Theory */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-teal-500 to-indigo-600 flex items-center justify-center text-white">
                <Atom className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-zinc-200">
                TECD • Red de Inteligencia Científica
              </span>
            </div>
            <p className="text-zinc-400 text-xs leading-relaxed max-w-md">
              Plataforma y blog social hiper-especializado para Científicos de Datos fundamentada en la{" "}
              <strong className="text-zinc-300">Teoría de la Emergencia Categorial Disipativa</strong>. Interconectando información latente, atractores termodinámicos y medición probabilística.
            </p>
          </div>

          {/* Col 2: Intersecciones */}
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-200 text-xs uppercase tracking-wider font-mono">
              Intersecciones TECD
            </h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li>1. Ontología de Noción Única</li>
              <li>2. Medición por Contraste & OOD</li>
              <li>3. Objetivos SMART & Gradiente</li>
              <li>4. Tiempo Fluidificado</li>
              <li>5. Síntesis Global Disipativa</li>
            </ul>
          </div>

          {/* Col 3: Ética y Deontología */}
          <div className="space-y-2">
            <h4 className="font-semibold text-zinc-200 text-xs uppercase tracking-wider font-mono">
              Comunidad & Rigor
            </h4>
            <ul className="space-y-1.5 text-zinc-400">
              <li className="flex items-center gap-1.5">
                <Scale className="w-3.5 h-3.5 text-teal-400" />
                <span>Consentimiento Ético Obligatorio</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-teal-400" />
                <span>Identidad Protegida (Alias/Real)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500 font-mono">
          <div>
            © {new Date().getFullYear()} Aion Neural. Desarrollado para la investigación y el debate científico de alta gama.
          </div>
        </div>
      </div>
    </footer>
  );
}
