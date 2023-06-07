import { useState } from "react";
import config from "../../data/Json/config.json";


export default function ChoosingActor({ ActorId}: {ActorId?: number}): JSX.Element {
  // const [fetchedActors, updateFetchedActors] = useState(!ActorId ? Array<number> : [ActorId]);
  const [fetchedActors, updateFetchedActors] = useState([11,34,54, 11,34,54, 11,34]);

  // const ActorSearch = document.querySelector('.ChooseActorPopup > input#ActorSearch') as HTMLInputElement;


      // ActorSearch?.addEventListener('input', async () => {
    //   if (ActorSearch.value.length < 3) return;
    //   try {
    //     const fetchedActorIds = await fetch(`${config.server_url}/actors/name?=""&length?=8`);
    //     updateFetchedActors(Object.entries(fetchedActorIds).map(([val]) => +val));
    //   } catch {
    //     console.log('Something went wrong, as you can see')
    //   }
    // });


  return (  /**
  * TODO
  * Highlight selected actor
  * TODO
  * change search font
  */
 <>
   <div className="Search TextForm">
     <input type="text" placeholder="Enter actor name" id="ActorSearch"/>
   </div>
   <div className="Actors">
     {fetchedActors.length ? (
       fetchedActors.map(() => <div className="Actor"></div>)
     ) : (
       <span id="PlaceholderText">There will be actor suggestions</span>
     )}
   </div>
 </>)
}