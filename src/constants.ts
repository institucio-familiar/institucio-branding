export const HELP_EMAIL = 'info@institucio-branding.com'

export const ASI_NOS_VEMOS_SECTIONS = {
  ASI_NOS_VEMOS: {
    id: 'asi-nos-vemos',
    key: 'asiNosVemos',
    title: 'Así nos vemos'
  },
  COLOR: { id: 'color', key: 'color', title: 'Color' },
  TIPOGRAFIA: { id: 'tipografia', key: 'tipografia', title: 'Tipografía' },
  SISTEMA_GRAFICO: {
    id: 'sistema-grafico',
    key: 'sistemaGrafico',
    title: 'Sistema gráfico'
  },
  LAYOUT: { id: 'layout', key: 'layout', title: 'Layout' },
  ILUSTRACION: { id: 'ilustracion', key: 'ilustracion', title: 'Ilustración' },
  ICONOGRAFIA: { id: 'iconografia', key: 'iconografia', title: 'Iconografía' },
  FOTOGRAFIA: { id: 'fotografia', key: 'fotografia', title: 'Fotografía' },
  MOTION: { id: 'motion', key: 'motion', title: 'Motion' }
} as const satisfies Record<string, { id: string; key: string; title: string }>
