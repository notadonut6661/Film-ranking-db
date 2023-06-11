export interface uriParamsType {
  name: string;
  type: "string" | "number" | "bigint" | "boolean" | "symbol" |  {
    name: string,
    type: "string" | "number" | "bigint" | "boolean" 
  }[];
}
