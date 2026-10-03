import { PHRASES, TEMPLATES } from "./phrases.js";

export function createPhraseIndex(entries) {
  const index = new Map();
  for (const { source, target, context = "" } of entries) {
    const key = `${context}\0${source}`;
    if (index.has(key)) throw new Error(`duplicate phrase: ${source} (${context || "default"})`);
    index.set(key, target);
  }
  return index;
}

const phraseIndex = createPhraseIndex(PHRASES);

export function translateUiString(raw, context = "") {
  if (typeof raw !== "string" || !raw.trim()) return null;
  const leading = raw.match(/^\s*/u)[0];
  const trailing = raw.match(/\s*$/u)[0];
  const text = raw.slice(leading.length, raw.length - trailing.length);
  const exact = phraseIndex.get(`${context}\0${text}`) ?? phraseIndex.get(`\0${text}`);
  if (exact !== undefined) return `${leading}${exact}${trailing}`;
  for (const { pattern, render, context: templateContext = "" } of TEMPLATES) {
    if (templateContext && templateContext !== context) continue;
    const match = pattern.exec(text);
    if (match) return `${leading}${render(match)}${trailing}`;
  }
  return null;
}
