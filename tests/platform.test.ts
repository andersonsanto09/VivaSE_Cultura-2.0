import test from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { experienceModules, fascPages, parsePlatformRoute, platformHref } from '../src/platform/routes.ts';
import { activeExperiences, experiences } from '../src/platform/content/experiences.ts';
import { findPost, plannedPosts, posts, publishedPosts, readingMinutes } from '../src/platform/content/posts.ts';
import { cityPlaces } from '../src/platform/content/places.ts';
import { passosGallery, passosPlaces, passosSchedule, passosSections, passosTraditions } from '../src/experiences/passos/content.ts';
import { places as fascPlaces } from '../src/data/festival.ts';

const imageExists = (file: string) => existsSync(new URL(`../public/images/${file}`, import.meta.url));

test('raiz abre a Home da plataforma e #/fasc abre a Home original do FASC', () => {
  assert.deepEqual(parsePlatformRoute(''), { area: 'portal', page: 'inicio' });
  assert.deepEqual(parsePlatformRoute('#/'), { area: 'portal', page: 'inicio' });
  assert.deepEqual(parsePlatformRoute('#/?secao=descubra'), { area: 'portal', page: 'inicio', section: 'descubra' });
  assert.deepEqual(parsePlatformRoute('#/?secao=inexistente'), { area: 'portal', page: 'inicio' });
  assert.deepEqual(parsePlatformRoute('#/fasc'), { area: 'fasc' });
  assert.deepEqual(parsePlatformRoute('#/fasc/'), { area: 'fasc' });
});

test('todas as rotas publicadas do FASC continuam sendo do FASC, com parâmetros', () => {
  for (const page of fascPages) {
    assert.deepEqual(parsePlatformRoute(`#/${page}`), { area: 'fasc' }, page);
    assert.deepEqual(parsePlatformRoute(`#/${page}?dia=21&lugar=joao`), { area: 'fasc' }, page);
  }
  assert.deepEqual(parsePlatformRoute('#/mapa?modo=historico&edicao=2025&lugar=2025-joao'), { area: 'fasc' });
  assert.deepEqual(parsePlatformRoute('#/sobre?dia=20&secao=fontes'), { area: 'fasc' });
});

test('a lista de páginas do FASC acompanha o roteador do App', () => {
  const app = readFileSync(new URL('../src/App.tsx', import.meta.url), 'utf8');
  const culturePages = app.match(/const culturePages = \[([^\]]+)\]/)?.[1].match(/'([^']+)'/g)?.map(value => value.slice(1, -1)) || [];
  const pathPages = [...app.matchAll(/path === '\/([a-z]+)'/g)].map(match => match[1]);
  const appPages = new Set([...culturePages, ...pathPages]);
  assert.ok(appPages.size >= 8);
  assert.deepEqual([...appPages].sort(), [...fascPages].sort());
});

test('aliases /fasc/... redirecionam para as rotas existentes do FASC', () => {
  assert.deepEqual(parsePlatformRoute('#/fasc/programacao?dia=21'), { area: 'redirect', to: '/programacao?dia=21' });
  assert.deepEqual(parsePlatformRoute('#/fasc/mapa'), { area: 'redirect', to: '/mapa' });
  assert.deepEqual(parsePlatformRoute('#/fasc/inexistente'), { area: 'redirect', to: '/fasc' });
});

test('publicações, experiências e páginas inexistentes têm rotas próprias', () => {
  assert.deepEqual(parsePlatformRoute('#/publicacoes'), { area: 'portal', page: 'publicacoes' });
  assert.deepEqual(parsePlatformRoute(platformHref.publicacao('praca-sao-francisco')), { area: 'portal', page: 'publicacao', slug: 'praca-sao-francisco' });
  assert.deepEqual(parsePlatformRoute('#/senhor-dos-passos'), { area: 'experience', id: 'senhor-dos-passos', section: 'inicio' });
  assert.deepEqual(parsePlatformRoute('#/senhor-dos-passos/galeria'), { area: 'experience', id: 'senhor-dos-passos', section: 'galeria' });
  assert.equal(parsePlatformRoute('#/qualquer-coisa').area, 'portal');
  assert.equal((parsePlatformRoute('#/qualquer-coisa') as { page: string }).page, 'nao-encontrada');
  assert.equal((parsePlatformRoute('#/mapa/extra') as { page: string }).page, 'nao-encontrada');
});

test('o card do FASC aponta para a aplicação existente e cada experiência tem rota válida', () => {
  const fasc = experiences.find(experience => experience.id === 'fasc');
  assert.equal(fasc?.href, '#/fasc');
  assert.equal(new Set(experiences.map(experience => experience.id)).size, experiences.length);
  for (const experience of activeExperiences) {
    const route = parsePlatformRoute(experience.href);
    assert.ok(route.area === 'fasc' || route.area === 'experience', experience.id);
    if (route.area === 'experience') assert.ok((experienceModules as readonly string[]).includes(route.id));
    if (experience.cover.kind === 'image') assert.ok(imageExists(experience.cover.image.file), experience.cover.image.file);
    if (experience.emblem) assert.ok(imageExists(experience.emblem.file), experience.emblem.file);
  }
});

test('publicações publicadas têm fontes com endereço, imagens existentes e links internos válidos', () => {
  assert.equal(new Set(posts.map(post => post.slug)).size, posts.length);
  assert.ok(publishedPosts.length >= 4);
  for (const post of publishedPosts) {
    assert.ok(post.sources.some(source => source.url?.startsWith('https://')), post.slug);
    assert.ok(readingMinutes(post) >= 1);
    if (post.cover.kind === 'image') assert.ok(imageExists(post.cover.image.file), post.cover.image.file);
    for (const block of post.blocks) {
      if (block.type === 'figure') assert.ok(imageExists(block.image.file), block.image.file);
      if (block.type === 'links') for (const link of block.items) {
        const route = parsePlatformRoute(link.href);
        assert.ok(!(route.area === 'portal' && route.page === 'nao-encontrada'), link.href);
      }
    }
  }
});

test('temas em curadoria não têm corpo nem abrem como publicação', () => {
  assert.ok(plannedPosts.length > 0);
  for (const post of plannedPosts) {
    assert.equal(findPost(post.slug), undefined);
    assert.equal('blocks' in post, false);
  }
});

test('lugares da cidade têm fonte, imagens existentes e coordenadas no Centro Histórico', () => {
  const fascIds = new Set(fascPlaces.map(place => place.id));
  assert.equal(new Set(cityPlaces.map(place => place.id)).size, cityPlaces.length);
  for (const place of cityPlaces) {
    assert.ok(place.sources.some(source => source.url), place.id);
    if (place.image) assert.ok(imageExists(place.image.file), place.image.file);
    if (place.fascPlaceId) assert.ok(fascIds.has(place.fascPlaceId), place.fascPlaceId);
    assert.ok(place.coordinates, place.id);
    const [lat, lng] = place.coordinates!;
    assert.ok(lat < -11.0 && lat > -11.03 && lng < -37.19 && lng > -37.22, place.id);
  }
});

test('Senhor dos Passos não inventa programação e cita fonte em cada tradição', () => {
  assert.equal(passosSchedule, null);
  assert.equal(passosSections[0].id, 'inicio');
  for (const tradition of passosTraditions) assert.ok(tradition.source.url?.startsWith('https://'), tradition.id);
  for (const place of passosPlaces) {
    assert.ok(place.sources.some(source => source.url), place.id);
    assert.ok(place.coordinates, place.id);
  }
  for (const item of passosGallery) if (item.image) assert.ok(imageExists(item.image.file), item.image.file);
});
