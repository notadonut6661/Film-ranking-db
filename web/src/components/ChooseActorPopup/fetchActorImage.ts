import config from "../../data/Json/config.json";

export async function fetchActorImage(ActorId: number): Promise<string | undefined> {
  try {
    const fetchedActorIds = await fetch(`${config.server_url}/actor_image/${ActorId}`);
    return URL.createObjectURL(await fetchedActorIds.blob());

  } catch {
    console.error('Something went wrong, as you can see')
  }
} 