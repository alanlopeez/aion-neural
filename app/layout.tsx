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

export const metadata: Metadata = {
  title: "TECD • Aion Neural | Red Científica de Emergencia Categorial Disipativa",
  description:
    "Red social y blog hiper-especializado para Científicos de Datos fundamentada en la Teoría de la Emergencia Categorial Disipativa (TECD).",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
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
