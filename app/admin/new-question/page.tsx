import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ShieldAlert, Sparkles, PlusCircle } from "lucide-react";
import { AdminQuestionForm } from "./AdminQuestionForm";
import { BackButton } from "@/components/BackButton";

export const dynamic = "force-dynamic";

export default async function NewQuestionPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.role !== "ADMIN") {
    return (
      <div className="max-w-md mx-auto my-16 glass-card rounded-3xl p-8 text-center border border-red-500/30 space-y-4">
        <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-400 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-white">Acceso Restringido</h2>
        <p className="text-xs text-zinc-400 leading-relaxed">
          De acuerdo a las reglas estrictas de la plataforma, solo el Desarrollador / Administrador puede publicar nuevos artículos y preguntas oficiales de la TECD.
        </p>
        <Link
          href="/blog"
          className="inline-block px-4 py-2 rounded-full bg-zinc-800 text-xs font-semibold text-zinc-200 hover:bg-zinc-700 transition-colors"
        >
          Volver al Feed Principal
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <BackButton label="Volver al feed" fallbackHref="/blog" />
      </div>

      <div className="glass-card rounded-3xl p-6 sm:p-10 border border-zinc-800/80 space-y-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Panel de Administración TECD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Publicar Nuevo Dilema de la TECD
          </h1>
          <p className="text-xs text-zinc-400">
            Formula un artículo científico y una pregunta para el debate de la comunidad.
          </p>
        </div>

        <AdminQuestionForm />
      </div>
    </div>
  );
}
