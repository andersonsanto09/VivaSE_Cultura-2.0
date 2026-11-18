import type {ReactNode} from 'react';
import {ArrowUpRight} from 'lucide-react';

export default function HomeFooter({brand}:{brand:ReactNode}){
  return <footer className="home-footer" aria-label="Rodapé do VivaSE">
    <div className="footer-motif" aria-hidden="true"><span/><span/><span/><span/><span/><span/><span/></div>
    <div className="footer-invitation"><h2>A cidade é o festival.<br/><span>O próximo encontro é seu.</span></h2><a className="footer-map-action" href="#/mapa?dia=20">Explorar o mapa <ArrowUpRight size={22} aria-hidden="true"/></a></div>
    <div className="footer-main"><div className="footer-about">{brand}<p>Um guia para encontrar seu palco,<br/>descobrir a cidade e guardar memórias.</p></div>
      <nav className="footer-navigation" aria-label="Explorar o VivaSE"><h3>Continue explorando</h3><div>{[{label:'Mapa',href:'#/mapa?dia=20'},{label:'Programação',href:'#/programacao?dia=20'},{label:'Memórias',href:'#/memorias?dia=20'},{label:'Artistas',href:'#/artistas'}].map(link=><a key={link.label} href={link.href}>{link.label}<ArrowUpRight size={14} aria-hidden="true"/></a>)}</div></nav>
      <div className="footer-city"><span className="eyebrow">Feito para viver a cidade</span><p>São Cristóvão<span>Sergipe · Brasil</span></p><span className="footer-city-star ribbon-star" aria-hidden="true"/></div>
    </div>
    <div className="footer-bottom"><p>VivaSE Cultura · 2026<span>Projeto independente sobre o FASC.</span></p><a href="#/sobre">Fontes, créditos e sobre o projeto <ArrowUpRight size={15} aria-hidden="true"/></a></div>
  </footer>;
}
