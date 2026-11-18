import {useState} from 'react';
import {ArrowUpRight,Music2} from 'lucide-react';
import {historicalArtists,historicalPerformances,historicalVenues} from '../data/history';
import {artistsAtStage} from '../domain/stage-artists';

export default function StageArtists({placeId}:{placeId:string}){
  const [expanded,setExpanded]=useState(false);
  const entries=artistsAtStage(placeId,historicalArtists,historicalPerformances,historicalVenues);
  const origin=window.location.hash.slice(1);
  return <section className="stage-artists detail-section" aria-labelledby="stage-artists-title">
    <div className="stage-artists-heading"><Music2 size={19} aria-hidden="true"/><span>Memória deste palco</span></div>
    <h3 id="stage-artists-title">Quem já passou por aqui</h3>
    {entries.length?<><p className="stage-artists-intro">Grandes nomes com apresentações documentadas neste espaço. Conheça suas trajetórias no FASC.</p>
      <ul className="stage-artists-list">{(expanded?entries:entries.slice(0,6)).map(({artist,years})=><li key={artist.id}><a href={`#/artistas?${new URLSearchParams({artista:artist.id,origem:origin})}`}><span><strong>{artist.name}</strong><small>{years.join(' · ')}</small></span><ArrowUpRight size={18} aria-hidden="true"/><span className="sr-only">Explorar trajetória</span></a></li>)}</ul>
      {entries.length>6 && <button className="stage-artists-more" aria-expanded={expanded} onClick={()=>setExpanded(value=>!value)}>{expanded?'Mostrar menos':`Ver todos os ${entries.length} nomes`}</button>}
      <p className="stage-artists-note">Seleção do acervo, sem pretensão de listar todas as participações. Nomes e estruturas dos palcos podem mudar entre edições.</p>
    </>:<p className="stage-artists-intro">Ainda não há grandes nomes com apresentação confirmada para este palco no recorte pesquisado. Isso não significa que não tenham passado por aqui.</p>}
    <a className="stage-artists-archive" href="#/artistas">Explorar o acervo de artistas <ArrowUpRight size={16} aria-hidden="true"/></a>
  </section>;
}
