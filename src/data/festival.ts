import type { Place } from '../domain/catalog';
import { locations } from './locations.ts';
export { activities } from './schedule.ts';

export const reviewedAt = '16/11/2026';
export const categories = ['Todos', 'Música', 'Artes cênicas', 'Cultura e formação', 'Feiras e experiências', 'Cortejos'] as const;
const catalog: Place[] = [
  { id: 'joao', name: 'Palco João Bebe Água', address: 'Praça São Francisco', category: 'Música', description: 'Shows na Praça São Francisco, entre as referências culturais do Centro Histórico.', pages: [2, 10, 18], coordinates: [-11.0136556, -37.2053747], coordinateNote: 'Referência geográfica da Praça São Francisco (UNESCO); não é a posição exata da estrutura do palco.', canNavigate: true },
  { id: 'frei', name: 'Palco Frei Santa Cecília', address: 'Praça do Carmo', category: 'Música', description: 'Encontros da música brasileira na Praça do Carmo, também conhecida como Praça Senhor dos Passos.', pages: [2, 10, 18], coordinates: [-11.0157611, -37.2071528], coordinateNote: 'Referência do conjunto do Carmo em pesquisa da UFS; não é a posição exata da estrutura do palco.', canNavigate: true },
  { id: 'bica', name: 'Palco Samba na Bica', address: 'Bica dos Pintos', category: 'Música', description: 'Samba durante o dia, nos três dias de festival.', pages: [3, 11, 19], canNavigate: true },
  { id: 'capuchinhos', name: 'Palco Capuchinhos — BNB Cultural', address: 'Praça da Bandeira', category: 'Música', description: 'Programação musical de artistas de Sergipe e de outros estados.', pages: [3, 11, 19], canNavigate: true },
  { id: 'mariano', name: 'Palco Mariano Antônio', address: 'Largo da Matriz', category: 'Artes cênicas', description: 'Teatro, dança e apresentações para conhecer outras linguagens do festival.', pages: [4, 12, 20], canNavigate: true },
  { id: 'literatura', name: 'Salão de Literatura Manoel Ferreira', address: 'EMEF Gina Franco', category: 'Cultura e formação', description: 'Encontros com autores, conversas e literatura na escola Gina Franco.', pages: [4, 12, 20], canNavigate: true },
  { id: 'cinema', name: 'Cine Trianon', address: 'Endereço do espaço em conferência', category: 'Cultura e formação', description: 'Sessões de cinema e conversas com realizadores. O endereço precisa de confirmação antes de abrir um trajeto.', pages: [5, 13, 21], canNavigate: false },
  { id: 'culturas', name: 'Casa das Culturas Populares', address: 'Praça São Francisco', category: 'Cultura e formação', description: 'Exposição “A cultura de Sergipe em fios”, de Cissa Pina.', pages: [6, 14, 22], canNavigate: true },
  { id: 'camara', name: 'Casa de Câmara e Cadeia', address: 'Praça da Matriz', category: 'Feiras e experiências', description: 'Lojinha FASC e Arena Inovação (Fasc Inovação) dividem o mesmo equipamento.', pages: [6, 14, 22], canNavigate: true },
  { id: 'sacra', name: 'Museu de Arte Sacra', address: 'Praça São Francisco', category: 'Cultura e formação', description: 'Exposições “Nanquim” e “Nossa Senhora Divina Pastora”, conforme a programação de cada dia.', pages: [6, 14, 22], canNavigate: true },
  { id: 'sustentavel', name: 'FASC Sustentável', address: 'Salão Paroquial da Igreja da Matriz', category: 'Feiras e experiências', description: 'Experiências ambientais e sustentabilidade durante o festival.', pages: [6, 14, 22], canNavigate: true },
  { id: 'reurb', name: 'Espaço Reurb — Casa Co.Lab de Juventude', address: 'Localização exata em conferência', category: 'Feiras e experiências', description: 'Flash tattoo, trancista, moda afro, acessórios e barbearia.', pages: [6, 14, 22], canNavigate: false },
  { id: 'tsuru', name: 'Casa Tsuru', address: 'Endereço em conferência', category: 'Feiras e experiências', description: 'Exposições, gastronomia, feira criativa, oficinas, rodas de conversa e shows.', pages: [6, 14, 22], canNavigate: false },
  { id: 'feira', name: 'Feira São Criativos', address: 'Rua Cel. Erundino Prado', category: 'Feiras e experiências', description: 'Feira de produtores criativos na rua do Centro Histórico.', pages: [6, 14, 22], canNavigate: true },
  { id: 'historico', name: 'Museu Histórico de Sergipe', address: 'Praça São Francisco', category: 'Cultura e formação', description: 'Oficinas, exposições e atividades da Casa dos Estudantes — UNE.', pages: [7, 15, 23], canNavigate: true },
  { id: 'cuidado', name: 'Espaço de Cuidado Josefa Rezadeira', address: 'EMEF Gina Franco', category: 'Cultura e formação', description: 'Práticas de cuidado e encontros de saúde. Compartilha o equipamento com o Salão de Literatura.', pages: [7, 15, 23], canNavigate: true },
  { id: 'vesta', name: 'Escola e Galeria de Artes Vesta Viana', address: 'Endereço em conferência', category: 'Cultura e formação', description: 'Exposição coletiva de artistas, das 10h às 18h nos três dias.', pages: [8, 16, 24], canNavigate: false },
  { id: 'brincar', name: 'FASC Brincar na Rua', address: 'Rua do Rosário', category: 'Feiras e experiências', description: 'Jogos populares e esportes comunitários no sábado e no domingo.', pages: [14, 22], canNavigate: true },
  { id: 'cortejo', name: 'Cortejos Mestre Neca — itinerantes', address: 'Saída da Praça da Bandeira', category: 'Cortejos', description: 'Cortejos pelas ruas do Centro Histórico. A saída é uma referência; o percurso ainda não foi georreferenciado.', pages: [3, 11, 19], canNavigate: true, itinerant: true },
  { id: 'cortejo-fixo', name: 'Cortejos Mestre Neca — Praça da Matriz', address: 'Praça da Matriz', category: 'Cortejos', description: 'Apresentações de cultura popular na praça, distintas dos cortejos itinerantes.', pages: [3, 11, 19], canNavigate: true },
];

export const places: Place[] = catalog.map((place,index) => ({...place, number:index+1, ...locations[place.id]}));

export const geoSources = [
  { title: 'Praça São Francisco — coordenadas de referência UNESCO', url: 'https://whc.unesco.org/fr/list/1272/cartes/' },
  { title: 'Conjunto do Carmo — pesquisa UFS, coordenadas do sítio', url: 'https://ri.ufs.br/bitstream/riufs/10394/2/VER%C3%94NICA_MARIA_MENESES_NUNES.pdf' },
];
