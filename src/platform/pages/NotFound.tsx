import { ArrowUpRight } from 'lucide-react';
import { PortalFooter, PortalHeader } from '../components/PortalLayout';
import { activeExperiences } from '../content/experiences';
import { platformHref } from '../routes';

export default function NotFound({ message = 'O endereço não corresponde a nenhuma página do VivaSE.' }: { message?: string }) {
  return <>
    <PortalHeader />
    <main id="conteudo" className="vs-page vs-not-found">
      <header className="vs-page-heading">
        <p className="eyebrow">Página não encontrada</p>
        <h1 tabIndex={-1}>Esse caminho não leva a lugar nenhum.</h1>
        <p>{message} Escolha um dos caminhos abaixo.</p>
      </header>
      <ul className="vs-not-found-links">
        <li><a href={platformHref.inicio()}>Página inicial do VivaSE<ArrowUpRight size={18} aria-hidden="true" /></a></li>
        {activeExperiences.map(experience => <li key={experience.id}><a href={experience.href}>{experience.shortName}<ArrowUpRight size={18} aria-hidden="true" /></a></li>)}
        <li><a href={platformHref.publicacoes()}>Publicações<ArrowUpRight size={18} aria-hidden="true" /></a></li>
      </ul>
    </main>
    <PortalFooter />
  </>;
}
