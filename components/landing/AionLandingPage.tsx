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
} from "lucide-react";

export function AionLandingPage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold uppercase tracking-wider text-zinc-400">
            <a href="#desafio" className="hover:text-zinc-100 transition-colors">
              Desafío
            </a>
            <a href="#ecosistema" className="hover:text-zinc-100 transition-colors">
              Ecosistema
            </a>
            <a href="#hoja-ruta" className="hover:text-zinc-100 transition-colors">
              Hoja de Ruta
            </a>
            <a href="#fundador" className="hover:text-zinc-100 transition-colors">
              Fundador
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
              href="#hoja-ruta"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-400"
            >
              Hoja de Ruta
            </a>
            <a
              href="#fundador"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-zinc-400"
            >
              Fundador
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

      {/* TEASER BANNER TO TECD BLOG */}
      <section className="py-16 px-6 max-w-5xl mx-auto z-10 relative">
        <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-teal-950/80 via-zinc-950 to-indigo-950/80 border border-teal-500/40 text-center space-y-6 shadow-[0_0_40px_rgba(0,242,254,0.15)]">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-500/15 text-teal-300 text-xs font-mono border border-teal-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Novedad • Red de Investigación Científica</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Blog & Think-Tank: Teoría de la Emergencia Categorial Disipativa (TECD)
          </h2>
          <p className="text-zinc-400 text-sm max-w-2xl mx-auto leading-relaxed">
            Participa en los debates cuánticos, responde dilemas científicos
            fundacionales formulados por el laboratorio de Aion Neural y escala en el
            ranking de investigadores.
          </p>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-gradient-to-r from-[#00f2fe] to-indigo-500 text-black font-extrabold text-sm shadow-[0_0_20px_rgba(0,242,254,0.4)] hover:scale-105 transition-all"
          >
            <span>Acceder al Blog y Comunidad TECD</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
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
