import { useState } from "react";
import saveCurrentActorToLocalStorage from "./saveCurrentActorToLocalStorage";
import { PopupStages } from "../../data/PopupStages.enum";
import getActorLocalStorageName from "./getActorLocalStorageName";


interface ChoosingActorProps {
  ActorId?: number;
  PopupId: number;
  SetActorState: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChoosingActor({ PopupId, SetActorState }: ChoosingActorProps): JSX.Element {
  const ActorId: number | undefined  = JSON.parse(localStorage.getItem(getActorLocalStorageName(PopupId)) ?? '{}')?.ActorId;
  const [fetchedActors, updateFetchedActors] = useState(!ActorId ? Array<number> : [ActorId]);

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
     {fetchedActors.length > 0 ? (
       fetchedActors.map((ActorId) => <button className="Actor" onClick={() => {
        saveCurrentActorToLocalStorage(PopupStages.ChoosingActor,  PopupId, {ActorId});
        SetActorState(ActorId);
      }
      }><img src={(() => "")()}></img></button>)
     ) : (
       <span id="PlaceholderText">There will be actor suggestions</span>
     )}
   </div>
 </>)
}