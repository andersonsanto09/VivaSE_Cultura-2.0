import { Suspense, lazy, useEffect, useRef, useState } from 'react';
import PortalHome from './pages/PortalHome';
import { SkipLink } from './components/PortalLayout';
import { parsePlatformRoute, routeKey } from './routes';
import type { PlatformRoute } from './routes';
import { findPost } from './content/posts';
import { syncNavigationDepth } from './navigation';

syncNavigationDepth();

// The FASC application is loaded as it is, on demand: the portal stays light and
// the FASC keeps its own router, header, styles and behaviour untouched.
const FascApp = lazy(() => import('../App'));
const PostsIndex = lazy(() => import('./pages/PostsIndex'));
const PostPage = lazy(() => import('./pages/PostPage'));
const NotFound = lazy(() => import('./pages/NotFound'));
const PassosExperience = lazy(() => import('../experiences/passos/PassosExperience'));

/** Reads the current hash, resolving compatibility redirects in place. */
function readRoute(): Exclude<PlatformRoute, { area: 'redirect' }> {
  const route = parsePlatformRoute(window.location.hash);
  if (route.area !== 'redirect') return route;
  window.history.replaceState(null, '', `#${route.to}`);
  return readRoute();
}

const titles: Record<string, string> = { inicio: 'VivaSE Cultura — São Cristóvão', publicacoes: 'Publicações | VivaSE Cultura', 'nao-encontrada': 'Página não encontrada | VivaSE Cultura' };

function Loading({ label }: { label: string }) {
  return <main id="conteudo" className="vs-loading" aria-busy="true"><p role="status">{label}</p></main>;
}

function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
  target.querySelector<HTMLElement>('h2[tabindex="-1"]')?.focus({ preventScroll: true });
}

export default function Platform() {
  const [route, setRoute] = useState(readRoute);
  const key = routeKey(route);
  const previous = useRef<string | null>(null);

  useEffect(() => {
    const listener = () => { syncNavigationDepth(); setRoute(readRoute()); };
    // A section link equal to the current hash fires no hashchange: scroll anyway.
    const sameSection = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest?.('a[href^="#/?secao="]');
      const href = anchor?.getAttribute('href');
      if (!href || href !== window.location.hash) return;
      const section = new URLSearchParams(href.split('?')[1]).get('secao');
      if (section) { event.preventDefault(); scrollToSection(section); }
    };
    window.addEventListener('hashchange', listener);
    document.addEventListener('click', sameSection);
    return () => { window.removeEventListener('hashchange', listener); document.removeEventListener('click', sameSection); };
  }, []);

  // Portal pages and modules manage title, scroll and focus; the FASC app does its own.
  useEffect(() => {
    if (route.area === 'fasc') { previous.current = key; return; }
    if (route.area === 'portal') {
      const post = route.page === 'publicacao' ? findPost(route.slug) : undefined;
      document.title = post ? `${post.title} | VivaSE Cultura` : titles[route.page] || titles['nao-encontrada'];
    }
    const section = route.area === 'portal' && route.page === 'inicio' ? route.section : undefined;
    const changedPage = previous.current !== key;
    if (section) {
      // Wait for layout so the section offset is final.
      requestAnimationFrame(() => scrollToSection(section));
    } else if (changedPage) {
      window.scrollTo(0, 0);
      if (previous.current !== null) document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
    }
    previous.current = key;
  }, [key, route]);

  if (route.area === 'fasc') return <Suspense fallback={<Loading label="Abrindo o FASC…" />}><FascApp /></Suspense>;
  if (route.area === 'experience') return <Suspense fallback={<Loading label="Abrindo a experiência…" />}><SkipLink /><PassosExperience section={route.section} /></Suspense>;
  return <div className={`vs-app vs-page-${route.page}`}>
    <SkipLink />
    <Suspense fallback={<Loading label="Abrindo a página…" />}>
      {route.page === 'inicio' ? <PortalHome section={route.section} />
        : route.page === 'publicacoes' ? <PostsIndex />
        : route.page === 'publicacao' ? <PostPage slug={route.slug} />
        : <NotFound />}
    </Suspense>
  </div>;
}
