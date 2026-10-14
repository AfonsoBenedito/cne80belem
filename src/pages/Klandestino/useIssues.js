import { useEffect, useReducer } from 'react';
import { issueSlugs, loadIssue } from '../../config/klandestino';

// Each issue arrives in its own chunk; once loaded it's read from here synchronously, so going
// back and forth between the index and an issue shows no gap
const loaded = new Map();

export function useIssues(slugs = issueSlugs) {
  const [, rerender] = useReducer((n) => n + 1, 0);
  const key = slugs.join(',');
  useEffect(() => {
    const missing = key.split(',').filter((s) => !loaded.has(s));
    if (!missing.length) return undefined;
    let current = true;
    Promise.all(missing.map((s) => loadIssue(s).then((issue) => loaded.set(s, issue)))).then(() => {
      if (current) rerender();
    });
    return () => { current = false; };
  }, [key]);
  // undefined while any is still loading; null for a slug with no issue
  return slugs.every((s) => loaded.has(s)) ? slugs.map((s) => loaded.get(s)) : undefined;
}

// "Nº 6" for a numbered issue, its label for a loose sheet
export const issueName = (issue) => (issue.number != null ? `Nº ${issue.number}` : issue.label);
