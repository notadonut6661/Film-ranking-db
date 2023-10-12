export interface uriParamsType {
  name: string;
  type: "string" | "number" | "bigint" | "boolean" | "symbol" | { Required: Record<string, "string" | "number" | "bigint" | "boolean" | "symbol">, Optional?:  Record<string, "string" | "number" | "bigint" | "boolean" | "symbol" >};
}
