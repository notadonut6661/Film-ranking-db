export interface uriParamsType {
  name: string;
  type: "string" | "number" | "bigint" | "boolean" | "symbol" | { Required: Record<string, { type: "string" | "number" | "bigint" | "boolean" | "symbol" }>, Optional?: { type: "string" | "number" | "bigint" | "boolean" | "symbol" } };
  isOptional: boolean;
}
