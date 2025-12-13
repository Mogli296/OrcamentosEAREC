import { QuoteData } from '../types';

export const mockQuote: QuoteData = {
  id: "EAREC-2024-X92",
  client: {
    name: "Alexandre V.",
    company: "Nebula Motors",
    projectTitle: "Project: NOCTURNE RIDE"
  },
  date: new Date().toISOString(),
  validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  
  // Nova Estrutura de Precificação
  basePrice: 5000, // Taxa de mobilização da equipe
  studioFee: 2500, // Custo extra se for estúdio
  photoUnitPrice: 150, // Preço por foto tratada
  videoUnitPrice: 1200, // Preço por vídeo (1 min)
  
  items: [
    // Itens Inclusos (Marcados visualmente como valor agregado)
    {
      id: "1",
      title: "Direção Criativa & Roteiro",
      description: "Desenvolvimento completo do conceito, storyboard e narrativa visual.",
      price: 0,
      isIncluded: true,
      type: 'fixed'
    },
    {
      id: "2",
      title: "Equipe de Cinema",
      description: "Diretor, DoP e Assistentes dedicados durante a diária.",
      price: 0,
      isIncluded: true,
      type: 'fixed'
    },
    {
      id: "3",
      title: "Color Grading (DaVinci)",
      description: "Tratamento de cor cinematográfico incluso em todos os entregáveis.",
      price: 0,
      isIncluded: true,
      type: 'fixed'
    }
  ],
  moodboardImages: [
    "https://picsum.photos/id/237/600/800",
    "https://picsum.photos/id/10/800/600",
    "https://picsum.photos/id/48/600/900",
    "https://picsum.photos/id/64/800/500",
    "https://picsum.photos/id/91/600/600",
    "https://picsum.photos/id/184/700/500",
  ]
};