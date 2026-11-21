// Festa de Nosso Senhor dos Passos — content of the experience module.
// Every statement comes from the sources listed with it. Dates, times and routes
// of future editions are NOT stated: the schedule stays empty until an official
// publication exists. Descriptions of 2025 are labelled as such.
import { locations } from '../../data/locations.ts';
import { images } from '../../platform/content/images.ts';
import type { ImageRef } from '../../platform/content/images.ts';
import { sources } from '../../platform/content/sources.ts';
import type { Source } from '../../platform/content/sources.ts';

export const passosSections = [
  { id: 'inicio', label: 'Início' },
  { id: 'historia', label: 'História' },
  { id: 'tradicoes', label: 'Tradições' },
  { id: 'galeria', label: 'Galeria' },
  { id: 'lugares', label: 'Lugares' },
  { id: 'programacao', label: 'Programação' },
] as const;
export type PassosSection = typeof passosSections[number]['id'];
export const isPassosSection = (value: string): value is PassosSection => passosSections.some(section => section.id === value);

export const passosIntro = {
  title: 'Senhor dos Passos',
  kicker: 'Romaria · São Cristóvão',
  standfirst: 'Fé, penitência e encontro nas ruas do Centro Histórico.',
  summary: 'A Romaria de Senhor dos Passos é uma das celebrações religiosas mais tradicionais de São Cristóvão. Segundo a Prefeitura, é realizada no segundo fim de semana da Quaresma, como tempo de penitência e preparação para a Páscoa.',
  sources: [sources.passosEncontro2025, sources.passosProgramacao2025],
};

export const passosFacts: { label: string; value: string; source: Source }[] = [
  { label: 'Quando', value: 'Segundo fim de semana da Quaresma', source: sources.passosEncontro2025 },
  { label: 'Encontro', value: 'Praça São Francisco', source: sources.passosEncontro2025 },
  { label: 'Patrimônio', value: 'Imaterial de Sergipe desde 2015', source: sources.passosProgramacao2025 },
];

export const passosHistory = {
  paragraphs: [
    'De acordo com a Prefeitura de São Cristóvão, a tradição tem raízes no século XVII e foi trazida à cidade pelos frades carmelitas.',
    'Em 2015, a Procissão de Passos foi declarada Patrimônio Cultural de Natureza Imaterial de Sergipe.',
    'A edição de 2025 foi organizada pela Arquidiocese de Aracaju e, segundo a Prefeitura, reuniu cerca de 70 mil devotos no último dia da romaria.',
  ],
  pending: 'Uma linha do tempo com documentos, imagens de arquivo e depoimentos está em pesquisa. Ela será publicada quando houver fontes verificáveis para cada marco.',
  sources: [sources.passosProgramacao2025, sources.passosEncontro2025],
};

export interface PassosTradition { id: string; moment: string; title: string; description: string; source: Source }
export const passosTraditions: PassosTradition[] = [
  { id: 'trasladacao', moment: 'Primeira noite', title: 'Trasladação da imagem', description: 'Na programação de 2025, a romaria começou com a trasladação noturna da imagem de Senhor dos Passos até o Santuário Nossa Senhora da Vitória, a Igreja Matriz.', source: sources.passosProgramacao2025 },
  { id: 'penitencia', moment: 'Sábado', title: 'Procissão de penitência', description: 'Na procissão de penitência de 2025, os fiéis seguiram a imagem de Senhor dos Passos segurando velas.', source: sources.passosProgramacao2025 },
  { id: 'encontro', moment: 'Domingo', title: 'Procissão do Encontro', description: 'A imagem de Nossa Senhora das Dores parte da Igreja Nossa Senhora do Carmo e a de Senhor dos Passos sai da Igreja Matriz. As duas se encontram na Praça São Francisco.', source: sources.passosEncontro2025 },
  { id: 'veronica', moment: 'Depois do Encontro', title: 'Sermão e cântico da Verônica', description: 'Após o encontro das imagens, a programação de 2025 previa o sermão do encontro e o cântico da Verônica.', source: sources.passosProgramacao2025 },
];

export interface PassosPlace { id: string; name: string; role: string; image?: ImageRef; coordinates?: [number, number]; coordinateNote: string; sources: Source[] }
export const passosPlaces: PassosPlace[] = [
  { id: 'carmo', name: 'Igreja Nossa Senhora do Carmo', role: 'De onde parte a imagem de Nossa Senhora das Dores na Procissão do Encontro. Fica na Praça do Carmo, também chamada Praça Senhor dos Passos.', coordinates: locations.frei?.coordinates, coordinateNote: 'Referência da Praça do Carmo no OpenStreetMap, não a porta da igreja.', sources: [sources.passosEncontro2025, sources.osmPracaCarmo] },
  { id: 'matriz', name: 'Igreja Matriz · Santuário Nossa Senhora da Vitória', role: 'Destino da trasladação noturna e ponto de saída da imagem de Senhor dos Passos na Procissão do Encontro.', coordinates: locations.mariano?.coordinates, coordinateNote: 'Referência da Praça da Matriz no OpenStreetMap, não a porta da igreja.', sources: [sources.passosProgramacao2025, sources.passosEncontro2025, sources.osmPracaMatriz] },
  { id: 'praca', name: 'Praça São Francisco', role: 'Lugar do Encontro entre as imagens de Senhor dos Passos e de Nossa Senhora das Dores.', image: images.pracaNoturna, coordinates: locations.joao?.coordinates, coordinateNote: 'Referência da Praça São Francisco (UNESCO).', sources: [sources.passosEncontro2025, sources.unesco] },
];

export interface GalleryItem { id: string; label: string; image?: ImageRef; note?: string }
export const passosGallery: GalleryItem[] = [
  { id: 'praca', label: 'Praça São Francisco', image: images.pracaNoturna, note: 'Lugar do Encontro. A fotografia não registra a romaria.' },
  { id: 'encontro', label: 'Procissão do Encontro' },
  { id: 'trasladacao', label: 'Trasladação noturna' },
  { id: 'penitencia', label: 'Procissão de penitência' },
  { id: 'carmo', label: 'Igreja do Carmo' },
  { id: 'matriz', label: 'Igreja Matriz' },
  { id: 'veronica', label: 'Cântico da Verônica' },
];

/** Official schedule of the next romaria. Empty until it is published. */
export const passosSchedule: { edition: string; items: { day: string; time: string; title: string; place: string }[]; source?: Source } | null = null;

const repository = 'https://github.com/bernas0610/VivaSE_Cultura-2.0';
export const passosContributionUrl = `${repository}/issues/new?${new URLSearchParams({ title: 'Senhor dos Passos: fotografia ou fonte', body: 'Imagem, documento ou fonte sobre a Festa de Senhor dos Passos:\n\nAutor ou detentor dos direitos e autorização de uso:\n\nLink público da fonte (se houver):\n\nNão inclua dados pessoais de terceiros.' })}`;
