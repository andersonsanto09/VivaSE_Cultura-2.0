import type { Activity, FestivalDay } from '../domain/catalog';

// Source: user-supplied FASC 2026 Programação Completa v4, visually checked by page.
// A session groups films that share one time slot; no individual film duration is invented.
type Row = [time: string, title: string, endTime?: string, details?: string];
const group = (placeId: string, day: FestivalDay, page: number, rows: Row[]): Activity[] => rows.map(([time, title, endTime, details], i) => ({ id: `${placeId}-${day}-${i}`, placeId, day, page, time, title, endTime, details }));
const music = [
  ...group('joao', '20', 2, [['18:30', 'ORSSE convida Maestro Ubiratan — Concerto Consciência Negra'], ['19:30', 'Solenidade de Abertura'], ['21:00', 'The Baggios'], ['23:00', 'BK’'], ['01:00', 'O Kannalha']]),
  ...group('frei', '20', 2, [['18:00', 'Thais Nogueira'], ['20:00', 'Melly'], ['22:00', 'Ebony'], ['00:00', 'Jardim dos Leões'], ['02:00', 'DJ Dandara']]),
  ...group('joao', '21', 10, [['19:00', 'Morgana'], ['21:00', 'Simone'], ['23:00', 'Sergival'], ['01:00', 'Gloria Groove']]),
  ...group('frei', '21', 10, [['18:00', 'Maíra Carvalho'], ['20:00', 'Juliana Linhares'], ['22:00', 'Black Pantera'], ['00:00', 'Mestre Madruguinha'], ['02:00', 'DJ Vinicius Big John']]),
  ...group('joao', '22', 18, [['18:00', 'Péricles'], ['20:00', 'Duda Beat'], ['22:00', 'Ponto de Equilíbrio']]),
  ...group('frei', '22', 18, [['17:00', 'Mali'], ['19:00', 'Letrux'], ['21:00', 'Amar e Mudar as Coisas: Belchior 80', undefined, 'Com Taciana Barros, Karina Buhr e Silvero Pereira.'], ['23:00', 'DJ DuSergipe']]),
  ...group('bica', '20', 3, [['11:00', 'Desejo de Sambar'], ['13:00', 'Roberta Preta'], ['15:00', 'João Falcão']]),
  ...group('bica', '21', 11, [['11:00', 'Trakinagem'], ['13:00', 'Leoh'], ['15:00', 'Kary Martins']]),
  ...group('bica', '22', 19, [['11:00', 'Samba Deles'], ['13:00', 'Mayra Felix'], ['15:00', 'Batukkada']]),
  ...group('capuchinhos', '20', 3, [['16:00', 'Mestre Saci e Grupo Saci Quilombola'], ['18:00', 'Congadar (MG)']]),
  ...group('capuchinhos', '21', 11, [['15:50', 'Reação'], ['17:00', 'DuoBAVI (BA)'], ['18:30', 'Sandyalê']]),
  ...group('capuchinhos', '22', 19, [['15:00', 'Banda Terus'], ['16:30', 'Babi Jaques (PE)'], ['18:00', 'Wado (AL)']]),
];
const performance = [
  ...group('mariano', '20', 4, [['15:00', 'De Penedo à Propriá: Celebrando 90 anos de Clemilda', undefined, 'Mamulengo de Cheiroso.'], ['16:30', 'O Aiyê de Oyá: um espetáculo para ver, sentir e entender', undefined, 'Grupo Um Quê de Negritude.'], ['18:00', 'E vocês, quem são?', undefined, 'Samuel de Assis.']]),
  ...group('mariano', '21', 12, [['15:00', 'Amor de Rua', undefined, 'Coletivo Boca 07.'], ['16:30', 'Brefaias', undefined, 'Curso de Teatro da UFS.'], ['18:00', 'Teatro de Sombra Faísca', undefined, 'Cia Dela Só & Pequena Trupe.']]),
  ...group('mariano', '22', 20, [['15:00', 'Três palhaças, um picadeiro', undefined, 'Trupe Kadabra.'], ['16:30', 'Três tempos', undefined, 'Cia Nelson Santos.'], ['18:00', 'Cigano: a dança dos caminhos', undefined, 'Espaço Formas.']]),
  ...group('cortejo', '20', 3, [['15:00', 'Banda CAPS'], ['15:30', 'Milone & Cia'], ['16:00', 'Maria Tambô'], ['16:30', 'Descidão dos Quilombolas']]),
  ...group('cortejo', '21', 11, [['15:00', 'Chegança da AMI'], ['15:30', 'Bloco Afro Neopolitano'], ['16:00', 'Caceteiras de Mestre Rindú']]),
  ...group('cortejo', '22', 19, [['15:00', 'Leões do Frevo'], ['15:30', 'Adupé Bloco Afro do Quilombo Maloca'], ['16:00', 'Guerreiros da Vitória Mocidade']]),
  ...group('cortejo-fixo', '20', 3, [['15:00', 'Espaço Arte e Luta Capoeira'], ['15:30', 'Associação Desportiva A Hora É Essa']]),
  ...group('cortejo-fixo', '21', 11, [['15:00', 'Capoeira Angola'], ['15:30', 'Abadá Capoeira']]),
  ...group('cortejo-fixo', '22', 19, [['15:30', 'Samba de Coco da Ilha Grande']]),
];
const literature = [
  ...group('literatura', '20', 4, [['15:00', 'Literatura negra: escrever para existir e resistir', undefined, 'Com Jeferson Tenório; mediação de Ana Marcia Barbosa.'], ['17:00', 'Mulheres negras escrevendo o futuro', undefined, 'Com Bárbara Carine (Intelectual Diferentona); mediação de Carol Trindade.']]),
  ...group('literatura', '21', 12, [['13:00', 'O Nordeste como potência criativa', undefined, 'Com Octávio Santiago; mediação de Andrey César.'], ['15:00', 'Ancestralidade, memória e território', undefined, 'Com Itamar Vieira Jr; mediação de Daynara Cortês.'], ['17:00', 'A arte da palavras', undefined, 'Título conforme v4. Com Aline Bei e Blenda Santos; mediação de Jaime Neto.']]),
  ...group('literatura', '22', 20, [['13:00', 'Literatura como ferramenta de transformação', undefined, 'Com Mariana Salomão Carrara; mediação de Euller Lopes.'], ['15:00', 'Economia criativa e empreendedorismo cultural', undefined, 'Com Bianca Araujo; mediação de Grazzy Coutinho.'], ['17:00', 'Da oralidade ao digital', undefined, 'Com Eduardo Teles; mediação de Clara Louise.']]),
];
const cinema = [
  ...group('cinema', '20', 5, [['14:00', 'Sessão Sergipe I', '15:00', 'Beira-Mar (Lucy Andrade); Zé de Paizinho (Yérsia Assis e Geilson Gomes); Aracaju: a construção de uma capital (Anne Samara).'], ['15:00', 'Bate-papo com realizadoras da Sessão Sergipe I', '16:00'], ['16:00', 'Sessão Sergipe II', '17:00', 'A minha saudade num retrato eu guardei (Mony Mendonça e Julie Santos); Amora (Bárbara Brandão e Rafael Amorim); Fim de verão de Júlia (Douglas Oliveira).'], ['17:00', 'Bate-papo com realizadoras da Sessão Sergipe II', '18:00']]),
  ...group('cinema', '21', 13, [['13:00', 'Sessão Mundo', '14:00', 'Migrâncias (Maicyra Leão e Fellipe Paixão); Traga novidade (Irion Martins); Diniz Galvão (Vitória Galvão); Cantos da metamorfose ou aquela vez em que eu encarnei como boto (Ainá Xisto).'], ['14:00', 'Bate-papo com realizadoras da Sessão Mundo', '15:00'], ['15:00', 'Sessão Sergipe III', '16:00', 'Ton Toy: um mestre dos sons de Sergipe (Bluesvi Santos); Mestrinhos (Lwidge de Oliveira); Seu mestre mandou (Gessica Lima e Mirelle Alessandra).'], ['16:00', 'Bate-papo com realizadoras da Sessão Sergipe III', '17:00'], ['17:00', 'Longa-metragem convidado: Mambembe', '18:30', 'Direção de Fábio Meira.'], ['18:30', 'Bate-papo com o diretor Fábio Meira', '19:30', 'Mediação de Diogo Velasco.']]),
  ...group('cinema', '22', 21, [['13:00', 'Anna Mariani — Anotações Fotográficas', '14:30', 'Direção de Alberto Renault.'], ['14:30', 'Bate-papo com Ana Débora Santana', '15:30', 'Mediação de Luana Campos.'], ['15:30', 'Sessão Sergipe IV', '16:30', 'Cabaça (Brenda Monteiro e Ana Marinho); Ponto de partida (Carol Barros); Niara (Luana Campos e Lwidge Oliveira).'], ['16:30', 'Bate-papo com realizadoras da Sessão Sergipe IV', '17:30']]),
];
const museum = [
  ...group('historico', '20', 7, [['09:00', 'Oficina: Cardume Adinkra, gravura com materiais alternativos e lambe-lambe', '12:00', 'Com Marjorie Severo, Fernando Marinho e Gladston Barroso.'], ['13:30', 'Mostra de fotografia de estudantes', '14:30', 'Casa dos Estudantes — UNE.'], ['14:00', 'Minicurso: Lendo imagens, a obra de Horácio Hora', '16:00', 'Com André Luís Santos Farias. Monitor: Davi Azrael Santos Santana.'], ['14:30', 'Oficina de Ballroom', '15:30', 'Casa dos Estudantes — UNE.'], ['15:00', 'Abertura da exposição “Formas Disformes”', '16:00', 'Artista A. Gandhi. Coletivo Araúna.'], ['15:30', 'Expressões culturais afro-brasileiras', '17:00', 'Dossiê de registro, editais culturais e história oral para comunidades quilombolas e ribeirinhas. Casa dos Estudantes — UNE.'], ['16:00', 'Abertura da exposição “Composições insubmissas”', '17:00', 'Coletivo Composições Críticas. Monitoras: Flávia Peixoto e Gabriela Mendonça.']]),
  ...group('historico', '21', 15, [['09:00', 'Oficina: Gravura com carimbos Adinkras', '12:00', 'Com Micaell Almeida e Lucas Gabriel Silva. Monitor: Davi Azrael Santos Santana.'], ['13:00', 'Minha escola é meu circus: escola é lugar de cultura!', '15:00', 'Debate entre estudantes secundaristas. Casa dos Estudantes — UNE.'], ['14:00', 'Oficina de Xilogravura', '16:00', 'Casa dos Estudantes — UNE.'], ['14:00', 'Oficina: Introdução ao desenho de retrato', '17:00', 'Com Wendell Campos. Monitoras: Giovana Teixeira e Éricka Beatriz Carvajal.'], ['15:00', 'Mídia e política: ascensão de candidatos nas redes sociais', '17:00', 'Roda de conversa sobre como personalidades políticas usam as redes sociais. Casa dos Estudantes — UNE.']]),
  ...group('historico', '22', 23, [['09:00', 'Oficina: Introdução à pintura a óleo', '12:00', 'Com Flávia Peixoto e Gabriela Mendonça. Monitoras: Giovana Teixeira e Éricka Beatriz Carvajal.'], ['13:00', 'Oficina de estandarte', '14:30', 'Como fazer estandartes diversos e personalizados. Casa dos Estudantes — UNE.'], ['14:00', 'Oficina: Mixed media', '17:00', 'Com Giovana Teixeira e Éricka Beatriz Carvajal. Monitoras: Flávia Peixoto e Gabriela Mendonça.'], ['14:30', 'Oficina de pintura em cerâmica', '16:30', 'Com Wendell Campos. Monitoras: Giovana Teixeira e Éricka Beatriz Carvajal.'], ['16:50', 'Apresentação de dança: encerramento da Casa dos Estudantes', undefined, 'Casa dos Estudantes — UNE.']]),
  ...group('cuidado', '20', 7, [['13:00', 'Espaço de Cuidado e Partilha com PICS', '14:00', 'PICS como tecnologias leves de saúde e emancipação. Facilitadores: cuidadores do Movimento Popular de Saúde (MOPS/SE).'], ['14:00', 'Roda de Terapia Comunitária Integrativa', '15:00', 'Facilitadoras: TEAR.']]),
  ...group('cuidado', '21', 15, [['13:00', 'Encontro Estadual de Educadores e Educadoras Populares em Saúde', '15:00', 'Tecendo redes, saberes e lutas no chão dos territórios. Facilitadores: Rosiane Dantas, Daniella Pereira, Adriana Lohanna, Larissa Leite e Ana Mascarenhas.'], ['13:00', 'Controle social e participação popular: caminhos e vozes rumo à 18ª CNS', '15:00', 'Facilitadores: Daniella Pereira, Gilvania Souza, Rosiane Dantas e Ana Mascarenhas. Os dois encontros constam simultaneamente na v4.']]),
  ...group('cuidado', '22', 23, [['11:00', 'Partilha com PICS: Auriculoterapia, Reiki e Massoterapia', '15:00']]),
];
const galleryArtists = 'Aline Viana; Sara Cardoso; Juciele Silva; Gabriela Bandeira; Sabrina Silva; Bruxxa; Laize Rosendo; Natali Brasil; Daniele Almeida; Nivaldo Oliveira; Luan Dias; Fabiano Lino; Alex Frelser; Gabriel Moura; Dom Pepe; Millena Moreira; Gladston Barroso; Emma Oliveira.';
const recurring: Activity[] = (['20','21','22'] as FestivalDay[]).flatMap((day,i) => [
  ...group('culturas', day, 6+i*8, [['10:00', 'Exposição “A cultura de Sergipe em fios”', '17:00', 'De Cissa Pina.']]),
  ...group('camara', day, 6+i*8, [['11:00', 'Lojinha FASC', '19:00'], ['13:00', 'Arena Inovação — Fasc Inovação', '19:00']]),
  ...group('sacra', day, 6+i*8, [['10:00', 'Exposição “Nanquim”', '17:00', 'De Fábio Sampaio e Jorge Luiz Barros.'], ...(day !== '20' ? [['10:00','Exposição “Nossa Senhora Divina Pastora”','17:00','De Mestre Passos.'] satisfies Row] : []), ...(day !== '22' ? [['15:00',day === '20' ? 'Abertura oficial — exposição “Nanquim”' : 'Abertura oficial — exposição “Nossa Senhora Divina Pastora”'] satisfies Row] : [])]),
  ...group('sustentavel', day, 6+i*8, [['14:00', 'FASC Sustentável', day === '22' ? '17:00' : '19:00']]),
  ...group('reurb', day, 6+i*8, [['11:00', 'Casa Co.Lab de Juventude', '18:00', 'Flash tattoo, trancista, moda afro e acessórios e barbearia.']]),
  ...group('tsuru', day, 6+i*8, [['10:00', 'Programação Casa Tsuru', '02:00', 'Exposições, gastronomia, feira criativa, oficinas, rodas de conversa e shows musicais. A v4 apresenta esta janela geral, sem horários individuais.']]),
  ...group('feira', day, 6+i*8, [['15:00', 'Feira São Criativos', '21:00']]),
  ...group('vesta', day, 8+i*8, [['10:00', 'Exposição coletiva — Escola e Galeria de Artes Vesta Viana', '18:00', galleryArtists]]),
  ...(day !== '20' ? group('brincar', day, 6+i*8, [['14:00', 'FASC Brincar na Rua', '17:00', 'Jogos populares e esportes comunitários.']]) : []),
]);
export const activities: Activity[] = [...music,...performance,...literature,...cinema,...museum,...recurring];
