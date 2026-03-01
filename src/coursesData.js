// src/coursesData.js

// Primero, importa las imágenes de las insignias
import ccna1 from './assets/badges/ccna-badge.png';
import ccna2 from './assets/badges/ccna-badge2.png';
import python from './assets/badges/python-badge.png';
import fortinet4 from './assets/badges/fortinet-badge4.png';
import fortinet2 from './assets/badges/fortinet-badge2.png';
import fortinet3 from './assets/badges/fortinet-badge3.png';
// Lista de insignias para BounceCards
export const courseBadges = [
  ccna1,
  python,
  fortinet4,
  ccna2,
  fortinet2,
  fortinet3,
];

// Lista detallada de cursos para el texto
export const courseList = [
  {
    name: "CCNA: Introduction to Networks",
    issuer: "Cisco Networking Academy",
    date: "2023",
    url: "certificados/ccna-introduction.pdf"
  },
  {
    name: "CCNA: Enterprise Networking, Security, and Automation",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "certificados/ccna-enterprise.pdf"
  },
  {
    name: "CCNA: Switching, Routing, and Wireless Essentials",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "certificados/ccna-switching.pdf"
  },
  {
    name: "Fortinet Certified Fundamentals in Cybersecurity",
    issuer: "Fortinet",
    date: "Válido hasta 2027",
    url: "certificados/fortinet.pdf"
  },
  {
    name: "Fundamentos de Python 1",
    issuer: "Cisco Networking Academy",
    date: "2024",
    url: "certificados/python.pdf"
  },
  {
    name: "Desarrollador Front-end",
    issuer: "Capacítate para el Empleo",
    date: "2025",
    url: "certificados/frontend.pdf"
  },
];