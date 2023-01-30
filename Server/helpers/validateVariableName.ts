export function validateVariableName(name: string): boolean {
  return !name.match(/^[a-zA-Z_$][a-zA-Z_$0-9]*$/);
}