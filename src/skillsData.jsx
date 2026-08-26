// src/skillsData.jsx

import {
  FaJava,
  FaGitAlt,
  FaDatabase,
  FaLinux,
  FaPython,
  FaNodeJs,
  FaReact,
  FaHtml5,
  FaCss3,
  FaUbuntu,
  FaWindows,
} from "react-icons/fa";
import {
  SiJavascript,
  SiDjango,
  SiFlutter,
  SiDart,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiMicropython,
  SiPhp,
  SiSqlite,
  SiFedora,
  SiKalilinux,
  SiCisco,
  SiAndroidstudio,
  SiBlender,
  SiUnity,
  SiDebian,
  SiArchlinux,
  SiPostgresql,
  SiMikrotik,
  SiTplink,
  SiUbiquiti,
  SiFortinet,
} from "react-icons/si";
import { DiVisualstudio } from "react-icons/di";
import { VscVscode } from "react-icons/vsc";
import { TbBrandCSharp } from "react-icons/tb";
import { ArubaMark, WhatsUpGoldMark, MimosaMark } from "./components/BrandMarks.jsx";

// 1. Lenguajes de Programación
export const languages = [
  {
    node: <SiJavascript color="#F7DF1E" className="cursor-target" />,
    title: "JavaScript (ES6+)",
  },
  {
    node: <FaPython color="#3776AB" className="cursor-target" />,
    title: "Python",
  },
  { node: <FaJava color="#007396" className="cursor-target" />, title: "Java" },
  {
    node: <TbBrandCSharp color="#239120" className="cursor-target" />,
    title: "C#",
  },
  { node: <SiDart color="#0175C2" className="cursor-target" />, title: "Dart" },
  { node: <SiPhp color="#777BB4" className="cursor-target" />, title: "PHP" },
  {
    node: <SiMicropython color="#FFC935" className="cursor-target" />,
    title: "MicroPython",
  },
];

// 2. Frameworks Frontend
export const frameworksFrontend = [
  {
    node: <FaReact color="#61DAFB" className="cursor-target" />,
    title: "React",
  },
  {
    node: <SiFlutter color="#02569B" className="cursor-target" />,
    title: "Flutter",
  },
  {
    node: <SiTailwindcss color="#06B6D4" className="cursor-target" />,
    title: "Tailwind CSS",
  },
  {
    node: <SiBootstrap color="#7952B3" className="cursor-target" />,
    title: "Bootstrap",
  },
];

// 3. Frameworks Backend
export const frameworksBackend = [
  {
    node: <FaNodeJs color="#339933" className="cursor-target" />,
    title: "Node.js",
    href: "https://nodejs.org/",
  },
  {
    node: <SiDjango color="#092E20" className="cursor-target" />,
    title: "Django",
    href: "https://www.djangoproject.com/",
  },
];

// 4. Bases de Datos
export const databases = [
  {
    node: <SiPostgresql color="#336791" className="cursor-target" />,
    title: "PostgreSQL",
  },
  {
    node: <SiMysql color="#4479A1" className="cursor-target" />,
    title: "MySQL",
  },
  {
    node: <FaDatabase color="#CC2927" className="cursor-target" />,
    title: "SQL Server",
  },
  {
    node: <SiSqlite color="#003B57" className="cursor-target" />,
    title: "SQLite",
  },
];

// 5. Sistemas Operativos
export const operatingSystems = [
  {
    node: <FaLinux color="#F0CC2BFF" className="cursor-target" />,
    title: "Linux",
  },
  {
    node: <SiArchlinux color="#1793D1" className="cursor-target" />,
    title: "Arch Linux",
  },
  {
    node: <SiKalilinux color="#557C94" className="cursor-target" />,
    title: "Kali Linux",
  },
  {
    node: <FaUbuntu color="#E95420" className="cursor-target" />,
    title: "Ubuntu",
  },
  {
    node: <SiDebian color="#A81D33" className="cursor-target" />,
    title: "Debian",
  },
  {
    node: <SiFedora color="#51A2DA" className="cursor-target" />,
    title: "Fedora",
  },
  {
    node: <FaWindows color="#0078D6" className="cursor-target" />,
    title: "Windows 10/11",
  },
];

// Monochrome tint shared by every networking icon so the marquee stays
// in a single tonal family.
const NET = "#b9b9b5";

// 6b. Redes y monitoreo
// Aruba, WhatsUp Gold y Mimosa no existen en react-icons/simple-icons: se
// usan marcas tipográficas propias (BrandMarks.jsx) en el mismo estilo.
export const networking = [
  { node: <SiMikrotik color={NET} className="cursor-target" />, title: "MikroTik" },
  { node: <ArubaMark className="cursor-target" />, title: "Aruba Networks" },
  { node: <SiTplink color={NET} className="cursor-target" />, title: "TP-Link" },
  { node: <SiUbiquiti color={NET} className="cursor-target" />, title: "Ubiquiti" },
  { node: <MimosaMark className="cursor-target" />, title: "Mimosa Networks" },
  { node: <WhatsUpGoldMark className="cursor-target" />, title: "WhatsUp Gold" },
  { node: <SiCisco color={NET} className="cursor-target" />, title: "Cisco" },
  { node: <SiFortinet color={NET} className="cursor-target" />, title: "Fortinet" },
];

// 6. Software y Herramientas Adicionales
export const otherSoftware = [
  {
    node: <DiVisualstudio color="#5C2D91" className="cursor-target" />,
    title: "Visual Studio Community 2026",
  },
  {
    node: <VscVscode color="#007ACC" className="cursor-target" />,
    title: "Visual Studio Code",
  },
  {
    node: <FaHtml5 color="#E34F26" className="cursor-target" />,
    title: "HTML5",
  },
  { node: <FaCss3 color="#1572B6" className="cursor-target" />, title: "CSS3" },
  {
    node: <SiAndroidstudio color="#3DDC84" className="cursor-target" />,
    title: "Android Studio",
  },
  {
    node: <SiUnity color="#FFFFFF" className="cursor-target" />,
    title: "Unity",
  },
  {
    node: <SiBlender color="#F5792A" className="cursor-target" />,
    title: "Blender",
  },
  {
    node: <SiCisco color="#1BA0D7" className="cursor-target" />,
    title: "Cisco Packet Tracer",
  },
  {
    node: <FaGitAlt color="#F05032" className="cursor-target" />,
    title: "Git",
  },
];
