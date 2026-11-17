import type {Artist,FestivalEdition,HistoricalPerformance,HistoricalSource,HistoricalVenue} from './history.ts';
import {normalize} from './catalog.ts';
import {locations} from '../data/locations.ts';

type Base={historicalSources:HistoricalSource[];festivalEditions:FestivalEdition[];historicalVenues:HistoricalVenue[];historicalArtists:Artist[];historicalPerformances:HistoricalPerformance[]};
type Research={edicoes:{ano:number;edicao:number;espacos:{name:string;category:string;location_text:string|null;source_urls:string[];validation?:{locationLocatedNearName:string[]}}[]}[];participacoes:{id:string;artista:string;ano:number|null;linguagem:string;espaco:string|null;situacao:string;evidencia_resumo:string;observacoes:string;fonte_urls:string[];validation?:{nameLocated:boolean}}[]};
const norm=(s:string)=>normalize(s).replace(/[^a-z0-9]+/g,' ').trim();
const slug=(s:string)=>norm(s).replaceAll(' ','-');
const union=(a:string[],b:string[])=>[...new Set([...a,...b])];
const category=(s:string):Artist['category']=>/cortejo|folclore.*rua/.test(norm(s))?'Cortejos':/feira|gastronom|sustent|saude|tecnolog/.test(norm(s))?'Feiras e experiências':/teatro|danca|cenic|bale|cinema|audiovisual/.test(norm(s))?'Artes cênicas':/liter|visual|form|museu|cultura|expos|oficin|palestr|debate|jornal|semin|roteiro|ciencia/.test(norm(s))?'Cultura e formação':'Música';
const aliases:Record<string,string>={'liniker e os caramelows':'liniker','orquestra sinfonica':'orquestra sinfonica de sergipe','chico queiroga e antonio rogerio':'chiko queiroga e antonio rogerio','samba de nuaa':'samba nuaa'};
const identity=(s:string)=>aliases[norm(s)] || norm(s);
// Editorial selection: national/international reference names, established theatre
// and literature, and landmark Sergipe acts. It does not delete the full archive.
const featured=new Set(('Gilberto Gil|Alceu Valença|The Baggios|BaianaSystem|Liniker|Marina Lima|Zeca Baleiro|Groundation|Olodum|Gaby Amarantos|Karol Conká|Filipe Catto|Grupo Imbuaça|Orquestra Sinfônica de Sergipe|Chiko Queiroga e Antônio Rogério|Sivuca|Dominguinhos|Paulinho da Viola|Pepeu Gomes|Geraldo Azevedo|Jards Macalé|Zezé Motta|Wagner Tiso|Nando Cordel|Lenine|Nação Zumbi|Moraes Moreira|Chico César|Carlinhos Brown|Daniela Mercury|Margareth Menezes|Emicida|Diogo Nogueira|Nando Reis|Seu Jorge|Pabllo Vittar|Marcelo D2|João Gomes|Lia de Itamaracá|Arnaldo Antunes|Otto|Mestrinho|Cordel do Fogo Encantado|Dezarie|Ilê Aiyê|Timbalada|Naurêa|Cidade Dormitório|Patrícia Polayne|Luedji Luna|Mariene de Castro|Céu|Djonga|Don L|BK’|Dead Fish|Mundo Livre S/A|Pato Fu|Mart’nália|Clinton Fearon|Bando Teatro Olodum|Grupo Galpão|Balé Stagium|Ariano Suassuna|Jorge Amado|Waly Salomão|Dona Ivone Lara|Nelson Cavaquinho|Carlos Lyra|Arrigo Barnabé|Itamar Vieira Junior|Xico Sá|Sérgio Vaz|Cristiane Sobral|Cármen Lúcia|Raphael Montes|Luiza Romão|Amara Moira|Jackson da Silva Lima|Beatriz Góis Dantas').split('|').map(identity));

// These are geographic references, never reconstructed stage positions. Only
// locations explicitly associated with an edition may use them. No artist name
// or similarity of venue names alone generates a coordinate.
function reference(name:string,address:string){
  const a=norm(address),n=norm(name);
  if(/igreja do rosario/.test(a) && !/pardos/.test(a))return 'rosario';
  if(/bica dos pintos/.test(a))return 'bica';
  if(/praca da bandeira/.test(a))return 'capuchinhos';
  if(/praca da biblia/.test(a))return undefined;
  if(/gina franco/.test(a))return 'literatura';
  if(/colegio elic|teatro elic/.test(a))return 'cinema';
  if(/erundino prado/.test(a))return 'feira';
  if(/praca do carmo/.test(a))return 'frei';
  if(/praca.*matriz|largo da matriz/.test(a))return 'mariano';
  if(/praca sao francisco/.test(a))return 'joao';
  if(/casa do folclore/.test(n) && /casa do folclore/.test(a))return 'culturas';
  if(/museu de arte sacra/.test(n) && /museu de arte sacra/.test(a))return 'sacra';
  return undefined;
}

export function mergeHistory(base:Base,research:Research){
  const historicalSources=base.historicalSources.map(x=>({...x}));
  const festivalEditions=base.festivalEditions.map(x=>({...x,sourceIds:[...x.sourceIds]}));
  const historicalVenues=base.historicalVenues.map(x=>({...x,sourceIds:[...x.sourceIds]}));
  const historicalArtists=base.historicalArtists.map(x=>({...x,featured:featured.has(identity(x.name))}));
  const historicalPerformances=base.historicalPerformances.map(x=>({...x,timeKind:(x.status==='announced'?'announced':'reported') as 'announced'|'reported',category:historicalArtists.find(a=>a.id===x.artistId)!.category,provenanceIds:[] as string[],sourceIds:[...x.sourceIds]}));
  const canonical=(u:string)=>u.replace('/index.php/','/').replace('http://','https://').replace(/\/$/,'');
  function sources(urls:string[]){return urls.map(url=>{let source=historicalSources.find(s=>canonical(s.url)===canonical(url));if(!source){source={id:`research-source-${historicalSources.length+1}`,title:`${/saocristovao.se.gov.br/.test(url)?'Prefeitura':/ufs.br/.test(url)?'UFS':new URL(url).hostname} · ${decodeURIComponent(new URL(url).pathname.split('/').pop() || 'Referência histórica').replaceAll('-',' ').replaceAll('_',' ').replace(/\.pdf$/i,'')}`,url,type:'institutional',note:'Fonte da pesquisa recebida. O status e os limites de cada afirmação estão no registro; uma programação não comprova sua execução.'};historicalSources.push(source);}return source.id;});}
  let merged=0;
  for(const e of research.edicoes){
    let edition=festivalEditions.find(x=>x.year===e.ano);
    const sourceIds=sources(e.espacos.flatMap(v=>v.source_urls));
    const pSources=sources(research.participacoes.filter(p=>p.ano===e.ano).flatMap(p=>p.fonte_urls));
    if(!edition){edition={id:String(e.ano),year:e.ano,number:e.edicao,title:`Memórias da ${e.edicao}ª edição`,context:'Recorte histórico com fontes de naturezas diferentes. Consulte a evidência de cada participação.',coverage:'Inventário parcial; ausência de um local ou artista não implica ausência no festival.',sourceIds:union(sourceIds,pSources)};festivalEditions.push(edition);}
    if(e.ano===2005)edition.context='A 33ª edição, em dezembro de 2005, antecedeu a interrupção mencionada na retomada de 2017. O número aparece na memória do evento, cruzada com a programação publicada naquele ano.';
    edition.number=e.edicao;edition.sourceIds=union(edition.sourceIds,union(sourceIds,pSources));
    if(!edition.sourceIds.length)edition.sourceIds=sources(['https://ri.ufs.br/bitstream/riufs/5649/1/MISLENE_VIEIRA_SANTOS.pdf']);
    if(e.espacos.length)edition.coverage='Inventário ampliado pela pesquisa recebida. Referências geográficas conferidas aparecem no mapa; endereços ainda não confirmados permanecem somente na lista.';
    for(const v of e.espacos){
      // Literature and theatre exchanged names/locations: match identity, not
      // a shared plaza. Never merge 2018 Antônio Mariano into its literature hall.
      const same=historicalVenues.find(x=>x.editionId===edition!.id && (norm(x.name)===norm(v.name) || (norm(x.name).startsWith(norm(v.name)) && norm(v.name).includes('museu de sergipe')) || (/joao bebe/.test(norm(x.name)) && /joao bebe/.test(norm(v.name))) || (/capuchinhos/.test(norm(x.name)) && /capuchinhos/.test(norm(v.name))) || (/vesta/.test(norm(x.name)) && /vesta/.test(norm(v.name))) || (/samba na bica/.test(norm(x.name)) && /samba na bica/.test(norm(v.name)))));
      if(same){same.sourceIds=union(same.sourceIds,sources(v.source_urls));continue;}
      const physicalId=reference(v.name,v.location_text || '');
      // Direct checks: modern municipal programs, 2017 A8/UFS, 2018 UFS,
      // 2019 published complete program. 1972 remains unmapped pending archive.
      const checked=(e.ano===2005 && /palco sao francisco|palco alternativo|teatro de rua|largo da matriz/.test(norm(v.name))) || e.ano>=2017 && (Boolean(v.validation?.locationLocatedNearName.length) || [2019].includes(e.ano) || (e.ano===2023 && /palco|bica/i.test(v.name)) || (e.ano>=2024 && /bica|cine trianon|vesta/i.test(v.name)));
      const ref=checked && physicalId?(locations[physicalId] || (physicalId==='rosario'?{coordinates:[-11.0140241,-37.203787] as [number,number],locationSources:['https://maps.app.goo.gl/q4gk4G3nXWJzgo8k7','https://www.openstreetmap.org/way/381588815']}:undefined)):undefined;
      historicalVenues.push({id:`${edition.id}-${slug(v.name)}`,editionId:edition.id,name:v.name,address:v.location_text || 'Endereço não identificado na pesquisa',category:category(v.category),context:'Espaço registrado na pesquisa desta edição; consulte as fontes para o contexto da programação.',precision:ref?.coordinates?'approximate':'unavailable',coordinates:ref?.coordinates,physicalId:ref?physicalId:undefined,photoPlaceId:ref?(/museu de arte sacra/.test(norm(v.name))?'sacra':/museu historico/.test(norm(v.name))?'historico':/casa das culturas/.test(norm(v.name))?'culturas':physicalId):undefined,locationNote:ref?'Referência atual da praça, rua ou equipamento explicitamente associado a esta edição. Não representa a posição histórica da estrutura ou uma entrada.':'Endereço histórico ainda sem confirmação geográfica suficiente. Mantido no acervo sem criar um pin por suposição.',sourceIds:sources(v.source_urls),coordinateSourceIds:ref?.locationSources || []});
    }
  }
  for(const p of research.participacoes){
    let artist=historicalArtists.find(a=>identity(a.name)===identity(p.artista));
    if(!artist){artist={id:`artist-${slug(p.artista)}`,name:p.artista,category:category(p.linguagem),context:p.artista==='The Baggios'?'Rock sergipano.':'Trajetória no FASC reunida a partir de anúncios, coberturas e referências históricas identificadas.',featured:featured.has(identity(p.artista))};historicalArtists.push(artist);}
    const editionId=p.ano?String(p.ano):'';
    const c=category(p.linguagem),text=norm(p.espaco || '');
    const candidates=historicalVenues.filter(v=>v.editionId===editionId && text && text.includes(norm(v.name)));
    const v=candidates.sort((a,b)=>b.name.length-a.name.length)[0];
    const status:HistoricalPerformance['status']=p.situacao==='participacao_retrospectiva_sem_edicao'?'undated':p.situacao==='convite_confirmado_pelo_organizador'?'invited':p.situacao.startsWith('realizada') || p.situacao==='participacao_documentada'?'performed':'announced';
    const existing=historicalPerformances.find(x=>x.artistId===artist!.id && x.editionId===editionId && x.category===c && (x.venueId && v?x.venueId===v.id:x.venueText && p.espaco?norm(x.venueText)===text:!x.venueText && (!x.provenanceIds.length || !p.espaco)));
    const proof=sources(p.fonte_urls);
    const uncertainty=[p.observacoes,!p.validation?.nameLocated?'Conferência individual desta referência recebida ainda pendente.':''].filter(Boolean).join(' ');
    if(existing){
      existing.sourceIds=union(existing.sourceIds,proof);existing.provenanceIds.push(p.id);existing.venueId ||= v?.id;if(p.artista!==artist.name)existing.billingName ||= p.artista;
      // Stronger coverage can upgrade an announcement, never the reverse.
      if(status==='performed' && existing.status==='announced'){existing.status='performed';existing.context=p.evidencia_resumo;}
      existing.uncertainty=union(existing.uncertainty?[existing.uncertainty]:[],uncertainty?[existing.status==='performed' && !p.validation?.nameLocated?'Uma referência complementar recebida ainda aguarda conferência individual; a cobertura já existente foi preservada.':uncertainty]:[]).join(' ') || undefined;
      merged++;continue;
    }
    historicalPerformances.push({id:`research-${p.id}`,artistId:artist.id,editionId,timeKind:status==='announced'?'announced':'reported',category:c,venueId:v?.id,venueText:p.espaco || undefined,billingName:p.artista,status,context:p.evidencia_resumo,uncertainty:uncertainty || undefined,sourceIds:proof,provenanceIds:[p.id]});
  }
  // Contextual checks made during this integration, beyond automatic name search.
  const baggios2022=historicalPerformances.find(p=>p.id==='2022-baggios')!;
  baggios2022.status='performed';baggios2022.context='A cobertura municipal de 03/12/2022 documenta o show de encerramento da noite no Palco Gal Costa.';
  baggios2022.sourceIds=union(baggios2022.sourceIds,sources(['https://www.saocristovao.se.gov.br/noticia/alceu-valenca-the-baggios-e-coletivo-sergipano-de-mulheres-no-samba-animam-publico-do-palco-gal-costa-no-segundo-dia-do-fasc']));
  baggios2022.uncertainty='Data civil e horário de 01h correspondem à programação anunciada da madrugada. A cobertura confirma o show, mas não seu início efetivo.';
  const baggios2018=historicalPerformances.find(p=>p.artistId==='baggios' && p.editionId==='2018')!;
  baggios2018.sourceIds=union(baggios2018.sourceIds,['2018']);baggios2018.uncertainty='A programação publicada pela UFS confirma o anúncio no João Bebe-Água; não comprova a execução.';
  const baggios2019=historicalPerformances.find(p=>p.artistId==='baggios' && p.editionId==='2019')!;
  baggios2019.sourceIds=union(baggios2019.sourceIds,sources(['https://infonet.com.br/entretenimento-infonet/confira-programacao-completa-do-fasc-2019/']));
  baggios2019.uncertainty='O programa completo publicado identifica o artista no João Bebe-Água. A realização não é comprovada pela agenda.';
  const baggios2023=historicalPerformances.find(p=>p.artistId==='baggios' && p.editionId==='2023')!;
  baggios2023.status='performed';baggios2023.context='A cobertura municipal da primeira noite de 2023 documenta a apresentação no Frei Santa Cecília.';baggios2023.uncertainty=undefined;
  baggios2023.sourceIds=union(baggios2023.sourceIds,sources(['https://www.saocristovao.se.gov.br/noticia/fasc-2023-inicia-com-diversidade-e-grandes-atracoes-nos-palcos-joao-bebe-agua-e-frei-santa-cecilia']));
  // PDF page 13 checked visually: its columns place the band at BNB Cultural,
  // not Frei Santa Cecília. This supplements, rather than rewrites, owner input.
  const bnb=historicalVenues.find(v=>v.editionId==='2025' && v.name==='Palco Banco do Nordeste Cultural')!;
  historicalPerformances.push({id:'review-2025-baggios',artistId:'baggios',editionId:'2025',venueId:bnb.id,category:'Música',date:'2025-11-22',dateKind:'program',time:'18:00',timeKind:'announced',status:'announced',context:'Anúncio na programação oficial de 2025, página 13, conferido visualmente na coluna Banco do Nordeste Cultural.',uncertainty:'O programa confirma o anúncio, não a execução do show.',sourceIds:sources(['https://anexos.saocristovao.se.gov.br/storage/files/62/FASC%202025%20-%20Programa%C3%A7%C3%A3o%20Completa.pdf']),provenanceIds:[]});
  historicalArtists.find(a=>a.id==='baggios')!.context='Rock sergipano. Percorra os registros da banda no festival, com os nomes dos palcos e as evidências de cada edição.';
  festivalEditions.sort((a,b)=>a.year-b.year);
  return {historicalSources,festivalEditions,historicalVenues,historicalArtists,historicalPerformances,historyImportAudit:{input:research.participacoes.length,merged,added:research.participacoes.length-merged,additionalResearched:1,curated:historicalArtists.filter(a=>a.featured).length}};
}
