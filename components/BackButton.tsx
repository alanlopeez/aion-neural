"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  label?: string;
  fallbackHref?: string;
  className?: string;
}

export function BackButton({
  label = "Volver al feed de preguntas",
  fallbackHref = "/blog",
  className = "",
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    // Si el usuario navegó desde el feed u otra pantalla dentro de la app,
    // volvemos a la página anterior preservando scroll y filtros activos.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(fallbackHref);
    }
  };

  return (
    <button
      type="button"
      onClick={handleBack}
      className={`inline-flex items-center gap-2 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer active:scale-95 ${className}`}
    >
      <ArrowLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
