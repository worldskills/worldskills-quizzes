const langCodeNameMap: Map<string, string> = new Map<string, string>([
  ['en', 'English'],
  ['de', 'German'],
  ['fr', 'French'],
  ['pt_BR', 'Brazilian Portuguese']
]);

export function langCodeToName(langCode: string): string {
  return langCodeNameMap.has(langCode) ? langCodeNameMap.get(langCode) : langCode;
}
