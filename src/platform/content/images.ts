// Photographs already curated, credited and stored in public/images.
// The FASC entries are reused as they are; captions are rewritten only when the
// original caption describes a FASC context that does not apply here.
import { placePhotos } from '../../data/place-photos.ts';
import type { PlacePhotoData } from '../../data/place-photos.ts';

export interface ImageRef extends PlacePhotoData {
  /** CSS object-position used when the image is cropped. */
  position?: string;
}

export const images = {
  pracaNoturna: {
    file: 'about/praca-sao-francisco-noturna-heitor-xavier.jpg',
    alt: 'Vista aérea noturna da Praça São Francisco, com igrejas iluminadas e o casario de São Cristóvão.',
    caption: 'Praça São Francisco à noite · imagem de arquivo publicada em agosto de 2025.',
    credit: 'Heitor Xavier / Prefeitura de São Cristóvão',
    source: 'https://www.saocristovao.se.gov.br/noticia/praca-sao-francisco-completa-15-anos-como-patrimonio-da-humanidade',
    position: '50% 55%',
  },
  fascPalco: { ...placePhotos.joao, position: '60% 40%' },
  museuHistorico: placePhotos.historico,
  arteSacra: placePhotos.sacra,
  culturasPopulares: placePhotos.culturas,
  camara: placePhotos.camara,
  vesta: placePhotos.vesta,
  rosario: {
    ...placePhotos.brincar,
    alt: 'Fachada da Igreja de Nossa Senhora do Rosário dos Homens Pretos, no Centro Histórico de São Cristóvão.',
    caption: 'Igreja de Nossa Senhora do Rosário dos Homens Pretos · foto de arquivo publicada em 2024.',
  },
} satisfies Record<string, ImageRef>;

export const imageUrl = (image: Pick<ImageRef, 'file'>) => `${import.meta.env?.BASE_URL ?? '/'}images/${image.file}`;
