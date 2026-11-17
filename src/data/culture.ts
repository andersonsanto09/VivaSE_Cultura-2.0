export type {CulturalSource} from './cultural-sources';
import type {CulturalSource} from './cultural-sources';
export interface CulturalStop {placeId:string;description:string;source:CulturalSource}
export interface CulturalRoute {id:string;title:string;subtitle:string;tone:string;stops:CulturalStop[]}
export type {HistoricalMilestone} from '../domain/history';
export {culturalSources} from './cultural-sources.ts';
import {culturalSources} from './cultural-sources.ts';

export const culturalRoutes:CulturalRoute[]=[
  {id:'patrimonio',title:'Entre praças e memórias',subtitle:'Uma leitura do patrimônio e da cultura popular em torno da Praça São Francisco.',tone:'culture',stops:[
    {placeId:'joao',description:'Comece pela Praça São Francisco: o conjunto foi inscrito na Lista do Patrimônio Mundial em 2010. O palco é uma estrutura temporária do festival.',source:culturalSources.unesco},
    {placeId:'historico',description:'Conheça o museu dedicado à memória histórica de Sergipe, instalado na Praça São Francisco.',source:culturalSources.historico},
    {placeId:'sacra',description:'Observe a relação entre arte, religiosidade e preservação no acervo do Museu de Arte Sacra.',source:culturalSources.sacra},
    {placeId:'culturas',description:'Encerre no espaço de memória dos folguedos e dos mestres da cultura popular da cidade.',source:culturalSources.culturas},
  ]},
  {id:'artes',title:'Arte por outros caminhos',subtitle:'Da galeria à palavra, uma seleção editorial de espaços para explorar durante o FASC.',tone:'stage',stops:[
    {placeId:'vesta',description:'Comece pela Escola e Galeria de Artes Vesta Viana, um dos equipamentos culturais da cidade.',source:culturalSources.vesta},
    {placeId:'literatura',description:'Siga para o Salão de Literatura Manoel Ferreira. Escolha uma atividade na programação do dia antes de sair.',source:culturalSources.programa},
    {placeId:'cinema',description:'Continue no Cine Trianon e consulte as sessões e conversas anunciadas para o dia selecionado.',source:culturalSources.programa},
  ]},
  {id:'musica',title:'De palco em palco',subtitle:'Três espaços musicais do Centro Histórico. Monte seu passeio a partir dos horários anunciados.',tone:'music',stops:[
    {placeId:'joao',description:'Comece pelo Palco João Bebe Água, na Praça São Francisco, conferindo a agenda do dia.',source:culturalSources.programa},
    {placeId:'frei',description:'Conheça o Palco Frei Santa Cecília, na Praça do Carmo. A ordem sugerida não significa que os shows sejam consecutivos.',source:culturalSources.programa},
    {placeId:'capuchinhos',description:'Explore o Palco Capuchinhos — BNB Cultural, na Praça da Bandeira, conforme a programação.',source:culturalSources.programa},
  ]},
];

export {historicalMilestones} from './history.ts';

export const publishedMemories=[
  {id:'maria-rafaela',author:'Maria Rafaela Ferreira',year:2025,placeId:'joao',quote:'A noite de hoje foi perfeita',context:'Trecho de depoimento à Prefeitura sobre a primeira noite do FASC 2025.',source:culturalSources.relatos},
  {id:'charles',author:'Charles Belchior',year:2025,placeId:'joao',quote:'Eu sempre gosto do Fasc, acho um festival muito legal!',context:'Trecho de depoimento de visitante de Aracaju, publicado na cobertura do FASC 2025.',source:culturalSources.relatos},
];
export const exampleMemory={author:'Visitante de exemplo',year:2026,placeId:'culturas',text:'Entre uma apresentação e outra, descobri histórias que ainda não conhecia sobre a cidade. Quero voltar com mais tempo.'};
