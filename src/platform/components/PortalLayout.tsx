import { useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import Brand from '../../components/Brand';
import { platformHref } from '../routes';
import type { PortalSection } from '../routes';
import { activeExperiences } from '../content/experiences';

export function SkipLink() {
  return <a href="#conteudo" className="skip-link" onClick={event => { event.preventDefault(); const main = document.getElementById('conteudo'); main?.setAttribute('tabindex', '-1'); main?.focus(); }}>Pular para o conteúdo</a>;
}

const portalNav: { id: PortalSection; label: string; href: string }[] = [
  { id: 'experiencias', label: 'Experiências', href: platformHref.inicio('experiencias') },
  { id: 'publicacoes', label: 'Publicações', href: platformHref.publicacoes() },
  { id: 'descubra', label: 'Descubra', href: platformHref.inicio('descubra') },
];

/** Same header grammar as the FASC (purple bar, brand, short nav); a menu on phones. */
export function PortalHeader({ current }: { current?: PortalSection }) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const button = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); button.current?.focus(); } };
    window.addEventListener('hashchange', close);
    window.addEventListener('keydown', onKey);
    return () => { window.removeEventListener('hashchange', close); window.removeEventListener('keydown', onKey); };
  }, [open]);
  return <header className="site-header vs-portal-header">
    <Brand />
    <nav className="vs-portal-nav" aria-label="Navegação da plataforma">{portalNav.map(item => <a key={item.id} href={item.href} aria-current={current === item.id ? 'page' : undefined}>{item.label}</a>)}</nav>
    <button ref={button} type="button" className="vs-menu-button" aria-expanded={open} aria-controls={menuId} onClick={() => setOpen(value => !value)}>{open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}Menu</button>
    <span className="vs-header-place" aria-hidden="true"><span className="ribbon-star" />São Cristóvão · SE</span>
    <div id={menuId} className="vs-menu-panel" hidden={!open}>
      <nav aria-label="Menu da plataforma">
        {portalNav.map(item => <a key={item.id} href={item.href} aria-current={current === item.id ? 'page' : undefined} onClick={() => setOpen(false)}>{item.label}<ArrowUpRight size={20} aria-hidden="true" /></a>)}
        <p>Experiências</p>
        {activeExperiences.map(experience => <a key={experience.id} className="is-experience" href={experience.href}>{experience.shortName}<ArrowUpRight size={18} aria-hidden="true" /></a>)}
      </nav>
    </div>
  </header>;
}

/**
 * Header of an experience module, with the same anatomy as the FASC header:
 * platform brand on the left, a short inline navigation, the experience emblem
 * on the right (it leads to the experience home, like the FASC logo).
 */
export function ExperienceHeader({ name, emblem, nav, current, homeHref }: { name: string; emblem: ReactNode; nav: readonly { id: string; label: string; href: string }[]; current: string; homeHref: string }) {
  return <header className="site-header vs-experience-header">
    <Brand />
    <nav aria-label={`Navegação de ${name}`}>{nav.map(item => <a key={item.id} href={item.href} aria-current={current === item.id ? 'page' : undefined}>{item.label}</a>)}</nav>
    <a className="edition-label vs-experience-emblem-link" href={homeHref} title={`Início de ${name}`} aria-label={`${name} — início da experiência`}>{emblem}</a>
  </header>;
}

/** Footer built with the FASC footer system (motif, invitation, columns). */
export function PortalFooter({ invitation, action }: { invitation?: ReactNode; action?: { label: string; href: string } }) {
  const cta = action || { label: 'Escolher uma experiência', href: platformHref.inicio('experiencias') };
  return <footer className="home-footer vs-footer" aria-label="Rodapé do VivaSE">
    <div className="footer-motif" aria-hidden="true"><span /><span /><span /><span /><span /><span /><span /></div>
    <div className="footer-invitation">{invitation || <h2>São Cristóvão é feita de encontros.<br /><span>Qual será o seu?</span></h2>}<a className="footer-map-action" href={cta.href}>{cta.label} <ArrowUpRight size={22} aria-hidden="true" /></a></div>
    <div className="footer-main">
      <div className="footer-about"><Brand /><p>Uma plataforma para viver a cultura,<br />a história e as tradições de São Cristóvão.</p></div>
      <nav className="footer-navigation" aria-label="Explorar a plataforma"><h3>Experiências e conteúdos</h3><div>
        {activeExperiences.map(experience => <a key={experience.id} href={experience.href}>{experience.shortName}<ArrowUpRight size={14} aria-hidden="true" /></a>)}
        <a href={platformHref.publicacoes()}>Publicações<ArrowUpRight size={14} aria-hidden="true" /></a>
        <a href={platformHref.inicio('descubra')}>Descubra a cidade<ArrowUpRight size={14} aria-hidden="true" /></a>
      </div></nav>
      <div className="footer-city"><span className="eyebrow">Feito para viver a cidade</span><p>São Cristóvão<span>Sergipe · Brasil</span></p><span className="footer-city-star ribbon-star" aria-hidden="true" /></div>
    </div>
    <div className="footer-bottom"><p>VivaSE Cultura · 2026<span>Projeto independente. Não é um canal oficial.</span></p><a href="#/sobre">Fontes, créditos e sobre o projeto <ArrowUpRight size={15} aria-hidden="true" /></a></div>
  </footer>;
}
