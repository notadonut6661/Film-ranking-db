import {CastElement} from "../../data/Interfaces/castElement.interface";
import { PopupStages } from "../../data/PopupStages.enum";
import getActorLocalStorageName from "../../utils/getActorLocalStorageName";

export default function saveCurrentActorToLocalStorage (currentPopupStage: PopupStages, id:number, castElement: CastElement)  {  
  const LocalStoragePropValue = JSON.parse(window.localStorage.getItem(getActorLocalStorageName(id)) || '');

  Object.entries(castElement).forEach(([key, value]) => {
    LocalStoragePropValue[key] = value;
  });

  window.localStorage.setItem(getActorLocalStorageName(id), JSON.stringify(LocalStoragePropValue))
}