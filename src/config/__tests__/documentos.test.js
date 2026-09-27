import { describe, it, expect } from 'vitest';
import { documentos } from '../documentos';

// Guards the ?bytes plugin: a broken import would show "NaN KB" beside every document
describe('documentos', () => {
  it.each(documentos.map((d) => [d.name, d]))('%s: has a file and a real size', (_, doc) => {
    expect(typeof doc.file).toBe('string');
    expect(Number.isInteger(doc.bytes) && doc.bytes > 0).toBe(true);
  });
});
