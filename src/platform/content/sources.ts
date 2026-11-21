// Public references behind every factual statement of the platform content.
// Rule kept from the FASC curation (docs/FONTES-E-CURADORIA.md): no fact
// without a source; content without verifiable data stays "em curadoria".
import { culturalSources } from '../../data/cultural-sources.ts';

export interface Source {
  title: string;
  url?: string;
  publishedAt?: string;
  note?: string;
}

const news = 'https://www.saocristovao.se.gov.br/noticia/';

export const sources = {
  unesco: culturalSources.unesco,
  iphan: { title: 'IPHAN — Patrimônio Mundial em Sergipe', url: 'https://www.gov.br/iphan/pt-br/superintendencias/sergipe/patrimonio-mundial', publishedAt: '2021-09-23' },
  pracaQuinzeAnos: { title: 'Prefeitura — Praça São Francisco completa 15 anos como Patrimônio da Humanidade', url: news + 'praca-sao-francisco-completa-15-anos-como-patrimonio-da-humanidade' },
  museuHistorico: culturalSources.historico,
  museuReinauguracao: { title: 'Prefeitura — reinauguração do Museu Histórico de Sergipe', url: news + 'chancela-da-praca-sao-francisco-reinauguracao-do-museu-historico-de-sergipe-integra-evento-e-reune-autoridades-em-sao-cristovao' },
  arteSacra: culturalSources.sacra,
  culturasPopulares: culturalSources.culturas,
  vesta: culturalSources.vesta,
  camaraRestauro: { title: 'Prefeitura — ordem de serviço para restaurar a antiga Casa de Câmara e Cadeia', url: news + 'prefeito-julio-nascimento-assina-ordem-de-servico-para-restauracao-da-antiga-casa-de-camara-e-cadeia' },
  rosario2024: { title: 'Prefeitura — música na Igreja do Rosário durante o FASC 2024', url: news + 'musica-na-igreja-e-destaque-do-fasc-2024-na-igreja-de-nossa-senhora-do-rosario-dos-homens-pretos' },
  fascOrigem: culturalSources.origem,
  fascRetomada: culturalSources.retomada,
  fascCinquenta: culturalSources.cinquenta,
  fascReconhecimento: { title: 'Prefeitura — FASC se torna bem de interesse cultural', url: news + 'festival-de-artes-de-sao-cristovao-se-torna-bem-de-interesse-cultural', publishedAt: '2023-08-24' },
  fasc2025: culturalSources.relatos,
  fascProgramacao2026: culturalSources.programa,
  passosProgramacao2025: { title: 'Prefeitura — programação da Romaria de Senhor dos Passos 2025', url: news + 'romaria-de-senhor-dos-passos-acontece-na-proxima-semana-em-sao-cristovao-confira-a-programacao', publishedAt: '2025-03-07' },
  passosEncontro2025: { title: 'Prefeitura — último dia da Romaria de Senhor dos Passos 2025', url: news + 'ultimo-dia-da-romaria-de-senhor-dos-passos-reune-milhares-de-fieis-no-centro-historico-de-sao-cristovao', publishedAt: '2025-03-17' },
  osmPracaCarmo: { title: 'OpenStreetMap — Praça do Carmo', url: 'https://www.openstreetmap.org/way/169047606' },
  osmPracaMatriz: { title: 'OpenStreetMap — Praça da Matriz', url: 'https://www.openstreetmap.org/way/96508974' },
} satisfies Record<string, Source>;

/** Date of the last editorial review of the platform content. */
export const contentReviewedAt = '20/11/2026';
