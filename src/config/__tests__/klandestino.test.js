import { describe, it, expect } from 'vitest';
import { issueSlugs, issueSummaries } from '../klandestino';

// The page loads one issue at a time; the test reads them all
const files = import.meta.glob('../klandestino/issues/*.js', { eager: true });
const issues = Object.fromEntries(
  Object.entries(files).map(([path, m]) => [path.match(/([^/]+)\.js$/)[1], m.default]),
);

const BLOCK_TYPES = ['p', 'h', 'list', 'quote', 'verse', 'song', 'grid', 'image', 'note'];
const isText = (s) => typeof s === 'string' && s.trim() === s && s.length > 0;

describe('klandestino', () => {
  it('lists every issue file, and every listed issue has one', () => {
    expect(Object.keys(issues).sort()).toEqual([...issueSlugs].sort());
  });

  // The index cards read these instead of the issues; a stale one would show the wrong date or sections
  it.each(issueSummaries.map((s) => [s.slug, s]))('summary of %s matches its issue', (slug, summary) => {
    const issue = issues[slug];
    for (const k of ['number', 'title', 'label', 'date', 'dateLabel', 'volume', 'frequency', 'price']) {
      expect(issue[k] ?? null, `${slug}.${k}`).toEqual(summary[k] ?? null);
    }
    expect(summary.sections).toEqual([...new Set(issue.articles.map((a) => a.section).filter(Boolean))]);
    const titles = issue.articles.map((a) => a.title);
    for (const h of summary.highlights ?? []) expect(titles, `${slug}: highlight "${h}"`).toContain(h);
    const ids = issue.articles.map((a) => a.id);
    for (const k of ['puzzles', 'solutions']) if (summary[k]) expect(ids, `${slug}.${k}`).toContain(summary[k]);
  });
});

describe.each(Object.entries(issues))('klandestino issue %s', (slug, issue) => {
  it('has its slug, a number or a label, and a date', () => {
    expect(issue.slug).toBe(slug);
    if (issue.number == null) expect(isText(issue.label)).toBe(true);
    else expect(String(issue.number)).toBe(slug);
    expect(issue.date).toMatch(/^\d{4}-\d{2}(-\d{2})?$/);
    expect(isText(issue.dateLabel)).toBe(true);
  });

  it('has articles with unique ids', () => {
    expect(issue.articles.length).toBeGreaterThan(0);
    const ids = issue.articles.map((a) => a.id);
    for (const id of ids) expect(id).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('has only known blocks, with clean text', () => {
    for (const a of issue.articles) {
      expect(a.title || a.section, a.id).toBeTruthy();
      expect(a.blocks.length, a.id).toBeGreaterThan(0);
      for (const b of a.blocks) {
        expect(BLOCK_TYPES, `${a.id}: ${b.type}`).toContain(b.type);
        if (['p', 'h', 'note', 'quote'].includes(b.type)) expect(isText(b.text), `${a.id}: ${b.text}`).toBe(true);
        if (b.type === 'list') b.items.forEach((t) => expect(isText(t), `${a.id}: ${t}`).toBe(true));
        if (b.type === 'verse' || b.type === 'song') b.lines.forEach((t) => expect(typeof t, a.id).toBe('string'));
        if (b.type === 'grid') expect(new Set(b.rows.map((r) => r.length)).size, `${a.id}: uneven grid`).toBe(1);
        if (b.type === 'image') {
          expect(typeof b.src === 'string' && b.src.length > 0, `${a.id}: image without a file`).toBe(true);
          expect(isText(b.alt), a.id).toBe(true);
        }
      }
    }
  });
});
