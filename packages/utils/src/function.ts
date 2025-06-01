export function stripQuotes(str: string): string {
  return str.replace(/^"(.*)"$/, '$1');
}