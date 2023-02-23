import { createHash } from "crypto";

export function generateSha256(str: string): string {
  return createHash('sha256').update(str).digest('hex');
}   
