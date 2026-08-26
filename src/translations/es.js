// src/translations/es.js
// Textos en español de la interfaz. El inglés vive en ./en.js — mantén la misma forma.

export const es = {
  splash: {
    brand: "cchrdev — portafolio",
    aria: "Cargando el portafolio",
    status: [
      "cargando tipografías…",
      "puliendo detalles…",
      "afinando el cursor…",
      "todo listo…",
    ],
  },

  nav: {
    brandSub: "portafolio",
    links: {
      top: "Inicio",
      about: "Sobre mí",
      stack: "Stack",
      contact: "Contacto",
    },
    menuAria: "Menú",
    langAria: "Cambiar idioma",
  },

  hero: {
    eyebrow: "desarrollador full stack · redes · monitoreo",
    subtitle: "diseño, construyo y mantengo software que aguanta la carga.",
    tagline:
      "De la lógica transaccional a la conectividad: integro cada capa del producto y vigilo que nada se apague.",
    ticker: "stack principal",
    ctas: {
      primary: "escríbeme",
      secondary: "ver stack",
    },
    terminal: {
      title: "christopher@cchrdev",
      lines: [
        { cmd: "whoami", out: ["christopher — full stack developer"] },
        { cmd: "cat stack.txt", out: ["c# · python · javascript · sql", "react · node · postgres"] },
        { cmd: "ls monitoring/", out: ["whatsupgold  mikrotik  cisco", "aruba  ubiquiti  fortinet"] },
        { cmd: "uptime", out: ["disponible para nuevos proyectos"] },
      ],
    },
    stats: [
      { key: "certs", label: "certificaciones" },
      { key: "tech", label: "tecnologías" },
    ],
  },

  about: {
    eyebrow: "sobre mí",
    title: "Quién soy",
    lead:
      "Desarrollador full stack con raíces en redes y monitoreo: construyo aplicaciones completas y cuido la infraestructura que las sostiene — lo que no se mide no se puede mejorar.",
    body:
      "El día a día corre sobre C#, Python, JavaScript y SQL, con Cisco, MikroTik y WhatsUpGold como copiloto. Mantengo certificaciones en ciberseguridad y casi siempre estoy aprendiendo algo nuevo.",
    cards: [
      {
        title: "Desarrollo Full Stack",
        desc: "Aplicaciones completas de extremo a extremo: interfaz, lógica de negocio, APIs y datos.",
      },
      {
        title: "Redes e Infraestructura",
        desc: "Diseño y operación de redes cableadas e inalámbricas: Cisco, MikroTik, Ubiquiti y Aruba.",
      },
      {
        title: "Monitoreo Continuo",
        desc: "Visibilidad de la infraestructura con WhatsUpGold: detectar el fallo antes que el usuario.",
      },
      {
        title: "Seguridad y Certificaciones",
        desc: "Fundamentos de ciberseguridad Fortinet y CCNA, aplicados a cada capa del producto.",
      },
    ],
    contact: "ponte en contacto",
    certs: "certificaciones",
    tools: "tecnologías y herramientas",
    toolsGroups: [
      "Lenguajes de programación",
      "Frameworks frontend",
      "Frameworks backend",
      "Bases de datos",
      "Sistemas operativos",
      "Software y herramientas",
      "Redes y monitoreo",
    ],
  },

  projects: {
    eyebrow: "proyectos",
    title: "Lo que construyo",
    tagline: "Trabajo seleccionado — próximamente.",
    hint: "caso de estudio — próximamente",
    end: "…y esto es solo la superficie.",
    items: [
      {
        name: "Sistema Integral de Gestión, Logística e Inventarios integrado en SIMex",
        description:
          "Arquitectura backend y frontend para el control y movimiento masivo de inventarios consumibles y serializados: lógica transaccional avanzada, auditoría de movimientos y reportes desde un dashboard, sobre una arquitectura en capas.",
      },
      {
        name: "Proyecto Universitario — Formularios y Juegos Interactivos",
        description:
          "Aplicación tipo formulario para Android con minijuegos: Gato, Adivina la Palabra, Memorama y Rompecabezas.",
      },
      {
        name: "Sistema de Detección de Violencia en Tiempo Real",
        description:
          "Entrenamiento de modelos de aprendizaje profundo con frontend y backend completos para la detección de violencia en tiempo real en flujos de video.",
      },
      {
        name: "EduSphere — Plataforma de Gestión Escolar",
        description:
          "Aplicación web integral para la gestión escolar en instituciones de nivel básico y medio superior: digitaliza y optimiza procesos académicos y administrativos.",
      },
      {
        name: "Netwire AR — Redes con Realidad Aumentada",
        description:
          "Aplicación móvil interactiva para aprender redes con realidad aumentada: modelos 3D creados en Blender e integrados en Unity.",
      },
    ],
  },

  contact: {
    eyebrow: "contacto",
    title: "Dime hola",
    closingA: "Construyamos algo",
    closingB: "sorprendente",
    subtitle:
      "Abierto a nuevas oportunidades, colaboraciones y problemas interesantes. Escríbeme y hablemos.",
    cta: "escríbeme",
    footer: {
      rights: "todos los derechos reservados",
      built: "construido con",
      stack: "react + vite",
    },
  },

  cat: {
    messages: [
      { text: "miau. digo… bienvenido a cchrdev_" },
      { text: "soy el logo. el alma de esta página." },
      {
        text: "Christopher tiene 6 certificaciones. yo tengo 9 vidas. casi empate.",
      },
      {
        text: "¿reclutando? te llevo con él — la consulta es gratis.",
        action: { label: "▸ ir a contacto", type: "contact" },
      },
      { text: "*ronroneo estable a 60 fps*" },
      { text: "full stack, redes, monitoreo… y yo abro puertas cerradas." },
      { text: "no muerdo. bueno, solo a los bugs." },
      { text: "dicen que un gato siempre cae de pie. este sitio también." },
      { text: "psst — pasa el mouse por los links del nav. las letras ruedan. pruébalo." },
    ],
    wake: [
      { text: "…¿me despertaste para esto?" },
      { text: "zzz… ¿eh? estaba monitoreando. en sueños." },
    ],
  },
};
