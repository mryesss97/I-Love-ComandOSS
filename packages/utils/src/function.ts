export function stripQuotes(str: string): string {
  return str.replace(/^"(.*)"$/, '$1');
}

export function truncateAddress(
  address: string,
  startLength = 8,
  endLength = 6
): string {
  if (!address || address.length <= startLength + endLength) return address;
  return `${address.slice(0, startLength)}...${address.slice(-endLength)}`;
}
