import { useState } from "react";
import saveCurrentActorToLocalStorage from "./saveCurrentActorToLocalStorage";
import { PopupStages } from "../../data/PopupStages.enum";


export default function ChoosingActor({ PopupId }: {ActorId?: number, PopupId: number}): JSX.Element {
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
  * change search font
  */
 <>
   <div className="Search TextForm">
     <input type="text" placeholder="Enter actor name" id="ActorSearch"/>
   </div>
   <div className="Actors" >
     {fetchedActors.length ? (
       fetchedActors.map((ActorId) => <button className="Actor" onClick={() => saveCurrentActorToLocalStorage(PopupStages.ChoosingActor,  PopupId, {ActorId})}><img src={(() => "")()}></img></button>)
     ) : (
       <span id="PlaceholderText">There will be actor suggestions</span>
     )}
   </div>
 </>)
}