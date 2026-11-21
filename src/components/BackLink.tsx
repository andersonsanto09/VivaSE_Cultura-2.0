import { ArrowLeft } from 'lucide-react';
import { canGoBack } from '../platform/navigation';

// Back arrow floating over the top-left corner of the first banner of every
// event page (FASC, Senhor dos Passos…). It returns to the previous VivaSE page;
// when the page was opened directly, it falls back to the "Experiências" section.
export default function BackLink() {
  return <div className="vs-back-bar">
    <a href="#/?secao=experiencias" title="Voltar à página anterior" onClick={event => { if (canGoBack()) { event.preventDefault(); window.history.back(); } }}>
      <ArrowLeft size={26} strokeWidth={2.2} aria-hidden="true" /><span className="sr-only">Voltar à página anterior</span>
    </a>
  </div>;
}
