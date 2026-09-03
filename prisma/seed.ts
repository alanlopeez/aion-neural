import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Iniciando siembra de datos científicos TECD...");

  // 1. Crear usuario Administrador / Desarrollador Principal
  const adminPassword = await bcrypt.hash("AdminTECD2026!", 12);
  const admin = await prisma.user.upsert({
    where: { email: "admin@tecd.science" },
    update: {},
    create: {
      name: "Dr. Alan V.",
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

  // 3. Insertar Artículos Fundamentales de la TECD (extraídos del documento canónico)
  const articles = [
    {
      title: "El Universo como Red de Información Binaria (It from Bit)",
      slug: "universo-red-informacion-binaria-it-from-bit",
      category: "Ontología de Noción Única",
      intersectionNumber: 1,
      summary:
        "¿Y si el espacio, el tiempo y la materia no son fundamentales sino propiedades emergentes de diferencias binarias elementales? Wheeler y la emergencia informacional.",
      content: `Imagina que el universo no está hecho de partículas físicas, ni de un "tejido" continuo de espacio y tiempo. Según esta idea, en su nivel más profundo y microscópico, lo único que existe es pura información binaria: el contraste o la diferencia entre una cosa y otra (como el 1 y el 0 en el código de una computadora). Todo lo que tocamos y medimos —el espacio, el tiempo, la masa y la energía— no existe realmente a esa escala. Son solo un efecto secundario (una propiedad emergente) que aparece cuando miles de millones de estas diferencias básicas se agrupan. Es exactamente igual a cómo un conjunto de píxeles cuadrados individuales crea la ilusión de una fotografía fluida y continua solo cuando los miras desde lejos.

Esta perspectiva se alinea fuertemente con la filosofía de la ciencia, la "física digital" y la teoría de la información. Conecta directamente con la famosa idea It from bit (Todo surge del bit) del físico teórico John Archibald Wheeler, la cual sugiere que el universo es fundamentalmente información, y la materia es solo una manifestación de esa información. Actualmente, en la búsqueda de una teoría de la gravedad cuántica, muchos físicos sostienen que el espaciotiempo no es un componente fundamental de la realidad, sino algo que "emerge" de redes de información cuántica mucho más abstractas.

### Pregunta para el debate:
Si el espacio, el tiempo y la materia son solo una ilusión macroscópica creada por la acumulación de simples "diferencias", ¿qué o quién está procesando esa información base para que nosotros la experimentemos como un universo sólido, continuo y tangible?`,
    },
    {
      title: "El Tiempo como Medida Entrópica y la Medición Fluida",
      slug: "tiempo-medida-entropica-medicion-fluida",
      category: "Categorías Interconectables y Tiempo Fluidificado",
      intersectionNumber: 4,
      summary:
        "Desafiando la Interpretación de Copenhague: el colapso no es instantáneo sino una transición suave gobernada por la termodinámica y el Bayesianismo Cuántico (QBism).",
      content: `Imagina que el tiempo y la realidad no funcionan como un interruptor de luz (encendido o apagado), sino como un regulador de intensidad. El tiempo no es un reloj universal de fondo que hace "tic-tac", sino simplemente una medida del desorden (entropía). Sabemos que un estado pertenece al "futuro" respecto a otro simplemente porque es más caótico o desordenado, no porque el reloj haya avanzado.

A nivel cuántico, esto significa que observar o "medir" un sistema no obliga a la realidad a tomar una decisión instantánea y definitiva. En lugar de un corte brusco donde una posibilidad se vuelve 100% real y el resto se esfuma, ocurre una transición suave. Es como una balanza que se inclina gradualmente: a medida que interactuamos con el sistema, una opción se vuelve progresivamente más probable y nítida, mientras que las otras se desvanecen de forma fluida.

Este texto desafía directamente a la "Interpretación de Copenhague", la visión clásica de la mecánica cuántica que sostiene que medir algo causa un "colapso" instantáneo y violento de las probabilidades. La idea de una medición como "actualización fluida" se conecta con enfoques físicos y filosóficos más modernos (como la decoherencia cuántica o el Bayesianismo Cuántico / QBism), donde la realidad es un flujo de información que se va ajustando. Asimismo, definir el tiempo a través de la entropía relativa se apoya en la termodinámica, argumentando que la famosa "flecha del tiempo" (la sensación de que el tiempo fluye hacia adelante) es solo un efecto estadístico.

### Pregunta para el debate:
Si la realidad nunca se "congela" de golpe mediante un colapso y los eventos son simplemente probabilidades que se inclinan gradualmente como un fluido, ¿en qué punto exacto, si es que existe alguno, podemos afirmar que un suceso realmente "ya ocurrió" y se volvió irreversible?`,
    },
    {
      title: "Ecosistemas de Categorías y Traductores Functoriales",
      slug: "ecosistemas-categorias-traductores-functoriales",
      category: "Ontología de Noción Única",
      intersectionNumber: 1,
      summary:
        "La Teoría de Categorías como puente unificador: el Entorno, la Información Latente y la Acción interconectados por functores que preservan la estructura.",
      content: `Imagina que, en lugar de estudiar las cosas como piezas aisladas e independientes, este modelo trata la realidad como diferentes "ecosistemas" o redes, llamados Categorías. En este caso, tenemos tres ecosistemas principales: el mundo que nos rodea (Entorno), los datos o patrones ocultos (Información Latente) y los eventos o movimientos (Acción).

La clave de este modelo son los functores, que actúan como traductores universales perfectos entre estos mundos. Si descubres un patrón, regla o "mapa" de relaciones en el Entorno, el functor lo traduce matemáticamente para que aplique de forma natural a la Acción o a la Información. Es como si una canción escrita en una partitura musical se tradujera automáticamente a los pasos exactos de una coreografía, manteniendo intacta la misma estructura matemática de fondo, sin perder ningún detalle en la traducción.

El texto se fundamenta en la Teoría de Categorías, una rama sumamente abstracta y poderosa de las matemáticas modernas desarrollada a mediados del siglo XX (principalmente por Saunders Mac Lane y Samuel Eilenberg). Su propósito original era unificar distintas ramas de las matemáticas demostrando que comparten estructuras equivalentes.

En lugar de enfocarse en qué son las cosas (los objetos), esta teoría se enfoca en cómo se relacionan (los morfismos). Hoy en día, es una herramienta fundamental en la informática teórica, la física cuántica y el diseño de sistemas complejos. Al aplicar este marco a un modelo físico o filosófico, el autor garantiza que todo el sistema sea rigurosamente coherente: ningún componente puede existir en el vacío, y cualquier cambio en la estructura del entorno tiene un reflejo matemáticamente exacto en la información y en la acción.

### Pregunta para el debate:
Si cualquier elemento del entorno, pensamiento (información) o movimiento (acción) puede traducirse matemáticamente de un ecosistema a otro de forma impecable, ¿significa esto que la naturaleza fundamental de la realidad es puramente relacional (solo importan las conexiones matemáticas) y que la "materia" en sí misma es solo una ilusión?`,
    },
    {
      title: "Invariantes Topológicas y Robustez Fuera de Distribución (OOD)",
      slug: "invariantes-topologicas-robustez-ood",
      category: "Medición por Contraste y OOD Repetitivo",
      intersectionNumber: 2,
      summary:
        "Frente al caos inesperado, la estadística iterativa y la inferencia activa filtran el ruido transitorio revelando la topología matemática subyacente.",
      content: `Imagina que un sistema o una inteligencia artificial se enfrenta a un escenario completamente nuevo, extraño y caótico para el que nunca fue entrenado (esto es lo que significa "Fuera de Distribución" o OOD). En lugar de intentar ser brillante y adivinar de antemano cómo resolver ese misterio, el sistema adopta una estrategia más rústica pero efectiva: repetir su proceso de evaluación una y otra vez en un ciclo continuo.

Al hacer esto miles de veces introduciendo cierta aleatoriedad, las distracciones, los datos engañosos y los errores (el "ruido" efímero) terminan anulándose entre sí porque cambian constantemente. Lo único que no cambia y se mantiene firme a través de todas las repeticiones es la estructura central y verdadera del problema (la "invariante topológica"). Es como tomar mil fotografías nocturnas con mucho "grano" o ruido visual de una calle: al superponer todas las imágenes, las personas y los autos en movimiento se borran, y lo único que queda perfectamente nítido es la forma inamovible de los edificios.

Esta idea cruza la frontera entre la inteligencia artificial (Machine Learning), la estadística y la topología matemática. Uno de los mayores problemas actuales en la IA es su fragilidad: los modelos colapsan cuando se enfrentan a datos fuera de su distribución original (OOD). El enfoque tradicional intenta enseñar a la máquina a "predecir" o razonar lo desconocido. Sin embargo, esta visión propone que la robustez real proviene de la estadística iterativa (similar a los métodos de Monte Carlo o la Inferencia Activa en neurociencia). En lugar de predecir el caos, el sistema confía en que, matemáticamente, los aspectos transitorios de cualquier entorno eventualmente se promedian a cero, dejando al descubierto la topología (la "forma" matemática fundamental e inalterable) de la realidad que subyace al ruido.

### Pregunta para el debate:
Si la capacidad de sobrevivir a lo desconocido no depende de la genialidad para predecir el futuro, sino de la velocidad y resistencia para iterar hasta que la verdad se revele, ¿estamos perdiendo el tiempo intentando crear inteligencias artificiales que "razonen" lógicamente antes de actuar, en lugar de sistemas que simplemente interactúen y se autocorrijan a velocidades masivas?`,
    },
    {
      title: "Métricas Diferenciables vs. Escalares Difusos (Objetivos SMART)",
      slug: "metricas-diferenciables-escalares-difusos-smart",
      category: "Atracción, Control y Objetivos SMART",
      intersectionNumber: 3,
      summary:
        "Del deseo abstracto a la pendiente matemática: fusión entre metas SMART, optimización de gradiente en Deep Learning y cálculo diferencial cognitivo.",
      content: `Imagina que estás usando un GPS y le gritas: "¡Llévame a un lugar tranquilo!". El dispositivo se queda paralizado porque no sabe qué significa "tranquilo" ni hacia dónde girar; carece de coordenadas claras. En términos matemáticos, eso es un "escalar difuso sin gradiente": una idea vaga que no ofrece una dirección paso a paso para mejorar.

Lo mismo ocurre con el bienestar personal o el diseño de sistemas de inteligencia artificial. Desear "estabilidad" o "dormir más" es demasiado abstracto. Sin embargo, si transformas ese deseo en una meta hiperespecífica, medible y con un límite de tiempo (como "lograr que las fluctuaciones de mi ritmo cardíaco sean menores al 1% durante las próximas 10,000 horas"), estás creando un mapa exacto. A esto se le llama una "métrica diferenciable": un camino donde el sistema puede calcular en cada instante si se está acercando o alejando de la meta, permitiéndole ajustar y corregir el rumbo automáticamente sin confundirse.

Este planteamiento fusiona la psicología del comportamiento (la famosa metodología de metas SMART: Específicas, Medibles, Alcanzables, Relevantes y Temporales) con la arquitectura del aprendizaje profundo (Deep Learning) y el cálculo diferencial. En inteligencia artificial, una red neuronal solo puede aprender y mejorar si su objetivo tiene un "gradiente"; es decir, una pendiente matemática que le indique hacia dónde "descender" para minimizar los errores. Al aplicar esta lógica ingenieril a la psicología humana, el texto argumenta que gran parte de nuestra frustración no nace de la incapacidad para ser felices, sino de un error de codificación: definimos nuestras metas emocionales de forma tan poética y ambigua que nuestro cerebro (o el sistema de hábitos) es literalmente incapaz de optimizarlas.

### Pregunta para el debate:
Si traducimos la felicidad, la paz mental y el bienestar humano en métricas rígidamente cuantificables y optimizables, ¿corremos el riesgo de vaciar la vida de su significado cualitativo, o es esta "cuantificación implacable" la única forma práctica y real de dejar de quejarnos y comenzar a mejorar de verdad?`,
    },
    {
      title: "Ingeniería Disipativa y Principio de Mínima Acción",
      slug: "ingenieria-disipativa-principio-minima-accion",
      category: "Síntesis Global y Límites de la Teoría Unificada",
      intersectionNumber: 5,
      summary:
        "El laberinto inclinado: la computación adiabática y neuromórfica demuestran que resolver un problema es simplemente relajarse hacia el atractor de menor energía.",
      content: `Imagina que necesitas encontrar la salida de un laberinto. El método tradicional (la "fuerza bruta") sería tener a alguien corriendo a toda velocidad, probando conscientemente cada pasillo y chocando contra las paredes hasta hallar el final; esto equivale a un procesador moderno haciendo millones de cálculos por segundo hasta recalentarse.

Este modelo propone algo radicalmente distinto: inclinar el laberinto y verter agua en el inicio. El agua no "piensa" ni procesa opciones de forma activa; simplemente fluye hacia abajo, buscando el punto de menor resistencia por gravedad, y encuentra la salida por sí sola. A nivel cognitivo y computacional, esto significa que la verdadera eficiencia no se logra pensando o calculando más rápido, sino estructurando el problema para que la respuesta aparezca como el estado de descanso natural del sistema. La solución no se persigue; el sistema simplemente se "relaja" y cae hacia ella.

Este concepto es la base de las nuevas fronteras en la tecnología, como la computación cuántica adiabática y el hardware neuromórfico (circuitos que imitan al cerebro). Nuestras computadoras clásicas, basadas en transistores, obligan a la energía a moverse en patrones rígidos, disipando cantidades masivas de calor en el proceso.

Sin embargo, el cerebro humano es capaz de reconocer rostros, comprender lenguaje y crear arte consumiendo apenas unos 20 vatios de energía (lo mismo que una bombilla de luz tenue). Esto es posible porque el cerebro funciona bajo principios de termodinámica y el "principio de mínima acción". Las redes neuronales no calculan la realidad empujando datos por la fuerza, sino que sus conexiones se reconfiguran hasta alcanzar un "atractor", que es su estado físico de mayor confort y mínimo gasto energético. La solución al problema es literalmente el punto donde el cerebro descansa.

### Pregunta para el debate:
Si la física y la neurociencia nos demuestran que la máxima brillantez y eficiencia ocurren cuando un sistema simplemente fluye hacia un estado de menor resistencia y desgaste, ¿deberíamos reconsiderar nuestra cultura moderna del trabajo y el aprendizaje, que idolatra el estrés mental, el esfuerzo bruto y la hiperactividad constante?`,
    },
  ];

  for (const art of articles) {
    const q = await prisma.question.upsert({
      where: { slug: art.slug },
      update: {},
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
              "Desde la formulación de la TECD, no se requiere un 'observador consciente central' que procese las diferencias binarias. La red categorial se auto-resuelve termodinámicamente a través de functores de coherencia local. El espaciotiempo es el tensor de acoplamiento entre los contrastes locales disipados hacia el fondo térmico.",
          },
        });

        // Debate de Marcus sobre la respuesta de Elena
        await prisma.comment.create({
          data: {
            answerId: answer.id,
            authorId: userMarcus.id,
            content:
              "Excelente formulación, colega. Sin embargo, ¿cómo preservas la unitariedad si la disipación local no retiene la memoria del functor inverso?",
          },
        });
      }
    }
  }

  console.log("✅ Siembra completada con éxito. Artículos, preguntas y debates activos.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
