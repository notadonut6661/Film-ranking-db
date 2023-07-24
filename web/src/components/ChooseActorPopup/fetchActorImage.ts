import config from "data/Json/config.json";

// FIXME i think it could be better to return null instead of undefined
export async function fetchActorImage(ActorId: number): Promise<Blob | undefined> {

  try {
    const fetchedActorIds = await fetch(`http://${config.server_url}/actorPhoto/13`, {
      headers: {
        "Content-Type": "image/jpeg"
      },
      mode: 'no-cors'
    });
   
    return await fetchedActorIds.blob();

  } catch {
    console.error('Something went wrong, as you can see')
  }
} 