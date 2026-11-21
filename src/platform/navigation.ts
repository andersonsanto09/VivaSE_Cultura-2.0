// In-app history depth, so the back arrow can tell whether there is a previous
// VivaSE page to return to (history.back) or whether the visitor arrived
// directly from outside (then a fallback link is used instead of leaving the site).
// Each history entry stores its depth in history.state. Entries created by hash
// navigation start with a null state and receive previous depth + 1; entries
// reached with back/forward already carry their depth.
const KEY = 'vivaseDepth';
let depth = 0;
let started = false;

type DepthState = Record<string, unknown> | null;
const readDepth = (state: DepthState) => (state && typeof state[KEY] === 'number' ? state[KEY] as number : undefined);

/** Call on startup and on every hashchange, before reading canGoBack(). */
export function syncNavigationDepth() {
  const state = window.history.state as DepthState;
  const stored = readDepth(state);
  if (stored !== undefined) depth = stored;
  else {
    depth = started ? depth + 1 : 0;
    nativeReplace({ ...(state || {}), [KEY]: depth }, '');
  }
  started = true;
}

export const canGoBack = () => depth > 0;

// Filters of the FASC (and the platform redirects) replace the current entry with
// a null state. Keep the depth of the entry they replace so it is not taken for a
// new page.
const nativeReplace = window.history.replaceState.bind(window.history);
window.history.replaceState = function replaceState(data: unknown, unused: string, url?: string | URL | null) {
  const current = readDepth(window.history.state as DepthState);
  const next = data === null && current !== undefined ? { [KEY]: current } : data;
  nativeReplace(next, unused, url);
};
