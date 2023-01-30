export function getNumberOfCharacterMentionInString(str: string, character: string): number {
  return str.split('').filter((el) => el === character).length;
}
