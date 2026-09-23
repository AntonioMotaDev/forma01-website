export type ServiceId = "estrategia" | "desarrollo" | "sistemas";

export type Service = {
  id: ServiceId;
  index: string;
  name: string;
  summary: string;
  description: string;
  useCases: string[];
};

export const SERVICES: Service[] = [
  {
    id: "estrategia",
    index: "01",
    name: "Estrategia",
    summary: "Claridad antes de construir.",
    description:
      "Te ayudamos a definir qué necesita tu proyecto, en qué orden y con qué presupuesto. Aterrizamos ideas en un plan concreto para que cada peso invertido tenga un propósito.",
    useCases: [
      "Diagnóstico de tu presencia digital actual",
      "Planeación de un sitio, app o sistema antes de cotizar desarrollo",
      "Arquitectura de contenido y mensajes clave de tu marca",
      "Priorización de funcionalidades para lanzar rápido",
    ],
  },
  {
    id: "desarrollo",
    index: "02",
    name: "Desarrollo",
    summary: "Sitios y aplicaciones que funcionan.",
    description:
      "Diseñamos y construimos sitios web y aplicaciones rápidas, fáciles de usar y fáciles de mantener. Código limpio, entregado a tu nombre y listo para crecer.",
    useCases: [
      "Sitios web corporativos y landing pages",
      "Tiendas en línea y catálogos",
      "Aplicaciones web a la medida",
      "Rediseño y migración de sitios existentes",
    ],
  },
  {
    id: "sistemas",
    index: "03",
    name: "Sistemas",
    summary: "Menos trabajo manual, más control.",
    description:
      "Convertimos procesos que hoy viven en hojas de cálculo, papel o WhatsApp en herramientas digitales. Paneles, automatizaciones e integraciones que te ahorran horas cada semana.",
    useCases: [
      "Inventarios, cotizadores y control de pedidos",
      "Paneles administrativos y reportes automáticos",
      "Integraciones entre herramientas (pagos, correo, CRM)",
      "Automatización de tareas repetitivas",
    ],
  },
];

export function getService(id: ServiceId) {
  return SERVICES.find((service) => service.id === id)!;
}
