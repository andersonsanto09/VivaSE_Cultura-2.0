// Platform router: a thin layer above the FASC application.
// The FASC keeps every hash route it already published (#/mapa, #/programacao…),
// so links, QR codes and tests that exist today keep working. Only the bare
// root (#/) changes meaning: it now opens the VivaSE portal, and the original
// FASC home lives at #/fasc. #/fasc/<page> is accepted as a namespaced alias.

/** Hash pages owned by the FASC application (see App.tsx readRoute). */
export const fascPages = ['mapa', 'programacao', 'cultura', 'roteiros', 'memorias', 'historia', 'artistas', 'sobre'] as const;
/** Sections of the portal home reachable through ?secao=. */
export const portalSections = ['experiencias', 'publicacoes', 'descubra'] as const;
export type PortalSection = typeof portalSections[number];
/** Slugs of experience modules rendered by the platform (not by the FASC app). */
export const experienceModules = ['senhor-dos-passos'] as const;
export type ExperienceModule = typeof experienceModules[number];

export type PlatformRoute =
  | { area: 'portal'; page: 'inicio'; section?: PortalSection }
  | { area: 'portal'; page: 'publicacoes' }
  | { area: 'portal'; page: 'publicacao'; slug: string }
  | { area: 'portal'; page: 'nao-encontrada'; path: string }
  | { area: 'fasc' }
  | { area: 'experience'; id: ExperienceModule; section: string }
  | { area: 'redirect'; to: string };

const includes = <T extends string>(list: readonly T[], value: string): value is T => (list as readonly string[]).includes(value);

/** Parses a location hash (with or without the leading #) into a platform route. Pure. */
export function parsePlatformRoute(hash: string): PlatformRoute {
  const raw = hash.startsWith('#') ? hash.slice(1) : hash;
  const [pathPart = '', query = ''] = raw.split('?');
  const path = pathPart.length > 1 ? pathPart.replace(/\/+$/, '') : pathPart;
  const segments = path.split('/').filter(Boolean).map(segment => {
    try { return decodeURIComponent(segment); } catch { return segment; }
  });
  const params = new URLSearchParams(query);
  if (segments.length === 0) {
    const section = params.get('secao') || '';
    return includes(portalSections, section) ? { area: 'portal', page: 'inicio', section } : { area: 'portal', page: 'inicio' };
  }
  const [first, second, ...rest] = segments;
  if (first === 'fasc') {
    if (!second) return { area: 'fasc' };
    const suffix = query ? `?${query}` : '';
    // Namespaced alias: #/fasc/mapa?dia=21 → #/mapa?dia=21 (the FASC's own route).
    if (includes(fascPages, second) && rest.length === 0) return { area: 'redirect', to: `/${second}${suffix}` };
    return { area: 'redirect', to: '/fasc' };
  }
  if (includes(fascPages, first) && !second) return { area: 'fasc' };
  if (first === 'publicacoes') {
    if (!second) return { area: 'portal', page: 'publicacoes' };
    if (rest.length === 0) return { area: 'portal', page: 'publicacao', slug: second };
  }
  if (includes(experienceModules, first) && rest.length === 0) return { area: 'experience', id: first, section: second || 'inicio' };
  return { area: 'portal', page: 'nao-encontrada', path };
}

/** Hash links used across the platform. */
export const platformHref = {
  inicio: (section?: PortalSection) => section ? `#/?secao=${section}` : '#/',
  publicacoes: () => '#/publicacoes',
  publicacao: (slug: string) => `#/publicacoes/${encodeURIComponent(slug)}`,
  fasc: () => '#/fasc',
  experience: (id: ExperienceModule, section = 'inicio') => section === 'inicio' ? `#/${id}` : `#/${id}/${section}`,
};

/** Identity used to detect route changes (focus management, scroll). */
export function routeKey(route: PlatformRoute): string {
  switch (route.area) {
    case 'portal': return route.page === 'publicacao' ? `portal:publicacao:${route.slug}` : `portal:${route.page}`;
    case 'experience': return `experience:${route.id}:${route.section}`;
    case 'redirect': return `redirect:${route.to}`;
    default: return route.area;
  }
}
