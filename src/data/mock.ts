import { QuoteData } from '../types';

/**
 * ARQUIVO DE DADOS (MOCK)
 * -----------------------
 * Aqui você define os valores padrão, preços e itens que aparecem no orçamento.
 * Altere este arquivo para ajustar a precificação do seu negócio.
 */

export const mockQuote: QuoteData = {
  // ID interno do orçamento (pode ser gerado dinamicamente no futuro)
  id: "EAREC-2024-X92",
  
  // Dados padrão do cliente (serão sobrescritos pelo formulário da tela inicial)
  client: {
    name: "Cliente VIP",
    company: "Empresa Parceira",
    projectTitle: "Projeto Audiovisual",
    location: "São Paulo, SP",
    date: new Date().toISOString(),
    contact: "(11) 99999-9999"
  },
  
  // Datas automáticas
  date: new Date().toISOString(),
  validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  
  // ========================================================================
  // 💰 PRECIFICAÇÃO (ALTERE AQUI OS VALORES)
  // ========================================================================
  
  basePrice: 5000,       // Preço Mínimo: Custo base para tirar a equipe de casa (Mobilização)
  studioFee: 2500,       // Taxa de Estúdio: Somada apenas se o cliente escolher "Estúdio"
  photoUnitPrice: 150,   // Valor Unitário: Preço por cada foto selecionada no contador
  videoUnitPrice: 1200,  // Valor Unitário: Preço por cada vídeo (1 min) selecionado
  
  // ========================================================================

  // Lista de itens que compõem o serviço
  items: [
    // ITENS INCLUSOS (CORTESIAS PREMIUM)
    // Deixe price: 0 e isIncluded: true para gerar valor percebido
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

  // Imagens do Moodboard (Galeria de Inspiração)
  // Substitua as URLs por links das suas fotos reais
  moodboardImages: [
    "https://picsum.photos/id/237/600/800",
    "https://picsum.photos/id/10/800/600",
    "https://picsum.photos/id/48/600/900",
    "https://picsum.photos/id/64/800/500",
    "https://picsum.photos/id/91/600/600",
    "https://picsum.photos/id/184/700/500",
  ]
};