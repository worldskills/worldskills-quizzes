import * as striptags from 'striptags';

export function striptagsFromText(data: string): string {
  let text = striptags(data, ['strong', 'b', 'i', 'em', 'a', 'img', 'sup', 'sub', 'strike', 's', 'code'], '<br>');
  text = text.replace(/(?:\s*<br>\s*){2,}/g, '<br>');
  text = text.replace(/(?:(?:^\s*<br>\s*)|(?:\s*<br>\s*)$)/g, '');
  return text;
}
