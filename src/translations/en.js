// src/translations/en.js
// English UI strings. Spanish lives in ./es.js — keep the shapes in sync.

export const en = {
  splash: {
    brand: "cchrdev — portfolio",
    aria: "Loading the portfolio",
    status: [
      "loading typefaces…",
      "polishing details…",
      "calibrating the cursor…",
      "all set…",
    ],
  },

  nav: {
    brandSub: "portfolio",
    links: {
      top: "Top",
      about: "About",
      stack: "Stack",
      contact: "Contact",
    },
    menuAria: "Menu",
    langAria: "Switch language",
  },

  hero: {
    eyebrow: "full stack developer · networking · monitoring",
    subtitle: "I design, build and maintain software that holds up under load.",
    tagline:
      "From transactional logic to connectivity: I integrate every layer of the product and make sure nothing goes down.",
    ticker: "core stack",
    ctas: {
      primary: "write to me",
      secondary: "view stack",
    },
    terminal: {
      title: "christopher@cchrdev",
      lines: [
        { cmd: "whoami", out: ["christopher — full stack developer"] },
        { cmd: "cat stack.txt", out: ["c# · python · javascript · sql", "react · node · postgres"] },
        { cmd: "ls monitoring/", out: ["whatsupgold  mikrotik  cisco", "aruba  ubiquiti  fortinet"] },
        { cmd: "uptime", out: ["available for new projects"] },
      ],
    },
    stats: [
      { key: "certs", label: "certifications" },
      { key: "tech", label: "technologies" },
    ],
  },

  about: {
    eyebrow: "about",
    title: "Who I am",
    lead:
      "Full stack developer with roots in networking and monitoring: I build complete applications and take care of the infrastructure behind them — because what gets measured gets improved.",
    body:
      "Day to day runs on C#, Python, JavaScript and SQL, with Cisco, MikroTik and WhatsUpGold as copilot. I keep certifications in cybersecurity — and I'm usually learning something new.",
    cards: [
      {
        title: "Full Stack Development",
        desc: "Complete applications end to end: interface, business logic, APIs and data.",
      },
      {
        title: "Networking & Infrastructure",
        desc: "Design and operation of wired and wireless networks: Cisco, MikroTik, Ubiquiti and Aruba.",
      },
      {
        title: "Continuous Monitoring",
        desc: "Infrastructure visibility with WhatsUpGold: catching the failure before the user does.",
      },
      {
        title: "Security & Certifications",
        desc: "Fortinet cybersecurity fundamentals and CCNA, applied to every layer of the product.",
      },
    ],
    contact: "get in touch",
    certs: "certifications",
    tools: "technologies & tools",
    toolsGroups: [
      "Programming languages",
      "Frontend frameworks",
      "Backend frameworks",
      "Databases",
      "Operating systems",
      "Software & tools",
      "Networking & monitoring",
    ],
  },

  projects: {
    eyebrow: "projects",
    title: "What I build",
    tagline: "Selected work — coming soon.",
    hint: "case study — soon",
    end: "…and this is just the surface.",
    items: [
      {
        name: "Integrated Management, Logistics & Inventory System inside SIMex",
        description:
          "Backend and frontend architecture for the control and mass movement of consumable and serialized inventory: advanced transactional logic, movement auditing and dashboard-driven reporting, built on a layered architecture.",
      },
      {
        name: "University Project — Interactive Forms & Games",
        description:
          "A form-style Android application bundled with mini-games: Tic-Tac-Toe, Guess the Word, Memory Match and a Sliding Puzzle.",
      },
      {
        name: "Real-Time Violence Detection System",
        description:
          "Deep-learning model training with full frontend and backend development for real-time violence detection in video streams.",
      },
      {
        name: "EduSphere — School Management Platform",
        description:
          "A comprehensive web application for basic and high-school management: digitalizing and optimizing academic and administrative processes.",
      },
      {
        name: "Netwire AR — Augmented Reality Networking",
        description:
          "Interactive mobile app for learning networking with augmented reality: 3D model creation in Blender and integration in Unity.",
      },
    ],
  },

  contact: {
    eyebrow: "contact",
    title: "Say hello",
    closingA: "Let's build something",
    closingB: "surprising",
    subtitle:
      "Open to new opportunities, collaborations and interesting problems. Drop me a line and let's talk.",
    cta: "write to me",
    footer: {
      rights: "all rights reserved",
      built: "built with",
      stack: "react + vite",
    },
  },

  cat: {
    messages: [
      { text: "meow. I mean… welcome to cchrdev_" },
      { text: "I'm the logo. The soul of this page." },
      {
        text: "Christopher holds 6 certifications. I have 9 lives. Almost a tie.",
      },
      {
        text: "Recruiting? I'll take you to him — the consultation is free.",
        action: { label: "▸ go to contact", type: "contact" },
      },
      { text: "*steady purring at 60 fps*" },
      { text: "full stack, networking, monitoring… and I open locked doors." },
      { text: "I don't bite. Well, only bugs." },
      {
        text: "they say a cat always lands on its feet. this site too.",
      },
      { text: "psst — hover the nav links. the letters roll. try it." },
    ],
    wake: [
      { text: "…you woke me up for this?" },
      { text: "zzz… huh? I was monitoring. in my sleep." },
    ],
  },
};
