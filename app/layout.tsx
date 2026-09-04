import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const siteUrl = "https://aion-neural.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Aion Neural • Computación Cuántica, IA & Comunidad Científica de Datos (TECD)",
    template: "%s | Aion Neural",
  },
  description:
    "Comunidad científica y think-tank peer-to-peer para Científicos de Datos e Investigadores de IA. Debates sobre la Teoría de la Emergencia Categorial Disipativa (TECD), computación cuántica, robustez OOD y física de la información.",
  keywords: [
    "comunidad científicos de datos",
    "red de ciencia de datos",
    "computación cuántica",
    "inteligencia artificial cuántica",
    "quantum machine learning",
    "redes neuronales cuánticas",
    "TECD",
    "emergencia categorial disipativa",
    "teoría de categorías machine learning",
    "robustez fuera de distribución",
    "out of distribution OOD",
    "it from bit física cuántica",
    "criptografía post cuántica NIST",
    "ranking científico peer-to-peer",
    "debate científico IA",
    "termodinámica del aprendizaje profundo",
    "atractores de menor energía",
    "Aion Neural",
    "think tank data science",
  ],
  authors: [{ name: "Comité Científico TECD", url: siteUrl }],
  creator: "Aion Neural",
  publisher: "Aion Neural",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: siteUrl,
    siteName: "Aion Neural • Red Científica TECD",
    title: "Aion Neural • Comunidad de Científicos de Datos & Computación Cuántica",
    description:
      "Únete al debate de frontera: ¿emerge el espaciotiempo de redes de información? Publica tus hipótesis, debate con pares y escala en el ranking de investigadores de la TECD.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aion Neural • Comunidad Científica de Datos & TECD",
    description:
      "Red peer-to-peer para debatir IA de vanguardia, termodinámica de algoritmos y computación cuántica. Accede al blog y ranking científico.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "Aion Neural",
      url: siteUrl,
      description:
        "Laboratorio y plataforma de computación cuántica, inteligencia artificial y arquitectura de datos post-cuántica.",
      sameAs: [
        "https://github.com/alanlopeez/aion-neural",
        "https://aion-os-mu.vercel.app/",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Aion Neural • TECD",
      publisher: {
        "@id": `${siteUrl}/#organization`,
      },
      inLanguage: "es",
    },
    {
      "@type": "ResearchProject",
      "@id": `${siteUrl}/#project`,
      name: "Teoría de la Emergencia Categorial Disipativa (TECD)",
      url: `${siteUrl}/blog`,
      description:
        "Comunidad peer-to-peer y marco teórico de ciencia de datos que modela el espaciotiempo, la decoherencia cuántica y el aprendizaje de máquinas como procesos informacionales y disipativos.",
      funder: {
        "@id": `${siteUrl}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} font-sans min-h-screen flex flex-col bg-zinc-950 text-zinc-100 antialiased selection:bg-teal-500 selection:text-zinc-950`}
      >
        <SessionProvider>
          <ThemeProvider>
            <div className="relative min-h-screen flex flex-col">
              {/* Background ambient gradient */}
              <div className="fixed inset-0 -z-10 pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-teal-500/10 via-indigo-600/5 to-transparent blur-3xl opacity-70" />
                <div className="absolute top-[400px] right-0 w-[500px] h-[500px] bg-purple-600/5 blur-3xl" />
              </div>

              <Navbar />
              <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-20 md:py-8">
                {children}
              </main>
              <Footer />
            </div>
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
