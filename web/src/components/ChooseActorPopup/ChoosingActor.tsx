import { useEffect, useRef, useState } from "react";
import saveCurrentActorToLocalStorage from "./saveCurrentActorToLocalStorage";
import { PopupStages } from "../../data/PopupStages.enum";
import getActorLocalStorageName from "../../utils/getActorLocalStorageName";
import config from "../../data/Json/config.json";

interface ChoosingActorProps {
  ActorId?: number;
  PopupId: number;
  SetActorState: React.Dispatch<React.SetStateAction<number>>;
}

export default function ChoosingActor({ PopupId, SetActorState }: ChoosingActorProps): JSX.Element {
  const ActorId: number | undefined  = JSON.parse(localStorage.getItem(getActorLocalStorageName(PopupId)) ?? '{}')?.ActorId;
  const [fetchedActors, updateFetchedActors] = useState(!ActorId ? Array<number> : [ActorId]);
  const ActorSearch = useRef<HTMLInputElement>(null);
  
  useEffect(() => {

    console.log(ActorSearch);
    
        ActorSearch?.current?.addEventListener('input', async () => {
  
          if ((ActorSearch?.current?.value.length ?? 0) < 3) return;
          try {
            const fetchedActorIds = await fetch(`${config.server_url}/actors/name?=${ActorSearch?.current?.value}&length?=8`);
            updateFetchedActors(Object.values(fetchedActorIds).map(({id}) => +id));
          } catch {
            console.log('Something went wrong, as you can see')
          }
      }); 
  })



  return (<>
   <div className="Search TextForm">
     <input ref={ActorSearch} type="text" placeholder="Enter actor name" id="ActorSearch" />
   </div>
   <div className="Actors" >
     {fetchedActors.length > 0 ? (
       fetchedActors.map((ActorId) => <button className="Actor" onClick={() => {
        saveCurrentActorToLocalStorage(PopupStages.ChoosingActor,  PopupId, {ActorId});
        SetActorState(ActorId);
      }
      }><img src={`${config.server_url}/actorPhoto/${ActorId}`}></img></button>)
     ) : (
       <span id="PlaceholderText">There will be actor suggestions</span>
     )}
   </div>
 </>)
}
