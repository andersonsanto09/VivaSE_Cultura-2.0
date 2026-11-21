// Editorial publications of the platform. Content is data, not markup, so it can
// later be served by a CMS or an API with the same shape (see docs/36).
// Published posts only state facts present in their sources. Topics still
// without verifiable sources are listed as "em curadoria" and have no body.
import { images } from './images.ts';
import type { ImageRef } from './images.ts';
import { sources } from './sources.ts';
import type { Source } from './sources.ts';

export type PostBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'figure'; image: ImageRef }
  | { type: 'note'; text: string }
  | { type: 'links'; items: { label: string; href: string }[] };

export type PostCover = { kind: 'image'; image: ImageRef } | { kind: 'art'; motif: 'passos' | 'cidade' };

interface PostBase { slug: string; category: string; title: string; excerpt: string }
export interface PublishedPost extends PostBase {
  status: 'publicado';
  cover: PostCover;
  publishedAt: string;
  blocks: PostBlock[];
  sources: Source[];
}
export interface PlannedPost extends PostBase { status: 'em-curadoria' }
export type Post = PublishedPost | PlannedPost;

export const posts: Post[] = [
  {
    status: 'publicado',
    slug: 'praca-sao-francisco',
    category: 'Patrimônio',
    title: 'Praça São Francisco: quatro séculos ao redor de uma praça',
    excerpt: 'Formada quando as coroas de Portugal e Espanha estavam unidas, a praça é Patrimônio Mundial desde 2010.',
    cover: { kind: 'image', image: images.pracaNoturna },
    publishedAt: '2026-11-20',
    blocks: [
      { type: 'paragraph', text: 'No Centro Histórico de São Cristóvão, a Praça São Francisco reúne em um mesmo espaço igrejas, edifícios públicos e casario que acompanham a história da cidade.' },
      { type: 'heading', text: 'Uma praça de outro tempo' },
      { type: 'paragraph', text: 'Segundo o IPHAN, a praça foi formada entre 1580 e 1640, período em que as coroas de Portugal e da Espanha estiveram unidas — a chamada União Ibérica.' },
      { type: 'paragraph', text: 'Em 2010, a Praça São Francisco foi inscrita na Lista do Patrimônio Mundial da UNESCO. O reconhecimento se refere à praça e ao conjunto ao seu redor, não a toda a cidade.' },
      { type: 'figure', image: images.pracaNoturna },
      { type: 'heading', text: 'Quem está ao redor' },
      { type: 'paragraph', text: 'De acordo com o IPHAN, o entorno da praça abriga a Igreja e o Convento de São Francisco, a Igreja da Misericórdia e a Santa Casa, o Palácio Provincial e um casario antigo. Ali também estão espaços dedicados à memória, como o Museu Histórico de Sergipe e a antiga Casa do Folclore, hoje Casa das Culturas Populares.' },
      { type: 'heading', text: 'Uma praça viva' },
      { type: 'paragraph', text: 'A praça continua sendo lugar de encontro. Durante o FASC, recebe o Palco João Bebe Água. Na Romaria de Senhor dos Passos, é ali que se encontram as imagens de Senhor dos Passos e de Nossa Senhora das Dores.' },
      { type: 'links', items: [{ label: 'Explorar o FASC', href: '#/fasc' }, { label: 'Conhecer a Romaria de Senhor dos Passos', href: '#/senhor-dos-passos' }] },
    ],
    sources: [sources.iphan, sources.unesco, sources.pracaQuinzeAnos, sources.passosEncontro2025, sources.fascProgramacao2026],
  },
  {
    status: 'publicado',
    slug: 'romaria-senhor-dos-passos',
    category: 'Fé e tradição',
    title: 'Senhor dos Passos: a romaria que atravessa o Centro Histórico',
    excerpt: 'No segundo fim de semana da Quaresma, procissões e devotos ocupam as ruas, igrejas e praças de São Cristóvão.',
    cover: { kind: 'art', motif: 'passos' },
    publishedAt: '2026-11-20',
    blocks: [
      { type: 'paragraph', text: 'A Romaria de Senhor dos Passos é uma das celebrações religiosas mais tradicionais de São Cristóvão. Segundo a Prefeitura, ela é realizada no segundo fim de semana da Quaresma, em um tempo de penitência e preparação para a Páscoa.' },
      { type: 'heading', text: 'Raízes e reconhecimento' },
      { type: 'paragraph', text: 'De acordo com a Prefeitura de São Cristóvão, a tradição tem raízes no século XVII e foi trazida pelos frades carmelitas. Em 2015, a Procissão de Passos foi declarada Patrimônio Cultural de Natureza Imaterial de Sergipe.' },
      { type: 'heading', text: 'Os momentos da romaria' },
      { type: 'paragraph', text: 'Na programação divulgada para 2025, a romaria teve uma trasladação noturna da imagem de Senhor dos Passos até o Santuário Nossa Senhora da Vitória, a Igreja Matriz, e uma procissão de penitência em que os fiéis seguiram a imagem segurando velas.' },
      { type: 'paragraph', text: 'No domingo, a Procissão do Encontro reúne duas imagens: a de Nossa Senhora das Dores, que parte da Igreja Nossa Senhora do Carmo, e a de Senhor dos Passos, que sai da Igreja Matriz. O encontro acontece na Praça São Francisco e é seguido pelo sermão do encontro e pelo cântico da Verônica.' },
      { type: 'paragraph', text: 'Segundo a Prefeitura, cerca de 70 mil devotos participaram do último dia da romaria em 2025, organizada pela Arquidiocese de Aracaju.' },
      { type: 'note', text: 'As datas mudam a cada ano porque acompanham o calendário da Quaresma. Confirme a programação nos canais oficiais antes de planejar sua visita.' },
      { type: 'links', items: [{ label: 'Conhecer a experiência Senhor dos Passos', href: '#/senhor-dos-passos' }] },
    ],
    sources: [sources.passosProgramacao2025, sources.passosEncontro2025],
  },
  {
    status: 'publicado',
    slug: 'trajetoria-do-fasc',
    category: 'Festival',
    title: 'FASC: uma trajetória de mais de cinco décadas',
    excerpt: 'Criado pela UFS em 1972, o Festival de Artes de São Cristóvão atravessou pausas e retomadas até a 41ª edição.',
    cover: { kind: 'image', image: images.fascPalco },
    publishedAt: '2026-11-20',
    blocks: [
      { type: 'paragraph', text: 'O Festival de Artes de São Cristóvão começou em setembro de 1972, por iniciativa da Universidade Federal de Sergipe, ligado à difusão cultural regional.' },
      { type: 'paragraph', text: 'Ao longo do tempo, o festival passou por interrupções. A edição de dezembro de 2005 antecedeu uma pausa. A retomada veio em 2017, com a 34ª edição, que reuniu Prefeitura e UFS e teve abertura anunciada na Praça São Francisco.' },
      { type: 'heading', text: 'Cinquenta anos e um novo reconhecimento' },
      { type: 'paragraph', text: 'Depois da pausa da pandemia, a edição de 2022 marcou o retorno presencial e os 50 anos do festival, com destaque para artistas locais e para a memória do FASC. Em agosto de 2023, a Prefeitura noticiou que o festival se tornou bem de interesse cultural.' },
      { type: 'figure', image: images.fascPalco },
      { type: 'paragraph', text: 'Em 2025, a primeira noite da 40ª edição destacou artistas negros nos palcos das praças São Francisco e do Carmo. Em 2026, o 41º FASC acontece de 20 a 22 de novembro, com programação espalhada por praças, museus, escolas e ruas do Centro Histórico.' },
      { type: 'paragraph', text: 'No VivaSE, a experiência do FASC reúne mapa, programação, roteiros culturais, linha do tempo das edições e acervo de artistas.' },
      { type: 'links', items: [{ label: 'Explorar o FASC', href: '#/fasc' }, { label: 'Percorrer a linha do tempo', href: '#/historia?dia=20' }] },
    ],
    sources: [sources.fascOrigem, sources.fascRetomada, sources.fascCinquenta, sources.fascReconhecimento, sources.fasc2025, sources.fascProgramacao2026],
  },
  {
    status: 'publicado',
    slug: 'museus-e-casas-de-memoria',
    category: 'Memória',
    title: 'Museus e casas de memória no Centro Histórico',
    excerpt: 'Do Museu Histórico de Sergipe à Casa das Culturas Populares, espaços que guardam a memória da cidade e do estado.',
    cover: { kind: 'image', image: images.museuHistorico },
    publishedAt: '2026-11-20',
    blocks: [
      { type: 'paragraph', text: 'Ao redor da Praça São Francisco, edifícios históricos abrigam acervos que ajudam a conhecer a história de Sergipe e a cultura popular de São Cristóvão.' },
      { type: 'heading', text: 'Museu Histórico de Sergipe' },
      { type: 'paragraph', text: 'Instalado na Praça São Francisco, o museu é dedicado à memória histórica de Sergipe. Em agosto de 2025, foi reinaugurado em uma solenidade ligada às comemorações da chancela da praça como Patrimônio Mundial.' },
      { type: 'figure', image: images.museuHistorico },
      { type: 'heading', text: 'Museu de Arte Sacra' },
      { type: 'paragraph', text: 'No conjunto franciscano da praça, o Museu de Arte Sacra reúne peças que revelam a relação entre arte, religiosidade e preservação.' },
      { type: 'figure', image: images.arteSacra },
      { type: 'heading', text: 'Casa das Culturas Populares' },
      { type: 'paragraph', text: 'Antes conhecida como Casa do Folclore, a Casa das Culturas Populares é um espaço de memória dos folguedos e dos mestres da cultura popular da cidade.' },
      { type: 'figure', image: images.culturasPopulares },
      { type: 'note', text: 'Horários de visitação podem mudar. Confirme o funcionamento nos canais oficiais de cada espaço antes da visita.' },
    ],
    sources: [sources.museuHistorico, sources.museuReinauguracao, sources.arteSacra, sources.culturasPopulares, sources.iphan],
  },
  { status: 'em-curadoria', slug: 'sao-cristovao-e-sergipe', category: 'História', title: 'São Cristóvão e sua importância para Sergipe', excerpt: 'A formação da cidade e seu papel na história do estado.' },
  { status: 'em-curadoria', slug: 'artistas-e-personalidades', category: 'Pessoas', title: 'Artistas e personalidades locais', excerpt: 'Mestres, artistas e pessoas que fazem a cultura da cidade.' },
  { status: 'em-curadoria', slug: 'gastronomia-e-tradicoes', category: 'Sabores', title: 'Gastronomia e tradições populares', excerpt: 'Receitas, doces e saberes que passam de geração em geração.' },
  { status: 'em-curadoria', slug: 'curiosidades-do-centro-historico', category: 'Curiosidades', title: 'Curiosidades sobre o Centro Histórico', excerpt: 'Detalhes de ruas, fachadas e costumes que passam despercebidos.' },
];

export const publishedPosts = posts.filter((post): post is PublishedPost => post.status === 'publicado');
export const plannedPosts = posts.filter((post): post is PlannedPost => post.status === 'em-curadoria');
export const findPost = (slug: string) => publishedPosts.find(post => post.slug === slug);

/** Reading time at ~200 words per minute, never below one minute. */
export function readingMinutes(post: PublishedPost): number {
  const words = post.blocks.reduce((total, block) => {
    if (block.type === 'paragraph' || block.type === 'heading' || block.type === 'note') return total + block.text.split(/\s+/).filter(Boolean).length;
    return total;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

export function formatDate(isoDate: string): string {
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
}
