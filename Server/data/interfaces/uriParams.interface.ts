export interface uriParamsType {
  name: string;
  type: "string" | "number" | "bigint" | "boolean" | "symbol" | { Required: Record<string, { type: "string" | "number" | "bigint" | "boolean" | "symbol" }>, Optional?:  Record<string, { type: "string" | "number" | "bigint" | "boolean" | "symbol" } >};
  isOptional: boolean;
}
