// Registry of the cultural experiences hosted by VivaSE. The portal home lists
// them from here; adding an experience means adding an entry (and, when it has
// its own module, registering the module in routes.ts and Platform.tsx).
// Each experience keeps its own identity: the FASC entry only points to the
// existing application, it does not describe or reduce it.
import { images } from './images.ts';
import type { ImageRef } from './images.ts';

export type ExperienceCover = { kind: 'image'; image: ImageRef } | { kind: 'art'; motif: 'passos' };

export interface Experience {
  id: string;
  name: string;
  shortName: string;
  /** Kind of manifestation, shown as the card label. */
  label: string;
  /** When it happens, as stated by the sources. */
  period: string;
  description: string;
  href: string;
  cta: string;
  tone: 'fasc' | 'passos';
  cover: ExperienceCover;
  emblem?: { file: string; alt: string };
  highlights: string[];
  /** Only "ativa" experiences are listed as available. */
  status: 'ativa' | 'em-preparacao';
}

export const experiences: Experience[] = [
  {
    id: 'fasc',
    name: 'Festival de Artes de São Cristóvão',
    shortName: 'FASC',
    label: 'Festival de artes',
    period: '41ª edição · 20 a 22 de novembro de 2026',
    description: 'Música, teatro e cultura popular em praças, museus e ruas da cidade. Mapa, programação, palcos, artistas e a memória de mais de cinco décadas de festival.',
    href: '#/fasc',
    cta: 'Explorar FASC',
    tone: 'fasc',
    cover: { kind: 'image', image: images.fascPalco },
    emblem: { file: 'fasc-2026-logo.svg', alt: 'FASC 2026' },
    highlights: ['Mapa interativo', 'Programação', 'Linha do tempo', 'Artistas'],
    status: 'ativa',
  },
  {
    id: 'senhor-dos-passos',
    name: 'Festa de Nosso Senhor dos Passos',
    shortName: 'Senhor dos Passos',
    label: 'Tradição religiosa',
    period: 'Segundo fim de semana da Quaresma',
    description: 'Uma das celebrações religiosas mais tradicionais de São Cristóvão: romaria, procissões e o Encontro na Praça São Francisco.',
    href: '#/senhor-dos-passos',
    cta: 'Conhecer a tradição',
    tone: 'passos',
    cover: { kind: 'art', motif: 'passos' },
    highlights: ['História', 'Tradições', 'Lugares', 'Galeria'],
    status: 'ativa',
  },
];

export const activeExperiences = experiences.filter(experience => experience.status === 'ativa');
