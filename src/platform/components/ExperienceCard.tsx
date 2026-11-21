import { useId } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Figure from './Figure';
import PassosArt from './PassosArt';
import type { Experience } from '../content/experiences';

/** Large entry card of an experience. The whole card opens the experience. */
export default function ExperienceCard({ experience, index }: { experience: Experience; index: number }) {
  const titleId = useId();
  const { cover } = experience;
  return <article className={`vs-experience tone-${experience.tone}`} aria-labelledby={titleId}>
    <div className="vs-experience-media">
      {cover.kind === 'image' ? <Figure image={cover.image} showCaption={false} sizes="(min-width: 900px) 50vw, 100vw" /> : <PassosArt />}
      <span className="vs-experience-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
      {experience.emblem && <img className="vs-experience-emblem" src={`${import.meta.env.BASE_URL}images/${experience.emblem.file}`} alt={experience.emblem.alt} width="120" height="41" />}
      {cover.kind === 'image' && <a className="vs-photo-credit" href={cover.image.source} target="_blank" rel="noreferrer">Foto: {cover.image.credit}</a>}
    </div>
    <div className="vs-experience-body">
      <p className="vs-experience-label"><span>{experience.label}</span><span>{experience.period}</span></p>
      <h3 id={titleId}><span className="vs-experience-short">{experience.shortName}</span><span className="vs-experience-name">{experience.name}</span></h3>
      <p className="vs-experience-description">{experience.description}</p>
      <ul className="vs-experience-highlights" aria-label={`O que você encontra em ${experience.shortName}`}>{experience.highlights.map(item => <li key={item}>{item}</li>)}</ul>
      <a className="vs-experience-cta" href={experience.href}>{experience.cta}<ArrowUpRight size={22} aria-hidden="true" /></a>
    </div>
  </article>;
}
