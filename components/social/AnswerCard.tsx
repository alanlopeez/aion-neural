"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { submitComment } from "@/app/actions/social";
import { formatDate } from "@/lib/utils";
import {
  MessageSquare,
  CornerDownRight,
  Send,
  Linkedin,
  Globe,
  Share2,
  Mail,
  User,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CommentType {
  id: string;
  content: string;
  createdAt: Date | string;
  parentId?: string | null;
  author: {
    id: string;
    name: string;
    publicIdentityType: string;
    alias?: string | null;
  };
  replies?: CommentType[];
}

interface AnswerProps {
  answer: {
    id: string;
    content: string;
    createdAt: Date | string;
    author: {
      id: string;
      name: string;
      publicIdentityType: string;
      alias?: string | null;
      visibility?: {
        showEmail: boolean;
        linkedinUrl?: string | null;
        genericSocialUrl?: string | null;
        websiteUrl?: string | null;
      } | null;
    };
    comments: CommentType[];
  };
  currentUserId?: string;
  onCommentAdded?: () => void;
}

export function AnswerCard({ answer, currentUserId, onCommentAdded }: AnswerProps) {
  const { data: session } = useSession();
  const [showDebateBox, setShowDebateBox] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const authorName =
    answer.author.publicIdentityType === "ALIAS" && answer.author.alias
      ? answer.author.alias
      : answer.author.name;

  const handleSendComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session?.user) {
      setError("Debes iniciar sesión para publicar un argumento o debate.");
      return;
    }
    if (!commentText.trim()) return;

    setLoading(true);
    setError(null);

    const res = await submitComment(
      answer.id,
      commentText,
      replyingToCommentId || undefined
    );

    setLoading(false);
    if (!res.success) {
      setError(res.error || "No se pudo publicar el debate.");
    } else {
      setCommentText("");
      setReplyingToCommentId(null);
      setShowDebateBox(false);
      if (onCommentAdded) {
        onCommentAdded();
      } else {
        window.location.reload();
      }
    }
  };

  return (
    <div className="glass-card rounded-3xl p-6 border border-zinc-800/80 transition-all hover:border-zinc-700/80 space-y-4">
      {/* Answer Author Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-teal-500/20 to-indigo-500/20 border border-teal-500/30 flex items-center justify-center text-teal-300 font-bold text-sm">
            {authorName.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Link
                href={`/profile/${answer.author.id}`}
                className="font-bold text-sm text-zinc-100 hover:text-teal-400 transition-colors"
              >
                {authorName}
              </Link>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                {answer.author.publicIdentityType === "ALIAS" ? "Alias" : "Investigador"}
              </span>
            </div>
            <div className="text-[11px] text-zinc-500 font-mono">
              Respondido el {formatDate(answer.createdAt)}
            </div>
          </div>
        </div>

        {/* Public Social Links */}
        <div className="flex items-center gap-1.5 text-zinc-400">
          {answer.author.visibility?.linkedinUrl && (
            <a
              href={answer.author.visibility.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-blue-400 hover:bg-blue-500/10 transition-colors"
              title="LinkedIn"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          )}
          {answer.author.visibility?.websiteUrl && (
            <a
              href={answer.author.visibility.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              title="Web Personal"
            >
              <Globe className="w-3.5 h-3.5" />
            </a>
          )}
          {answer.author.visibility?.genericSocialUrl && (
            <a
              href={answer.author.visibility.genericSocialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg hover:text-purple-400 hover:bg-purple-500/10 transition-colors"
              title="Red Social"
            >
              <Share2 className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Answer Content */}
      <div className="text-zinc-200 text-sm leading-relaxed whitespace-pre-wrap font-sans bg-zinc-950/40 p-4 rounded-2xl border border-zinc-900">
        {answer.content}
      </div>

      {/* Social Actions bar on Answer */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-900">
        <div className="flex items-center gap-2 text-xs text-zinc-400">
          <div className="flex items-center gap-1.5">
            <MessageSquare className="w-4 h-4 text-teal-400" />
            <span className="font-semibold text-zinc-300">
              {answer.comments.length}
            </span>{" "}
            {answer.comments.length === 1 ? "debate" : "debates"}
          </div>
        </div>

        <button
          onClick={() => {
            setShowDebateBox(!showDebateBox);
            setReplyingToCommentId(null);
          }}
          className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 transition-all flex items-center gap-1.5"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Debatir esta respuesta</span>
        </button>
      </div>

      {/* Debate / Comment Box */}
      <AnimatePresence>
        {showDebateBox && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="pt-2"
          >
            <form onSubmit={handleSendComment} className="space-y-3">
              {replyingToCommentId && (
                <div className="text-[11px] text-teal-400 flex items-center justify-between px-2">
                  <span>Respondiendo a un argumento previo en el hilo</span>
                  <button
                    type="button"
                    onClick={() => setReplyingToCommentId(null)}
                    className="hover:underline text-zinc-500"
                  >
                    Cancelar réplica
                  </button>
                </div>
              )}
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Aporta una objeción matemática, evidencia empírica o perspectiva complementaria..."
                rows={3}
                className="w-full p-3.5 rounded-2xl bg-zinc-900/90 border border-zinc-800 text-xs text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
                autoFocus
              />

              {error && (
                <div className="text-xs text-red-400">{error}</div>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowDebateBox(false)}
                  className="px-3 py-1.5 rounded-xl text-xs text-zinc-400 hover:text-white"
                >
                  Cerrar
                </button>
                <button
                  type="submit"
                  disabled={loading || !commentText.trim()}
                  className="px-4 py-1.5 rounded-full bg-teal-500 hover:bg-teal-400 text-zinc-950 font-bold text-xs shadow-glow transition-all flex items-center gap-1.5 disabled:opacity-50"
                >
                  <Send className="w-3 h-3" />
                  <span>{loading ? "Enviando..." : "Publicar Argumento"}</span>
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Nested Comments / Debates List */}
      {answer.comments.length > 0 && (
        <div className="pt-3 space-y-2.5 pl-3 sm:pl-6 border-l-2 border-zinc-800/80">
          {answer.comments.map((comment) => {
            const commentAuthor =
              comment.author.publicIdentityType === "ALIAS" && comment.author.alias
                ? comment.author.alias
                : comment.author.name;

            return (
              <div
                key={comment.id}
                className="p-3.5 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-xs space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-zinc-200">
                      {commentAuthor}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {formatDate(comment.createdAt)}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setReplyingToCommentId(comment.id);
                      setShowDebateBox(true);
                    }}
                    className="text-[11px] text-teal-400/80 hover:text-teal-300 flex items-center gap-1"
                  >
                    <CornerDownRight className="w-3 h-3" />
                    <span>Replicar</span>
                  </button>
                </div>
                <p className="text-zinc-300 leading-relaxed font-sans">
                  {comment.content}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
