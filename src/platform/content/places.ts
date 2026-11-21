// Places to discover in São Cristóvão. Coordinates reuse the references already
// surveyed for the FASC map (src/data/locations.ts), so a future city map or
// cultural route can be drawn from this list without new geocoding.
import { locations } from '../../data/locations.ts';
import { images } from './images.ts';
import type { ImageRef } from './images.ts';
import { sources } from './sources.ts';
import type { Source } from './sources.ts';

export type PlaceType = 'Praça' | 'Museu' | 'Igreja' | 'Espaço cultural' | 'Edifício histórico';

export interface CityPlace {
  id: string;
  name: string;
  type: PlaceType;
  area: string;
  summary: string;
  image?: ImageRef;
  coordinates?: [number, number];
  coordinateNote?: string;
  sources: Source[];
  /** Place id in the FASC catalog, used for the "Ver no mapa do FASC" link. */
  fascPlaceId?: string;
}

const at = (id: string) => ({ coordinates: locations[id]?.coordinates, coordinateNote: locations[id]?.coordinateNote });

export const cityPlaces: CityPlace[] = [
  { id: 'praca-sao-francisco', name: 'Praça São Francisco', type: 'Praça', area: 'Centro Histórico', summary: 'Formada entre 1580 e 1640 e inscrita como Patrimônio Mundial em 2010, reúne igrejas, convento, museus e casario.', image: images.pracaNoturna, ...at('joao'), sources: [sources.iphan, sources.unesco], fascPlaceId: 'joao' },
  { id: 'museu-historico', name: 'Museu Histórico de Sergipe', type: 'Museu', area: 'Praça São Francisco', summary: 'Museu dedicado à memória histórica de Sergipe, reinaugurado em agosto de 2025.', image: images.museuHistorico, ...at('historico'), sources: [sources.museuHistorico, sources.museuReinauguracao], fascPlaceId: 'historico' },
  { id: 'arte-sacra', name: 'Museu de Arte Sacra', type: 'Museu', area: 'Conjunto franciscano · Praça São Francisco', summary: 'Acervo que aproxima arte, religiosidade e preservação, no conjunto franciscano da praça.', image: images.arteSacra, ...at('sacra'), sources: [sources.arteSacra], fascPlaceId: 'sacra' },
  { id: 'culturas-populares', name: 'Casa das Culturas Populares', type: 'Espaço cultural', area: 'Praça São Francisco', summary: 'Antiga Casa do Folclore, guarda a memória dos folguedos e dos mestres da cultura popular da cidade.', image: images.culturasPopulares, ...at('culturas'), sources: [sources.culturasPopulares, sources.iphan], fascPlaceId: 'culturas' },
  { id: 'igreja-do-rosario', name: 'Igreja de N. Sra. do Rosário dos Homens Pretos', type: 'Igreja', area: 'Rua do Rosário', summary: 'Igreja do Centro Histórico que recebeu apresentações musicais durante o FASC 2024.', image: images.rosario, ...at('brincar'), sources: [sources.rosario2024] },
  { id: 'casa-de-camara', name: 'Antiga Casa de Câmara e Cadeia', type: 'Edifício histórico', area: 'Praça da Matriz', summary: 'Edifício de dois pavimentos na Praça da Matriz. Em 2026, a Prefeitura anunciou sua restauração.', image: images.camara, ...at('camara'), sources: [sources.camaraRestauro], fascPlaceId: 'camara' },
  { id: 'praca-do-carmo', name: 'Praça do Carmo', type: 'Praça', area: 'Também chamada Praça Senhor dos Passos', summary: 'Diante da Igreja Nossa Senhora do Carmo, de onde parte a imagem de Nossa Senhora das Dores na Procissão do Encontro.', ...at('frei'), sources: [sources.passosEncontro2025, sources.osmPracaCarmo], fascPlaceId: 'frei' },
  { id: 'galeria-vesta-viana', name: 'Escola e Galeria de Artes Vesta Viana', type: 'Espaço cultural', area: 'Praça da Matriz', summary: 'Um dos equipamentos culturais da cidade, com escola e galeria dedicadas às artes.', image: images.vesta, ...at('vesta'), sources: [sources.vesta], fascPlaceId: 'vesta' },
];
