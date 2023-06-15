import config from "../../data/Json/config.json";

export async function fetchActorImage(querySubdirectory: string): Promise<object | void> {
  try {
    const fetchedActorIds = await fetch(`${config.server_url}/${querySubdirectory}`);
    return fetchedActorIds as object;

  } catch {
    console.log('Something went wrong, as you can see')
  }
}