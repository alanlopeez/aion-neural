import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando sincronización de artículos de consenso científico TECD...");

  // 1. Administrador TECD (sin nombres personales, identidad institucional)
  const adminPassword = await bcrypt.hash("AdminTECD2026!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@tecd.science" },
    update: {
      name: "Comité Científico TECD",
    },
    create: {
      name: "Comité Científico TECD",
      email: "admin@tecd.science",
      passwordHash: adminPassword,
      role: "ADMIN",
      publicIdentityType: "USERNAME",
      ethicsAcceptedAt: new Date(),
      visibility: {
        create: {
          showEmail: true,
          linkedinUrl: "https://linkedin.com",
          websiteUrl: "https://tecd.science",
        },
      },
    },
  });

  // 2. Crear usuarios investigadores iniciales para dinámica social
  const pass1 = await bcrypt.hash("QuantumResearch2026!", 12);
  const userElena = await prisma.user.upsert({
    where: { email: "elena.rostova@q-institute.org" },
    update: {},
    create: {
      name: "Dra. Elena Rostova",
      email: "elena.rostova@q-institute.org",
      passwordHash: pass1,
      role: "USER",
      publicIdentityType: "ALIAS",
      alias: "EntropiaTopologica",
      ethicsAcceptedAt: new Date(),
      visibility: {
        create: {
          showEmail: false,
          linkedinUrl: "https://linkedin.com/in/elena-rostova",
        },
      },
    },
  });

  const pass2 = await bcrypt.hash("NeuroDynamix2026!", 12);
  const userMarcus = await prisma.user.upsert({
    where: { email: "marcus.vance@neurodata.lab" },
    update: {},
    create: {
      name: "Marcus Vance",
      email: "marcus.vance@neurodata.lab",
      passwordHash: pass2,
      role: "USER",
      publicIdentityType: "USERNAME",
      ethicsAcceptedAt: new Date(),
      visibility: {
        create: {
          showEmail: true,
          genericSocialUrl: "https://x.com/marcus_q",
        },
      },
    },
  });

  // 3. 6 Artículos Consensuados del Documento Canónico
  const articles = [
    {
      title: "El Espaciotiempo como Propiedad Emergente e It from Bit",
      slug: "universo-red-informacion-binaria-it-from-bit",
      category: "Ontología de Noción Única",
      intersectionNumber: 1,
      summary:
        "¿Emerge el espaciotiempo de estructuras cuánticas de entrelazamiento? De la conjetura \"It from bit\" a la dinámica fundamental que genera geometría, materia y tiempo para observadores macroscópicos.",
      content: `En varias líneas de investigación en gravedad cuántica y teoría de la información, el espaciotiempo aparece no como un ingrediente necesariamente fundamental, sino como una propiedad emergente de estructuras cuánticas más profundas, especialmente de patrones de tensión y entrelazamiento.

En ese contexto, la idea de Wheeler de "it from bit" sigue siendo una guía conceptual influyente: sugiere que la información desempeña un papel constitutivo en la física fundamental. Sin embargo, no existe consenso en que la realidad esté hecha literalmente de bits binarios ni en que el universo sea, en sentido estricto, una computadora.

Lo que sí parece consolidarse es la posibilidad de que conceptos clásicos como geometría, localidad e incluso ciertos aspectos del tiempo surjan colectivamente a partir de grados de libertad cuánticos más básicos.

### Pregunta para el debate:
¿Qué dinámica física fundamental da lugar a que la información cuántica adopte una descripción efectiva como geometría, materia y tiempo para observadores macroscópicos?`,
    },
    {
      title: "La Flecha del Tiempo, Decoherencia Cuántica y la Emergencia de la Clasicidad",
      slug: "tiempo-medida-entropica-medicion-fluida",
      category: "Tiempo Fluidificado",
      intersectionNumber: 4,
      summary:
        "El tiempo no se identifica simplemente con la entropía: decoherencia, irreversibilidad gradual y la transición dinámica hacia resultados clásicos frente a la ontología del colapso.",
      content: `El tiempo no se identifica simplemente con la entropía, pero la flecha macroscópica del tiempo parece estar estrechamente ligada a procesos irreversibles, al aumento de entropía y, en algunos enfoques cuánticos, al crecimiento de correlaciones y entrelazamiento.

En mecánica cuántica, la medición no siempre se interpreta como un colapso físico instantáneo; con frecuencia se modela como un proceso dinámico en el que la decoherencia, la interacción con el entorno y la amplificación de registros hacen que surjan resultados efectivamente clásicos.

En ese marco, un suceso puede considerarse "ocurrido" cuando su resultado se vuelve estable, repetible y prácticamente irreversible por haber quedado registrado en muchos grados de libertad, aunque el estatus ontológico último de ese proceso sigue siendo una cuestión abierta.

En suma, el consenso científico permite hablar de emergencia gradual de irreversibilidad y de clasicidad, pero no de que el tiempo "sea" solo entropía ni de que el problema de la medición esté resuelto de forma definitiva.

### Pregunta para el debate:
¿Es el flujo direccional del tiempo y la consolidación de nuestra realidad clásica una característica fundamental y objetiva del universo, o son simplemente ilusiones macroscópicas que emergen de la pérdida de información, la decoherencia cuántica y el aumento irreversible de la entropía?`,
    },
    {
      title: "Teoría de Categorías, Functores y el Debate del Realismo Estructural",
      slug: "ecosistemas-categorias-traductores-functoriales",
      category: "Ontología de Noción Única",
      intersectionNumber: 1,
      summary:
        "La teoría de categorías como lenguaje riguroso de correspondencias entre entorno, información y acción: functores que preservan estructura frente a la ontología material.",
      content: `La teoría de categorías puede usarse como un lenguaje matemático para representar sistemas, transformaciones y correspondencias entre distintos niveles de descripción —por ejemplo, entorno, información y acción— de manera rigurosa y coherente.

En ese contexto, los functores no son traductores perfectos de "todo a todo", sino aplicaciones que preservan estructuras bien definidas entre categorías y permiten comparar modelos, expresar equivalencias parciales o transferir resultados entre dominios.

Desde el lado filosófico, esta clase de formalismo es compatible con lecturas estructuralistas o relacionales de la física, donde la estructura matemática de una teoría recibe un papel central. Pero la literatura no converge en que eso elimine los objetos materiales ni en que la matemática agote por completo la ontología física; varias revisiones sostienen que las versiones radicales del realismo estructural siguen siendo discutidas, mientras que las versiones moderadas conservan algún papel para objetos, campos o tipos físicos.

Que un marco matemático describa la realidad en términos relacionales no demuestra que la realidad fundamental sea solo relaciones ni que la materia sea ilusoria. La física contemporánea da buenas razones para tomar la estructura muy en serio, pero no ofrece consenso a favor de eliminar por completo objetos, campos o clases materiales del inventario ontológico.

### Pregunta para el debate:
¿Demuestra el formalismo relacional de la teoría de categorías que la realidad fundamental consiste únicamente en estructuras matemáticas, o siguen siendo necesarios los objetos y campos materiales en el inventario ontológico de la física?`,
    },
    {
      title: "Robustez Fuera de Distribución (OOD): Adaptación Iterativa vs. Razonamiento Deductivo",
      slug: "invariantes-topologicas-robustez-ood",
      category: "Medición por Contraste",
      intersectionNumber: 2,
      summary:
        "Incertidumbre, representaciones y topología: cómo enfrentan los sistemas inteligentes escenarios desconocidos combinando análisis, interacción y autocorrección rápida.",
      content: `La robustez ante escenarios OOD (fuera de distribución) no parece depender de una capacidad mágica para predecir cualquier novedad, sino de combinar buenas representaciones, estimación de incertidumbre, adaptación iterativa y, en algunos casos, estructura topológica específica.

La evidencia científica no sugiere que razonar antes de actuar sea una pérdida de tiempo, sino que los sistemas más robustos probablemente necesiten análisis, interacción y autocorrección rápida en conjunto, no como alternativas excluyentes.

### Pregunta para el debate:
Si la robustez de un sistema ante escenarios completamente desconocidos (fuera de distribución) no depende de su capacidad de razonar lógicamente antes de actuar, sino de su velocidad de iteración y resistencia para autocorregirse hasta que la estructura invariante del problema emerja del ruido, ¿deberíamos reorientar la investigación en IA hacia sistemas de interacción masiva y autocorrección rápida en lugar de perfeccionar el algoritmo deductivo previo?`,
    },
    {
      title: "Métricas de Optimización vs. Bienestar Humano: Los Límites de los Objetivos Cuantificables",
      slug: "metricas-diferenciables-escalares-difusos-smart",
      category: "Atracción y SMART",
      intersectionNumber: 3,
      summary:
        "Formalización precisa en IA frente a la complejidad del bienestar humano: por qué una vida plena no puede reducirse a una sola variable escalar optimizable.",
      content: `En inteligencia artificial, los sistemas aprenden mejor cuando el objetivo está formalizado de manera precisa y optimizable; en conducta humana, traducir deseos vagos en metas concretas y revisables suele facilitar el cambio; pero en bienestar humano ninguna métrica única captura por completo una vida buena, porque el bienestar incluye experiencia, satisfacción, significado y relaciones, además de estar modulado por expectativas y contexto.

En síntesis, la "cuantificación implacable" no parece ser ni un error total ni la única vía válida: las métricas ayudan a orientar la acción, pero el consenso científico indica que el bienestar humano pierde precisión —y a veces sentido— cuando se lo trata como si fuera una sola variable optimizable.

### Pregunta para el debate:
Si la robustez de un sistema —ya sea una red neuronal o un ser humano— no depende de su capacidad para predecir el caos, sino de iterar y autocorregirse hasta que la estructura invariante del problema emerja del ruido, ¿deberíamos reemplazar el ideal de "planificar metas perfectas" (SMART) por un modelo de "exploración masiva y corrección continua" donde la métrica óptima se descubre dinámicamente, no se define de antemano?`,
    },
    {
      title: "Eficiencia Computacional, Atractores y Dinámica Fuera del Equilibrio",
      slug: "ingenieria-disipativa-principio-minima-accion",
      category: "Síntesis Global",
      intersectionNumber: 5,
      summary:
        "De la computación adiabática y neuromórfica a la cognición viva: cómo balancear la convergencia a atractores de baja disipación con la flexibilidad adaptativa de sistemas fuera del equilibrio.",
      content: `La eficiencia cognitiva y computacional no suele depender de aplicar más fuerza bruta, sino de organizar la arquitectura, la codificación y la dinámica del sistema para que resuelva problemas con el menor coste energético compatible con la precisión y la flexibilidad.

En algunos modelos neuronales y dispositivos físicos, esto puede describirse como convergencia hacia atractores o estados de baja disipación; sin embargo, ni el cerebro ni los sistemas inteligentes reales funcionan como mecanismos pasivos en reposo, sino como sistemas adaptativos, activos y alejados del equilibrio.

### Pregunta para el debate:
¿Es la búsqueda de la máxima eficiencia energética y computacional (mediante estados de mínima disipación) fundamentalmente incompatible con el desarrollo de una inteligencia verdaderamente adaptativa, dado que la cognición biológica exige operar en estados dinámicos y alejados del equilibrio termodinámico?`,
    },
  ];

  for (const art of articles) {
    const q = await prisma.question.upsert({
      where: { slug: art.slug },
      update: {
        title: art.title,
        summary: art.summary,
        content: art.content,
        category: art.category,
        intersectionNumber: art.intersectionNumber,
      },
      create: {
        title: art.title,
        slug: art.slug,
        summary: art.summary,
        content: art.content,
        category: art.category,
        intersectionNumber: art.intersectionNumber,
        authorId: admin.id,
      },
    });

    // Añadir una respuesta científica de Elena en el primer artículo para ilustrar la dinámica social
    if (art.slug === "universo-red-informacion-binaria-it-from-bit") {
      const existingAnswer = await prisma.answer.findFirst({
        where: { questionId: q.id, authorId: userElena.id },
      });

      if (!existingAnswer) {
        const answer = await prisma.answer.create({
          data: {
            questionId: q.id,
            authorId: userElena.id,
            content:
              "Desde la física de la información, no se requiere un 'observador consciente central' que procese las diferencias. La red cuántica se auto-organiza termodinámicamente a través de correlaciones y entrelazamiento local. El espaciotiempo efectivo describe la geometría que emerge de dichos grados de libertad.",
          },
        });

        // Debate de Marcus sobre la respuesta de Elena
        await prisma.comment.create({
          data: {
            answerId: answer.id,
            authorId: userMarcus.id,
            content:
              "Excelente formulación. Sin embargo, ¿cómo preservas la consistencia entre la decoherencia dinámica y los modelos de gravedad cuántica basados en tensor networks?",
          },
        });
      }
    }
  }

  console.log("✅ Siembra y sincronización de 6 artículos completada con éxito.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
