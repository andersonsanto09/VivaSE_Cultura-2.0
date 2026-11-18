import {editorialArtistIds} from '../data/editorial';
import ArtistPortrait from '../components/ArtistPortrait';
import {artistPhotos} from '../data/artist-photos';
import {useEffect,useRef} from 'react';
import {ArrowLeft,ArrowRight,ArrowUpRight,Search} from 'lucide-react';
import {festivalEditions,historicalArtists,historicalPerformances,historicalVenues} from '../data/history';
import {filterHistoricalArtists,historicalMapHref,historyParams,performanceStatus,patchHistoryParams,safeHistoryOrigin} from '../domain/history';
import {categoryTone} from '../components/CategoryChips';
import SelectField from '../components/SelectField';
import HistoricalPerformance from '../components/HistoricalPerformance';
const PAGE_SIZE=12;
export default function HistoricalArtists() {
  const params=historyParams();
  const artistId=params.get('artista') || '';
  const query=params.get('busca') || '';
  const edition=params.get('edicao') || '';
  const category=params.get('categoria') || '';
  const order=params.get('ordem') || 'destaques';
  const origin=safeHistoryOrigin(params.get('origem') || '');
  const ownOrigin=`/artistas?${params}`;
  const artist=historicalArtists.find(a=>a.id===artistId);
  const heading=useRef<HTMLHeadingElement>(null);
  useEffect(()=>{heading.current?.focus({preventScroll:true});},[artistId]);
  const filtered=filterHistoricalArtists(historicalArtists.filter(a=>a.featured),historicalPerformances,festivalEditions,{query,edition,category,order:order==='destaques'?'recentes':order});
  if(order==='destaques'){const selection=editorialArtistIds;filtered.sort((a,b)=>{const rank=(id:string)=>{const i=selection.indexOf(id);return i<0?selection.length:i;};return rank(a.id)-rank(b.id);});}
  const pageCount=Math.max(1,Math.ceil(filtered.length/PAGE_SIZE));
  const page=Math.max(1,Math.min(pageCount,Math.floor(Number(params.get('pagina')) || 1)));
  function filter(values:Record<string,string>){patchHistoryParams({...values,pagina:'',artista:''},true);}
  if(artist) {
    const records=historicalPerformances.filter(p=>p.artistId===artist.id).sort((a,b)=>(Number(a.editionId)||9999)-(Number(b.editionId)||9999));
    return <section className="historical-artist-detail" aria-labelledby="artist-detail-title"><a className="history-origin" href={origin?`#${origin}`:`#/artistas?${new URLSearchParams([...params].filter(([key])=>key!=='artista' && key!=='origem'))}`}><ArrowLeft size={17} aria-hidden="true"/>Voltar à exploração</a>
      <div className={`artist-poster tone-${categoryTone(artist.category)} ${artistPhotos[artist.id]?"has-portrait":""}`}>{artistPhotos[artist.id] && <ArtistPortrait id={artist.id} name={artist.name}/>}<div className="artist-poster-copy"><span className="eyebrow">{artist.category} · acervo VivaSE</span><h2 ref={heading} tabIndex={-1} id="artist-detail-title">{artist.name}</h2><p>{artist.context}</p><span>{records.length} {records.length===1?'participação cadastrada':'participações cadastradas'}</span></div></div>
      <p className="archive-reading-note">“Documentada” indica cobertura ou relato retrospectivo. “Anunciada” registra a divulgação consultada e não comprova a realização.</p><ol className="artist-chronology">{records.map(p=><li key={p.id}><div className="artist-year">{p.editionId || "Sem ano"}</div><HistoricalPerformance performance={p} origin={ownOrigin} showArtist={false}/></li>)}</ol>
    </section>;
  }
  return <section className="historical-artists" aria-label="Acervo de artistas"><div className="archive-intro"><div><p className="eyebrow">Da cena local aos encontros nacionais</p><h2 ref={heading} tabIndex={-1}>Grandes nomes. Encontros inesquecíveis.</h2></div><p>Uma seleção de referências da música, das artes cênicas e da literatura, incluindo a cena sergipana. Abra um nome e percorra sua história no FASC.</p></div>{artistId && <p className="notice" role="status">Artista não encontrado. Explore os registros disponíveis.</p>}
    <div className="archive-filters"><label className="search-box"><Search size={19} aria-hidden="true"/><span className="sr-only">Buscar artista histórico</span><input value={query} onChange={e=>filter({busca:e.target.value})} placeholder="Artista ou grupo"/></label><SelectField label="Edição do acervo" value={edition} onChange={value=>filter({edicao:value})} options={[{value:'',label:'Todas as edições'},...festivalEditions.map(e=>({value:e.id,label:`${e.year}${e.number?` · ${e.number}ª edição`:''}`}))]}/><SelectField label="Categoria cultural" value={category} onChange={value=>filter({categoria:value})} options={[{value:'',label:'Todas as categorias'},...['Música','Artes cênicas','Cultura e formação'].map(value=>({value,label:value}))]}/><SelectField label="Ordenação do acervo" value={order} onChange={value=>filter({ordem:value})} options={[{value:'destaques',label:'Seleção VivaSE'},{value:'recentes',label:'Mais recentes'},{value:'antigas',label:'Mais antigas'},{value:'nome',label:'Nome A–Z'}]}/></div>
    <div className="archive-results"><p role="status">{filtered.length} {filtered.length===1?'artista encontrado':'artistas encontrados'} · página {page} de {pageCount}</p><button className="small-action" onClick={()=>filter({busca:'',edicao:'',categoria:'',ordem:''})}>Limpar filtros</button></div><p className="archive-reading-note">Fontes confirmam recortes, não uma lista completa de quem participou do FASC. Datas indicam o dia de programação quando a fonte não informa o início civil do show.</p>
    {filtered.length?<div className="historical-artist-grid">{filtered.slice((page-1)*PAGE_SIZE,page*PAGE_SIZE).map(a=>{
      const records=historicalPerformances.filter(p=>p.artistId===a.id && (!edition || p.editionId===edition));
      const years=[...new Set(records.map(p=>p.editionId))].sort();
      const located=records.find(p=>historicalVenues.find(v=>v.id===p.venueId)?.coordinates);
      const venue=historicalVenues.find(v=>v.id===located?.venueId);
      const hasPerformed=records.some(p=>p.status==='performed');
      return <article key={a.id} className={`historical-artist-card tone-${categoryTone(a.category)}`}><ArtistPortrait id={a.id} name={a.name}/><div className="artist-card-type"><span>{a.category}</span><span>{years.filter(Boolean).join(' · ') || 'Sem edição identificada'}</span></div><h3><a href={`#/artistas?${new URLSearchParams({...Object.fromEntries(params),artista:a.id,origem:ownOrigin})}`}>{a.name}</a></h3><span className={`evidence-label ${hasPerformed?'performed':'announced'}`}>{hasPerformed?'Participação documentada':performanceStatus(records[0].status)}</span><p>{a.context}</p><p className="artist-card-place">{venue?.name || 'Palco não confirmado nos registros selecionados'}</p><div className="artist-card-actions"><a href={`#/artistas?${new URLSearchParams({...Object.fromEntries(params),artista:a.id,origem:ownOrigin})}`}>Consultar registros <ArrowUpRight size={16} aria-hidden="true"/></a>{located && venue && <a href={historicalMapHref(located.editionId,venue.id,ownOrigin)}>Ver edição no mapa <ArrowUpRight size={16} aria-hidden="true"/></a>}</div></article>;
    })}</div>:<div className="historical-empty"><h3>Nenhum registro neste recorte.</h3><p>Experimente outro nome, categoria ou edição. A ausência no acervo não significa que o artista nunca participou.</p></div>}
    {pageCount>1 && <nav className="archive-pagination" aria-label="Páginas do acervo"><button className="button" disabled={page===1} onClick={()=>patchHistoryParams({pagina:String(page-1)})}><ArrowLeft size={17} aria-hidden="true"/>Anterior</button><span>{page}/{pageCount}</span><button className="button" disabled={page===pageCount} onClick={()=>patchHistoryParams({pagina:String(page+1)})}>Próxima<ArrowRight size={17} aria-hidden="true"/></button></nav>}
  </section>;
}
