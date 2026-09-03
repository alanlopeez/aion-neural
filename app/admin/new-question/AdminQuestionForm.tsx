"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createQuestion } from "@/app/actions/social";
import { PlusCircle, Send, AlertCircle, CheckCircle2 } from "lucide-react";

export function AdminQuestionForm() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Ontología de Noción Única");
  const [intersectionNumber, setIntersectionNumber] = useState<number>(1);
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    { name: "Ontología de Noción Única", num: 1 },
    { name: "Medición por Contraste y OOD Repetitivo", num: 2 },
    { name: "Atracción, Control y Objetivos SMART", num: 3 },
    { name: "Categorías Interconectables y Tiempo Fluidificado", num: 4 },
    { name: "Síntesis Global y Límites de la Teoría Unificada", num: 5 },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim() || !summary.trim()) {
      setError("Por favor completa todos los campos del artículo.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await createQuestion({
      title: title.trim(),
      summary: summary.trim(),
      content: content.trim(),
      category,
      intersectionNumber,
    });

    setLoading(false);
    if (!res.success) {
      setError(res.error || "No se pudo crear la pregunta.");
    } else {
      router.push(`/question/${res.question?.slug}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left">
      {error && (
        <div className="p-3.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Title */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
          Título de la Publicación Científica
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="ej. El Universo como Red de Información Binaria (It from Bit)"
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500"
          required
        />
      </div>

      {/* Category Selection */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
          Intersección / Categoría Teórica TECD
        </label>
        <select
          value={category}
          onChange={(e) => {
            setCategory(e.target.value);
            const found = categories.find((c) => c.name === e.target.value);
            if (found) setIntersectionNumber(found.num);
          }}
          className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 focus:outline-none focus:border-teal-500"
        >
          {categories.map((c) => (
            <option key={c.name} value={c.name}>
              Intersección {c.num}: {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Summary */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
          Resumen / Abstract de la Hipótesis
        </label>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          rows={2}
          placeholder="Síntesis concisa que aparecerá en el feed principal..."
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500"
          required
        />
      </div>

      {/* Full Content */}
      <div>
        <label className="block text-xs font-semibold text-zinc-300 mb-1.5 font-mono">
          Cuerpo Teórico y Pregunta para el Debate
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={10}
          placeholder="Desarrollo completo del concepto, marco teórico, conexiones con la física cuántica y la pregunta central..."
          className="w-full p-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500 font-sans"
          required
        />
      </div>

      <div className="pt-4 border-t border-zinc-800 flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-zinc-950 font-bold text-xs shadow-glow transition-all flex items-center gap-2 disabled:opacity-50"
        >
          <Send className="w-3.5 h-3.5" />
          <span>{loading ? "Publicando en la Red..." : "Publicar Pregunta Oficial"}</span>
        </button>
      </div>
    </form>
  );
}
