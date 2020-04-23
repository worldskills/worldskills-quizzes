import * as striptags from 'striptags';

export function striptagsFromText(data: string): string {
  let text = striptags(data, ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'i', 'a', 'img', 'li', 'ol', 'ul'], '<br>');
  text = text.replace(/(?:\s*<br>\s*){2,}/g, '<br>');
  text = text.replace(/(?:(?:^\s*<br>\s*)|(?:\s*<br>\s*)$)/g, '');
  return text;
}
