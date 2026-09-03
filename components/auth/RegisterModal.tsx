"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { signIn } from "next-auth/react";
import { registerUser } from "@/app/actions/auth";
import {
  X,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Linkedin,
  Share2,
  Globe,
  Scale,
} from "lucide-react";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenLogin: () => void;
}

export function RegisterModal({
  isOpen,
  onClose,
  onOpenLogin,
}: RegisterModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Step 2
  const [identityType, setIdentityType] = useState<"USERNAME" | "ALIAS">("USERNAME");
  const [alias, setAlias] = useState("");

  // Step 3
  const [showEmail, setShowEmail] = useState(false);
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [genericSocialUrl, setGenericSocialUrl] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");

  // Step 4
  const [legalConsent, setLegalConsent] = useState(false);

  if (!isOpen) return null;

  const handleNextStep = () => {
    setError(null);
    if (step === 1) {
      if (!name.trim() || !email.trim() || !password) {
        setError("Por favor completa todos los campos del Paso 1.");
        return;
      }
      if (!email.includes("@")) {
        setError("Ingresa un correo electrónico válido.");
        return;
      }
      if (password.length < 8) {
        setError("La contraseña debe tener un mínimo de 8 caracteres.");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (identityType === "ALIAS" && !alias.trim()) {
        setError("Escribe el alias que utilizarás en la red.");
        return;
      }
      setStep(3);
    } else if (step === 3) {
      setStep(4);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!legalConsent) {
      setError("Debes aceptar el consentimiento legal y ético obligatorio.");
      return;
    }

    setLoading(true);
    setError(null);

    const res = await registerUser({
      name,
      email,
      password,
      publicIdentityType: identityType,
      alias: identityType === "ALIAS" ? alias : undefined,
      showEmail,
      linkedinUrl: linkedinUrl || undefined,
      genericSocialUrl: genericSocialUrl || undefined,
      websiteUrl: websiteUrl || undefined,
      legalConsent,
    });

    if (!res.success) {
      setError(res.error || "Ocurrió un error en el registro.");
      setLoading(false);
      return;
    }

    // Auto sign in
    const loginRes = await signIn("credentials", {
      identifier: email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (loginRes?.error) {
      onClose();
      onOpenLogin();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="relative w-full max-w-lg rounded-3xl bg-zinc-950/95 border border-zinc-800/80 p-6 sm:p-8 shadow-2xl overflow-hidden"
      >
        {/* Subtle decorative glow */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Onboarding Científico • Paso {step} de 4</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-zinc-100">
            {step === 1 && "Credenciales de Acceso"}
            {step === 2 && "Identidad Pública en la Red"}
            {step === 3 && "Visibilidad de Datos"}
            {step === 4 && "Marco Legal y Deontología"}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-1">
            {step === 1 && "Crea tu cuenta institucional o de investigación."}
            {step === 2 && "¿Cómo deseas que otros científicos vean tus publicaciones?"}
            {step === 3 && "Selecciona qué datos personales serán públicos en tu perfil."}
            {step === 4 && "Compromiso de integridad científica y rigor académico."}
          </p>
        </div>

        {/* Step Progress Dots */}
        <div className="flex items-center gap-2 mb-6">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                s === step
                  ? "w-8 bg-teal-400 shadow-glow"
                  : s < step
                  ? "w-4 bg-teal-600"
                  : "w-4 bg-zinc-800"
              }`}
            />
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-2.5 text-xs text-red-300">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}>
          <AnimatePresence mode="wait">
            {/* STEP 1: CREDENTIALS */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 text-left"
              >
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Nombre Completo o de Investigador
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Claude Shannon"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Correo Electrónico
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="shannon@mit.edu"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Contraseña Segura (mínimo 8 caracteres)
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-500 transition-colors"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 2: PUBLIC IDENTITY (MULTIPLE CHOICE) */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 text-left"
              >
                <div className="space-y-2.5">
                  <label
                    onClick={() => setIdentityType("USERNAME")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      identityType === "USERNAME"
                        ? "bg-teal-500/10 border-teal-500/50 shadow-glow"
                        : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="identity"
                      checked={identityType === "USERNAME"}
                      onChange={() => setIdentityType("USERNAME")}
                      className="mt-1 accent-teal-500"
                    />
                    <div>
                      <div className="font-semibold text-sm text-zinc-200">
                        Usar mi Nombre de Usuario
                      </div>
                      <p className="text-xs text-zinc-400">
                        Aparecerás con tu nombre oficial ({name || "Tu Nombre"}) en cada
                        artículo, respuesta y debate.
                      </p>
                    </div>
                  </label>

                  <label
                    onClick={() => setIdentityType("ALIAS")}
                    className={`flex items-start gap-3 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      identityType === "ALIAS"
                        ? "bg-teal-500/10 border-teal-500/50 shadow-glow"
                        : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="identity"
                      checked={identityType === "ALIAS"}
                      onChange={() => setIdentityType("ALIAS")}
                      className="mt-1 accent-teal-500"
                    />
                    <div>
                      <div className="font-semibold text-sm text-zinc-200">
                        Usar un Alias inventado
                      </div>
                      <p className="text-xs text-zinc-400">
                        Mantén privacidad mediante un seudónimo científico o criptónimo.
                      </p>
                    </div>
                  </label>
                </div>

                {/* DYNAMIC ALIAS INPUT */}
                <AnimatePresence>
                  {identityType === "ALIAS" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pt-2"
                    >
                      <label className="block text-xs font-medium text-teal-300 mb-1.5">
                        Escribe tu Alias obligatorio:
                      </label>
                      <input
                        type="text"
                        value={alias}
                        onChange={(e) => setAlias(e.target.value)}
                        placeholder="ej. EntropiaCuantica_42"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-900 border border-teal-500/40 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-teal-400"
                        autoFocus
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}

            {/* STEP 3: PUBLIC DATA TOGGLES */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-3.5 text-left"
              >
                {/* Email toggle */}
                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-zinc-400" />
                    <div>
                      <div className="text-xs font-semibold text-zinc-200">
                        Correo electrónico público
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Permitir que otros investigadores vean tu email
                      </div>
                    </div>
                  </div>
                  <input
                    type="checkbox"
                    checked={showEmail}
                    onChange={(e) => setShowEmail(e.target.checked)}
                    className="w-4 h-4 rounded accent-teal-500"
                  />
                </div>

                {/* LinkedIn URL */}
                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span>Perfil de LinkedIn (Opcional)</span>
                  </div>
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={(e) => setLinkedinUrl(e.target.value)}
                    placeholder="https://linkedin.com/in/tu-perfil"
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Generic Social URL */}
                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Share2 className="w-4 h-4 text-purple-400" />
                    <span>Red Social Genérica (X, GitHub, Mastodon)</span>
                  </div>
                  <input
                    type="url"
                    value={genericSocialUrl}
                    onChange={(e) => setGenericSocialUrl(e.target.value)}
                    placeholder="https://x.com/tu_usuario"
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500"
                  />
                </div>

                {/* Personal Website */}
                <div className="p-3 rounded-2xl bg-zinc-900/50 border border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-200">
                    <Globe className="w-4 h-4 text-emerald-400" />
                    <span>Página Web Personal o Laboratorio</span>
                  </div>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://tulaboratorio.org"
                    className="w-full px-3 py-1.5 rounded-lg bg-zinc-950 border border-zinc-800 text-xs text-zinc-200 placeholder-zinc-600 focus:outline-none focus:border-teal-500"
                  />
                </div>
              </motion.div>
            )}

            {/* STEP 4: MANDATORY LEGAL & ETHICAL CONSENT */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="space-y-4 text-left"
              >
                <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs mb-2">
                    <Scale className="w-4 h-4" />
                    <span>Cláusula de Deontología Científica Obligatoria</span>
                  </div>
                  <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                    "Consiento mantener un marco de respeto absoluto hacia la comunidad
                    científica. Comprendo que el mal uso, acoso o falsificación de
                    datos en este sitio será penalizado y reportado a las autoridades
                    oficiales correspondientes."
                  </p>
                </div>

                <label className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-900/60 border border-zinc-800 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={legalConsent}
                    onChange={(e) => setLegalConsent(e.target.checked)}
                    className="mt-1 w-5 h-5 rounded accent-teal-500"
                  />
                  <span className="text-xs text-zinc-200 font-medium leading-normal">
                    He leído, comprendo y acepto obligatoriamente esta cláusula para
                    activar mi perfil de investigación.
                  </span>
                </label>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-8 flex items-center justify-between gap-3 pt-4 border-t border-zinc-800/80">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep((s) => (s - 1) as any)}
                className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Atrás</span>
              </button>
            ) : (
              <div />
            )}

            {step < 4 ? (
              <button
                type="button"
                onClick={handleNextStep}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-400 hover:to-teal-500 text-zinc-950 font-semibold text-xs shadow-glow transition-all flex items-center gap-1.5"
              >
                <span>Continuar</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!legalConsent || loading}
                className={`px-6 py-2.5 rounded-full font-bold text-xs flex items-center gap-2 transition-all ${
                  legalConsent && !loading
                    ? "bg-gradient-to-r from-teal-400 via-teal-500 to-indigo-500 text-zinc-950 shadow-glow hover:scale-105"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <span>Registrando...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Completar Registro & Acceder</span>
                  </>
                )}
              </button>
            )}
          </div>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={onOpenLogin}
            className="text-xs text-zinc-500 hover:text-teal-400 transition-colors"
          >
            ¿Ya eres miembro? Inicia sesión aquí
          </button>
        </div>
      </motion.div>
    </div>
  );
}
