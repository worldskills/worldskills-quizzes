export function txt(html: string): string {
  return String(html).replace(/<[^>]+>/gm, '');
}
