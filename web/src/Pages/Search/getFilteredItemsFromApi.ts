export default async function getFilteredItemsFromApi<T>(filters: Map<keyof T, [number, number] | string | null>, request: string): Promise<Array<T>> {
  return new Array<T>(256);
} 