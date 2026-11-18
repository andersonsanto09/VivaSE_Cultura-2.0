export interface ArtistPhoto {file:string;alt:string;caption:string;credit:string;source:string;position?:string}
const news='https://www.saocristovao.se.gov.br/noticia/';
const opening=news+'primeira-noite-de-shows-do-fasc-2025-e-marcada-por-sucesso-de-publico-e-representatividade-negra-nos-palcos';
const second=news+'fasc-2024-diversidade-musical-e-grande-publico-marcam-o-segundo-dia-de-apresentacoes-nos-palcos-joao-bebe-agua-e-frei-santa-cecilia';
const gal=news+'alceu-valenca-the-baggios-e-coletivo-sergipano-de-mulheres-no-samba-animam-publico-do-palco-gal-costa-no-segundo-dia-do-fasc';
// Images identified in the coverage text/captions and checked visually. They
// illustrate the named act in the archive, not an appearance in FASC 2026.
export const artistPhotos:Record<string,ArtistPhoto>={
  alceu:{file:'alceu.jpg',alt:'Alceu Valença de chapéu, cantando no FASC 2022.',caption:'Alceu Valença · FASC 2022',credit:'Fernando Correia e Dani Santos / Prefeitura',source:gal,position:'50% 28%'},
  baggios:{file:'baggios.jpg',alt:'Julico, vocalista e guitarrista de The Baggios, durante show no FASC 2022.',caption:'Julico / The Baggios · FASC 2022',credit:'Fernando Correia e Dani Santos / Prefeitura',source:gal,position:'50% 30%'},
  marina:{file:'marina.jpg',alt:'Marina Lima de camisa vermelha durante apresentação no FASC 2024.',caption:'Marina Lima · FASC 2024',credit:'Heitor Xavier / Prefeitura',source:second,position:'50% 25%'},
  baiana:{file:'baiana.jpg',alt:'Russo Passapusso no show da BaianaSystem no FASC 2024.',caption:'BaianaSystem · FASC 2024',credit:'Heitor Xavier / Prefeitura',source:second,position:'50% 25%'},
  catto:{file:'catto.jpg',alt:'Filipe Catto cantando no FASC 2024.',caption:'Filipe Catto · FASC 2024',credit:'Dani Santos / Prefeitura',source:second,position:'50% 25%'},
  lamparina:{file:'lamparina.jpg',alt:'Integrantes de Lamparina no palco do FASC 2024.',caption:'Lamparina · FASC 2024',credit:'Dani Santos / Prefeitura',source:second},
  gaby:{file:'gaby.jpg',alt:'Gaby Amarantos se apresentando no FASC 2025.',caption:'Gaby Amarantos · FASC 2025',credit:'Julia Rodrigues / Prefeitura',source:opening,position:'50% 25%'},
  karol:{file:'karol.jpg',alt:'Karol Conká com figurino dourado durante apresentação no FASC 2025.',caption:'Karol Conká · FASC 2025',credit:'Markus Mello / Prefeitura',source:opening,position:'50% 30%'},
  olodum:{file:'olodum.jpg',alt:'Percussionista do Olodum erguendo o tambor no FASC 2025.',caption:'Olodum · FASC 2025',credit:'Julia Rodrigues / Prefeitura',source:opening,position:'50% 35%'},
};
