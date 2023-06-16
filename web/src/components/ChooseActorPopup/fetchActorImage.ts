import config from "../../data/Json/config.json";

export async function fetchActorImage(ActorId: number): Promise<Blob | undefined> {

  try {
    console.log(`${config.server_url}/actorPhoto/13`);
    
    const fetchedActorIds = await fetch(`http://${config.server_url}/actorPhoto/13`, {
      headers: {
        "Content-Type": "image/jpeg"
      },
      mode: 'no-cors'
    });
    console.log(await fetchedActorIds.blob());
    
    return await fetchedActorIds.blob();

  } catch {
    console.error('Something went wrong, as you can see')
  }
} 