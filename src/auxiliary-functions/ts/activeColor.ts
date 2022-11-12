export function activeColor(...colors: string[]): string[] {
  return Array.from([...colors], (view) => `active-${view}`);
}
