"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { submitAnswer } from "@/app/actions/social";
import {
  Send,
  Sparkles,
  Code,
  List,
  Eye,
  Edit3,
  CheckCircle2,
  AlertCircle,
  LogIn,
} from "lucide-react";

interface AnswerEditorProps {
  questionId: string;
  onOpenRegister?: () => void;
  onOpenLogin?: () => void;
}

export function AnswerEditor({ questionId }: AnswerEditorProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      setError("Debes iniciar sesión para publicar una respuesta.");
      return;
    }

    if (content.trim().length < 10) {
      setError("La respuesta debe contener al menos 10 caracteres de fundamentación científica.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await submitAnswer(questionId, content);

    setLoading(false);
    if (!res.success) {
      setError(res.error || "No se pudo publicar la respuesta.");
    } else {
      setContent("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        window.location.reload();
      }, 1000);
    }
  };

  const insertSnippet = (prefix: string, suffix: string = "") => {
    setContent((prev) => `${prev}${prefix}${suffix}`);
  };

  if (!session?.user) {
    return (
      <div className="glass-card rounded-3xl p-6 sm:p-8 text-center border border-zinc-800/80">
        <div className="w-12 h-12 rounded-2xl bg-teal-500/10 border border-teal-500/20 text-teal-400 mx-auto flex items-center justify-center mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-base text-zinc-100 mb-1">
          Únete al debate científico
        </h3>
        <p className="text-xs text-zinc-400 max-w-md mx-auto mb-4">
          Para formular respuestas basadas en la Teoría de la Emergencia Categorial Disipativa y ganar puntuación en el ranking, inicia sesión con tu perfil verificado.
        </p>
      </div>
    );
  }

  const authorName =
    session.user.publicIdentityType === "ALIAS" && session.user.alias
      ? session.user.alias
      : session.user.name;

  return (
    <div className="glass-card rounded-3xl p-6 border border-zinc-800/80 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs">
          <span className="text-zinc-400">Respondiendo públicamente como:</span>
          <span className="font-bold text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-full border border-teal-500/20">
            {authorName}
          </span>
          <span className="text-[10px] font-mono text-zinc-500">
            ({session.user.publicIdentityType === "ALIAS" ? "Alias" : "Nombre"})
          </span>
        </div>

        {/* Preview / Edit tab */}
        <div className="flex items-center gap-1 bg-zinc-900/90 p-1 rounded-xl border border-zinc-800 text-xs">
          <button
            type="button"
            onClick={() => setIsPreview(false)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              !isPreview
                ? "bg-zinc-800 text-teal-300 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Editar</span>
          </button>
          <button
            type="button"
            onClick={() => setIsPreview(true)}
            className={`px-2.5 py-1 rounded-lg flex items-center gap-1 transition-colors ${
              isPreview
                ? "bg-zinc-800 text-teal-300 font-semibold"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Vista Previa</span>
          </button>
        </div>
      </div>

      {/* Editor toolbar */}
      {!isPreview && (
        <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/60 text-xs text-zinc-400">
          <button
            type="button"
            onClick={() => insertSnippet("**", "**")}
            className="px-2 py-1 rounded hover:bg-zinc-800 hover:text-white"
            title="Negrita"
          >
            B
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("*", "*")}
            className="px-2 py-1 rounded hover:bg-zinc-800 hover:text-white italic"
            title="Cursiva"
          >
            I
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("`", "`")}
            className="px-2 py-1 rounded hover:bg-zinc-800 hover:text-white font-mono"
            title="Fórmula o Código inline"
          >
            {"< >"}
          </button>
          <button
            type="button"
            onClick={() => insertSnippet("\n- ")}
            className="px-2 py-1 rounded hover:bg-zinc-800 hover:text-white"
            title="Lista"
          >
            <List className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-xs text-teal-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400" />
          <span>¡Respuesta publicada con éxito! Actualizando debate...</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {isPreview ? (
          <div className="min-h-[140px] p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">
            {content || <span className="text-zinc-600 italic">Escribe algo en el editor para previsualizarlo aquí...</span>}
          </div>
        ) : (
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Formula tu deducción científica o hipótesis frente a este dilema de la TECD..."
            rows={5}
            className="w-full p-4 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors font-sans"
            required
          />
        )}

        <div className="flex items-center justify-between pt-2">
          <span className="text-[11px] text-zinc-500 font-mono">
            Suma +1 punto al ranking y multiplica tus debates recibidos.
          </span>

          <button
            type="submit"
            disabled={loading || content.trim().length < 10}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-indigo-600 hover:from-teal-400 hover:to-indigo-500 text-white font-bold text-xs shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{loading ? "Publicando..." : "Publicar Respuesta"}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
