import {ArrowUpRight} from 'lucide-react';
import PlacePhoto from '../components/PlacePhoto';
import ArtistPortrait from '../components/ArtistPortrait';
import {publishedMemories} from '../data/culture';

export default function HomeCulture(){
  const memory=publishedMemories[0];
  return <section className="home-editorial" aria-labelledby="home-culture-title">
    <header className="editorial-heading"><div><p className="eyebrow">O encontro continua</p><h2 id="home-culture-title">Para além<br/>do palco.</h2></div><p>Uma cidade para descobrir.<br/>Histórias para levar com você.</p></header>
    <div className="editorial-grid">
      <article className="city-story"><PlacePhoto placeId="camara"/><div className="editorial-copy"><p className="eyebrow">01 · A cidade também conta histórias</p><h3>Entre praças<br/>e memórias.</h3><p>Um roteiro pelo patrimônio e pela cultura popular de São Cristóvão.</p><a className="editorial-action" href="#/roteiros?dia=20&roteiro=patrimonio">Conhecer o roteiro <ArrowUpRight size={22} aria-hidden="true"/></a></div></article>
      <article className="memory-story"><span className="memory-quote-mark" aria-hidden="true">“</span><p className="eyebrow">02 · Uma lembrança de quem viveu</p><blockquote>“{memory.quote}.”</blockquote><p className="memory-byline">{memory.author}<span>Depoimento publicado · FASC {memory.year}</span></p><a className="memory-source" href={memory.source.url} target="_blank" rel="noreferrer">Fonte do depoimento ↗</a><a className="editorial-action" href="#/memorias?dia=20">Ler e guardar memórias <ArrowUpRight size={22} aria-hidden="true"/></a></article>
      <article className="archive-story"><ArtistPortrait id="baggios" name="The Baggios"/><div className="editorial-copy"><p className="eyebrow">03 · O FASC através do tempo</p><h3>Os palcos mudam.<br/>As histórias ficam.</h3><p>The Baggios e os encontros que atravessam as edições do festival.</p><a className="editorial-action" href="#/artistas?artista=baggios">Percorrer essa trajetória <ArrowUpRight size={22} aria-hidden="true"/></a><a className="editorial-secondary" href="#/historia?dia=20">Explorar a linha do tempo ↗</a></div></article>
    </div>
  </section>;
}
