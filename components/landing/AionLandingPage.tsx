"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  ArrowRight,
  ExternalLink,
  Shield,
  Zap,
  Cpu,
  Lock,
  Layers,
  CheckCircle2,
  Menu,
  X,
  BookOpen,
  ChevronDown,
  MessageSquare,
  Trophy,
  Atom,
  HelpCircle,
  Users,
} from "lucide-react";

export function AionLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Quantum Particle Canvas Animation (Ported from app.js)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particleCount = Math.min(width > 768 ? 60 : 25, 70);
    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
    }> = [];

    const colors = ["#00f2fe", "#9b51e0", "#39ff14"];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        radius: Math.random() * 2 + 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 130) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(0, 242, 254, ${0.15 * (1 - dist / 130)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-100 bg-[#07070a] font-sans selection:bg-[#00f2fe] selection:text-black">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-40"
      />

      {/* Ambient ambient glow orbs */}
      <div className="fixed top-1/4 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/3 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* HEADER WITH BLOG TAB */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/60 border-b border-zinc-800/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full border border-teal-400/40 flex items-center justify-center bg-black/40 shadow-[0_0_15px_rgba(0,242,254,0.3)]">
              <div className="w-3.5 h-3.5 rounded-full bg-[#00f2fe] animate-pulse" />
            </div>
            <span className="font-extrabold tracking-widest text-lg font-mono">
              AION <span className="text-[#00f2fe]">NEURAL</span>
            </span>
          </Link>

          {/* DESKTOP NAVBAR */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <a href="#comunidad" className="text-[#00f2fe] hover:text-white transition-colors">
              Comunidad
            </a>
            <a href="#desafio" className="hover:text-zinc-100 transition-colors">
              Desafío
            </a>
            <a href="#ecosistema" className="hover:text-zinc-100 transition-colors">
              Ecosistema
            </a>
            <a href="#faq" className="hover:text-zinc-100 transition-colors">
              FAQ
            </a>
            <a href="#hoja-ruta" className="hover:text-zinc-100 transition-colors">
              Hoja de Ruta
            </a>

            {/* TAB BLOG PROMINENTE */}
            <Link
              href="/blog"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-teal-500/15 border border-[#00f2fe]/60 text-[#00f2fe] font-bold shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:bg-[#00f2fe] hover:text-black transition-all group"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>BLOG TECD</span>
              <span className="text-[9px] px-1 py-0.2 rounded bg-[#00f2fe]/30 group-hover:bg-black/20">
                NUEVO
              </span>
            </Link>

            <a
              href="https://aion-os-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-1.5 rounded-md border border-[#39ff14] text-[#39ff14] hover:bg-[#39ff14]/10 transition-colors font-mono font-bold text-xs tracking-wider"
            >
              DEMO
            </a>
            <a
              href="#contacto"
              className="px-4 py-1.5 rounded-md bg-zinc-900 border border-zinc-700 text-zinc-200 hover:border-[#00f2fe] hover:text-white transition-colors text-xs"
            >
              Únete
            </a>
          </nav>

          {/* MOBILE TOGGLE */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MOBILE MENU DRAWER */}
        {mobileMenuOpen && (
          <div className="md:hidden px-6 py-6 border-b border-zinc-800 bg-black/95 space-y-4 text-sm font-semibold uppercase">
            <a
              href="#comunidad"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#00f2fe] font-bold"
            >
              Comunidad Data Science
            </a>
            <a
              href="#desafio"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-400"
            >
              Desafío
            </a>
            <a
              href="#ecosistema"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-400"
            >
              Ecosistema
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-400"
            >
              Preguntas Frecuentes
            </a>
            <a
              href="#hoja-ruta"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-400"
            >
              Hoja de Ruta
            </a>

            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-[#00f2fe] font-bold py-2 border-y border-zinc-800"
            >
              ★ BLOG TECD (Red Científica)
            </Link>

            <a
              href="https://aion-os-mu.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-[#39ff14]"
            >
              DEMO ONLINE
            </a>
            <a
              href="#contacto"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-white"
            >
              Únete a la Misión
            </a>
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-24 pb-20 px-6 text-center max-w-5xl mx-auto z-10 space-y-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-mono text-teal-300">
          <span className="w-2 h-2 rounded-full bg-[#00f2fe] animate-ping" />
          <span>Quantum OS Alpha 0.8.2</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
          Securing Tomorrow's <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f2fe] via-teal-200 to-indigo-400 drop-shadow-[0_0_25px_rgba(0,242,254,0.4)]">
            Intelligence, Today.
          </span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Construimos el sistema operativo estándar para el procesamiento y
          seguridad de datos corporativos en la era cuántica.
        </p>

        {/* HERO CTAS */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <a
            href="https://aion-os-mu.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-lg bg-[#39ff14] hover:bg-[#32e012] text-black font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(57,255,20,0.3)] transition-all flex items-center gap-2"
          >
            <span>DEMO</span>
            <span>▶</span>
          </a>

          <Link
            href="/blog"
            className="px-6 py-3 rounded-lg bg-[#00f2fe] hover:bg-[#00d8e4] text-black font-extrabold text-sm tracking-wide shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all flex items-center gap-2"
          >
            <span>Explorar Blog TECD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <a
            href="#contacto"
            className="px-6 py-3 rounded-lg bg-zinc-900/90 border border-zinc-700 hover:border-zinc-500 text-zinc-200 font-semibold text-sm transition-all"
          >
            Únete a la Misión
          </a>
        </div>
      </section>

      {/* DESAFÍO GLOBAL */}
      <section id="desafio" className="py-24 px-6 max-w-6xl mx-auto z-10 relative">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[#9b51e0] font-mono text-xs uppercase tracking-widest">
            // EL DESAFÍO GLOBAL
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            ¿Por qué importamos?
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            La infraestructura tecnológica de hoy colapsará bajo las demandas de la
            computación del mañana. Nos anticipamos a los vectores de riesgo globales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-zinc-950/70 border border-purple-500/30 hover:border-purple-500 transition-all shadow-[0_0_20px_rgba(155,81,224,0.1)] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Vulnerabilidad Cuántica</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              El riesgo del "Cosechar ahora, descifrar después" (SNDL). Los datos
              encriptados hoy serán descifrados por computadores cuánticos en el corto
              plazo.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/70 border border-emerald-500/30 hover:border-[#39ff14] transition-all shadow-[0_0_20px_rgba(57,255,20,0.1)] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-[#39ff14] flex items-center justify-center">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Colapso Energético</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              El costo insostenible de entrenar Inteligencia Artificial clásica. La
              potencia de cómputo tradicional está llegando a límites de consumo de
              recursos inviables.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/70 border border-teal-500/30 hover:border-[#00f2fe] transition-all shadow-[0_0_20px_rgba(0,242,254,0.1)] space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-[#00f2fe] flex items-center justify-center">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Fragmentación</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Datos empresariales desconectados y sin estructurar. La incapacidad de
              sintetizar flujos de datos distribuidos frena drásticamente la
              automatización efectiva.
            </p>
          </div>
        </div>
      </section>

      {/* ECOSISTEMA */}
      <section id="ecosistema" className="py-24 px-6 max-w-6xl mx-auto z-10 relative">
        <div className="text-center space-y-3 mb-16">
          <span className="text-[#00f2fe] font-mono text-xs uppercase tracking-widest">
            // NUESTRO ECOSISTEMA
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            La Ventaja Competitiva
          </h2>
          <p className="text-zinc-400 text-sm max-w-xl mx-auto">
            Aion Neural integra la estructuración inteligente y la inmunidad
            criptográfica en un núcleo de procesamiento integrado y soberano.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-8 rounded-2xl bg-zinc-950/70 border border-teal-500/30 space-y-3">
            <span className="text-[10px] font-mono text-teal-400 uppercase tracking-widest">
              AION CORE
            </span>
            <h3 className="text-lg font-bold text-white">Aion Data Optimization</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Arquitectura multi-agente que estructura datos con precisión quirúrgica
              utilizando grafos semánticos adaptativos.
            </p>
            <div className="pt-4 border-t border-zinc-800 text-xs font-mono text-teal-300 flex justify-between">
              <span>Eficiencia de Ingesta</span>
              <span className="font-bold">+300%</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/70 border border-purple-500/30 space-y-3">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
              QUANTUM ENGINE
            </span>
            <h3 className="text-lg font-bold text-white">Aion Quantum Intelligence</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Entrenamiento de redes neuronales cuánticas (QNN) aprovechando
              entrelazamiento y superposición simulados mediante tensores.
            </p>
            <div className="pt-4 border-t border-zinc-800 text-xs font-mono text-purple-300 flex justify-between">
              <span>Reducción Consumo</span>
              <span className="font-bold">-90%</span>
            </div>
          </div>

          <div className="p-8 rounded-2xl bg-zinc-950/70 border border-emerald-500/30 space-y-3">
            <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest">
              CRYPTO CORE
            </span>
            <h3 className="text-lg font-bold text-white">Aion Post-Quantum Shield</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Criptografía Post-Cuántica (PQC) con estándares del NIST (Kyber / Dilithium)
              para blindar infraestructura crítica.
            </p>
            <div className="pt-4 border-t border-zinc-800 text-xs font-mono text-emerald-300 flex justify-between">
              <span>Tiempo de Cifrado</span>
              <span className="font-bold">&lt;0.8ms</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN: COMUNIDAD PARA CIENTÍFICOS DE DATOS E INVESTIGADORES */}
      <section id="comunidad" className="py-24 px-6 max-w-6xl mx-auto z-10 relative">
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-xs font-mono">
            <Users className="w-3.5 h-3.5" />
            <span>Red Científica & Think-Tank Peer-to-Peer</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Comunidad para Científicos de Datos & Físicos Computacionales
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Un espacio de pensamiento riguroso, libre de algoritmos comerciales de distracción.
            Investigamos los límites de la IA clásica, conectando el Deep Learning con la
            computación cuántica, la termodinámica y la teoría de categorías.
          </p>
        </div>

        {/* PILARES PARA DATA SCIENTISTS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-teal-500/30 space-y-3 shadow-[0_0_15px_rgba(0,242,254,0.05)]">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center">
              <Atom className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Fronteras Teóricas</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Robustez OOD, redes tensoriales, teoría de la información cuántica y dinámica de atractores disipativos.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-amber-500/30 space-y-3 shadow-[0_0_15px_rgba(245,158,11,0.05)]">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center">
              <Trophy className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Ranking Peer-to-Peer</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Puntuación transparente basada en el rigor de tus respuestas y la repercusión de los debates que provocas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-indigo-500/30 space-y-3 shadow-[0_0_15px_rgba(99,102,241,0.05)]">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Identidad Flexible</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Debate públicamente con tu perfil verificado (LinkedIn/Web) o resguarda tu privacidad con un Alias soberano.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-zinc-950/80 border border-emerald-500/30 space-y-3 shadow-[0_0_15px_rgba(57,255,20,0.05)]">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Sin Algoritmos Basura</h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sin feeds de clickbait ni monetización de la atención. Diálogo científico de alta gama entre pares.
            </p>
          </div>
        </div>

        {/* GRILLA DE LOS 6 DILEMAS CIENTÍFICOS ACTIVOS */}
        <div className="space-y-6 mb-16">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
            <div>
              <span className="text-xs font-mono text-teal-400 uppercase tracking-wider">
                Dilemas Fundacionales en Debate
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Hipótesis y Preguntas Abiertas de la TECD
              </h3>
            </div>
            <Link
              href="/blog"
              className="text-xs font-mono text-teal-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <span>Ver todos en el Blog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Dilema 1 */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-teal-500/50 transition-all flex flex-col justify-between group space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Ontología de Noción Única
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  El Espaciotiempo como Propiedad Emergente e It from Bit
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  ¿Emerge el espaciotiempo de redes de entrelazamiento cuántico? De la hipótesis de Wheeler a la dinámica fundamental que genera geometría efectiva.
                </p>
              </div>
              <Link
                href="/question/universo-red-informacion-binaria-it-from-bit"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-all pt-2 border-t border-zinc-900"
              >
                <span>Debatir Hipótesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dilema 2 */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-teal-500/50 transition-all flex flex-col justify-between group space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Tiempo Fluidificado
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  La Flecha del Tiempo, Decoherencia y Emergencia Clásica
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  El tiempo no es solo entropía: la medición cuántica como proceso dinámico irreversible y la consolidación de resultados clásicos.
                </p>
              </div>
              <Link
                href="/question/tiempo-medida-entropica-medicion-fluida"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-all pt-2 border-t border-zinc-900"
              >
                <span>Debatir Hipótesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dilema 3 */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-teal-500/50 transition-all flex flex-col justify-between group space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Ontología de Noción Única
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Teoría de Categorías, Functores y Realismo Estructural
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  Los functores como puentes matemáticos entre entorno, información y acción: ¿es la realidad puramente relacional o subsiste una ontología material?
                </p>
              </div>
              <Link
                href="/question/ecosistemas-categorias-traductores-functoriales"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-all pt-2 border-t border-zinc-900"
              >
                <span>Debatir Hipótesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dilema 4 */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-teal-500/50 transition-all flex flex-col justify-between group space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Medición por Contraste
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Robustez OOD: Adaptación Iterativa vs. Deducción Previa
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  Frente a escenarios desconocidos, ¿debería la IA priorizar la interacción masiva y autocorrección topológica antes que el razonamiento deductivo puro?
                </p>
              </div>
              <Link
                href="/question/invariantes-topologicas-robustez-ood"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-all pt-2 border-t border-zinc-900"
              >
                <span>Debatir Hipótesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dilema 5 */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-teal-500/50 transition-all flex flex-col justify-between group space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Atracción y SMART
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Métricas de Optimización vs. Bienestar Humano
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  La formalización precisa en Machine Learning frente a la imposibilidad de reducir la experiencia subjetiva a una sola variable escalar optimizable.
                </p>
              </div>
              <Link
                href="/question/metricas-diferenciables-escalares-difusos-smart"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-all pt-2 border-t border-zinc-900"
              >
                <span>Debatir Hipótesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Dilema 6 */}
            <div className="p-6 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-teal-500/50 transition-all flex flex-col justify-between group space-y-4">
              <div className="space-y-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-teal-500/10 text-teal-300 border border-teal-500/20">
                  Síntesis Global
                </span>
                <h4 className="text-base font-bold text-white group-hover:text-teal-300 transition-colors">
                  Eficiencia Computacional, Atractores y Dinámica Viva
                </h4>
                <p className="text-xs text-zinc-400 leading-relaxed line-clamp-3">
                  Computación adiabática y relajación hacia atractores de mínima energía: ¿es la mínima disipación compatible con la cognición adaptativa?
                </p>
              </div>
              <Link
                href="/question/ingenieria-disipativa-principio-minima-accion"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-400 group-hover:translate-x-1 transition-all pt-2 border-t border-zinc-900"
              >
                <span>Debatir Hipótesis</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* BANNER CTA DIRECTO */}
        <div className="rounded-3xl p-8 bg-gradient-to-r from-teal-950/80 via-zinc-950 to-indigo-950/80 border border-teal-500/30 text-center space-y-4 shadow-[0_0_30px_rgba(0,242,254,0.1)]">
          <h3 className="text-xl sm:text-3xl font-extrabold text-white">
            ¿Tienes una hipótesis teórica que aportar?
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
            Únete a científicos de datos, físicos y programadores. Publica respuestas científicas, recibe revisión por pares y escala en el leaderboard.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/blog"
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#00f2fe] to-teal-400 text-black font-extrabold text-xs tracking-wide shadow-[0_0_20px_rgba(0,242,254,0.3)] hover:scale-105 transition-all"
            >
              Explorar Todos los Debates
            </Link>
            <Link
              href="/ranking"
              className="px-6 py-2.5 rounded-full bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-zinc-200 text-xs font-semibold transition-all flex items-center gap-1.5"
            >
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              <span>Ver Ranking de Investigadores</span>
            </Link>
          </div>
        </div>
      </section>

      {/* SECCIÓN PREGUNTAS FRECUENTES (SEO & GEO - OPTIMIZADO PARA MOTORES DE IA) */}
      <section id="faq" className="py-20 px-6 max-w-4xl mx-auto z-10 relative">
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 text-xs font-mono">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Respuestas Clave para Investigadores</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Preguntas Frecuentes (FAQ)
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm max-w-xl mx-auto">
            Todo lo que necesitas saber sobre la Teoría TECD, el ranking científico y la participación de la comunidad de datos.
          </p>
        </div>

        {/* Microdatos Schema.org para FAQPage (Google Rich Results & Perplexity/ChatGPT) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "¿Qué es la Teoría de la Emergencia Categorial Disipativa (TECD) y por qué interesa a un científico de datos?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "La TECD es un marco teórico que propone que el espaciotiempo, la clasicidad y los procesos cognitivos emergen de redes informacionales y dinámicas disipativas fuera del equilibrio. A los científicos de datos les ofrece modelos formales para abordar la robustez fuera de distribución (OOD), el cálculo diferencial sobre métricas complejas y la computación inspirada en atractores termodinámicos de bajo consumo energético.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cómo funciona el Ranking Científico Peer-to-Peer?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "El ranking científico recompensa la generación de conocimiento con valor intelectual. La fórmula evalúa la iniciativa al formular respuestas científicas y el promedio ponderado de debates constructivos que los colegas investigadores dejan en dichas respuestas, evitando métricas vanas o algoritmos de interacción adictiva.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Cómo se conecta la computación cuántica con el aprendizaje automático (Machine Learning) en Aion Neural?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Aion Neural desarrolla arquitecturas de redes neuronales cuánticas (QNN) y algoritmos neuromórficos donde la resolución de un problema matemático equivale a dejar que el sistema se relaje naturalmente hacia su estado de menor energía disipativa, reduciendo exponencialmente el consumo energético frente a los modelos clásicos de fuerza bruta.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Puedo participar protegiendo mi identidad corporativa o académica?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sí. Cada investigador puede configurar en cualquier momento si desea participar con su Nombre Real y credenciales públicas (LinkedIn, Web) o con un Alias académico verificado, salvaguardando su privacidad mientras acumula prestigio y puntaje científico en la red.",
                  },
                },
                {
                  "@type": "Question",
                  name: "¿Es gratuito y abierto para científicos de todo el mundo?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Sí. Todo el contenido y los dilemas del blog son de acceso libre. Para formular respuestas o participar activamente en los hilos de debate solo se requiere crear una cuenta verificada y aceptar el compromiso deontológico y ético de la plataforma.",
                  },
                },
              ],
            }),
          }}
        />

        {/* ACCORDION INTERACTIVO */}
        <div className="space-y-4">
          {[
            {
              q: "¿Qué es la Teoría de la Emergencia Categorial Disipativa (TECD) y por qué interesa a un científico de datos?",
              a: "La TECD es un marco teórico que propone que el espaciotiempo, la clasicidad y los procesos cognitivos emergen de redes informacionales y dinámicas disipativas fuera del equilibrio. A los científicos de datos les ofrece modelos formales para abordar la robustez fuera de distribución (OOD), el cálculo diferencial sobre métricas complejas y la computación inspirada en atractores termodinámicos de bajo consumo energético.",
            },
            {
              q: "¿Cómo funciona el Ranking Científico Peer-to-Peer?",
              a: "El ranking científico recompensa la generación de conocimiento con valor intelectual. La fórmula evalúa la iniciativa al formular respuestas científicas y el promedio ponderado de debates constructivos que los colegas investigadores dejan en dichas respuestas, evitando métricas vanas o algoritmos de interacción adictiva.",
            },
            {
              q: "¿Cómo se conecta la computación cuántica con el aprendizaje automático en Aion Neural?",
              a: "Aion Neural desarrolla arquitecturas de redes neuronales cuánticas (QNN) y algoritmos neuromórficos donde la resolución de un problema matemático equivale a dejar que el sistema se relaje naturalmente hacia su estado de menor energía disipativa, reduciendo exponencialmente el consumo energético frente a los modelos clásicos de fuerza bruta.",
            },
            {
              q: "¿Puedo participar protegiendo mi identidad corporativa o académica?",
              a: "Sí. Cada investigador puede configurar en cualquier momento si desea participar con su Nombre Real y credenciales públicas (LinkedIn, Web) o con un Alias académico verificado, salvaguardando su privacidad mientras acumula prestigio y puntaje científico en la red.",
            },
            {
              q: "¿Es gratuito y abierto para científicos e ingenieros de todo el mundo?",
              a: "Sí. Todo el contenido y los dilemas del blog son de acceso libre. Para formular respuestas o participar activamente en los hilos de debate solo se requiere crear una cuenta verificada y aceptar el compromiso deontológico y ético de la plataforma.",
            },
          ].map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-950/80 border border-zinc-800/80 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-zinc-100">
                    {item.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-teal-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-900 pt-3">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* CONTACTO & FOOTER */}
      <footer id="contacto" className="border-t border-zinc-900 py-16 px-6 max-w-6xl mx-auto text-center space-y-6 text-xs text-zinc-500 font-mono">
        <div className="flex flex-wrap items-center justify-center gap-6 text-zinc-400">
          <a href="#desafio" className="hover:text-white">Desafío</a>
          <a href="#ecosistema" className="hover:text-white">Ecosistema</a>
          <a href="#hoja-ruta" className="hover:text-white">Hoja de Ruta</a>
          <Link href="/blog" className="text-[#00f2fe] font-bold">Blog TECD</Link>
          <a href="https://aion-os-mu.vercel.app/" target="_blank" rel="noopener noreferrer" className="hover:text-[#39ff14]">Demo</a>
        </div>
        <p>© {new Date().getFullYear()} AION NEURAL. Securing Tomorrow's Intelligence, Today.</p>
      </footer>
    </div>
  );
}
