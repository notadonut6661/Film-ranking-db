import CastElement from "../../data/Interfaces/castElement.interface";
import { PopupStages } from "../../data/PopupStages.enum";
import getActorLocalStorageName from "./getActorLocalStorageName";

export default function saveCurrentActorToLocalStorage (currentPopupStage: PopupStages, id:number, castElement: CastElement)  {  
  // if (currentPopupStage < PopupStages.Submitted) return;
  window.localStorage.setItem(getActorLocalStorageName(id), JSON.stringify(castElement))
}