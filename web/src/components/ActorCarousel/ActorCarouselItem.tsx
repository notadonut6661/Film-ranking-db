import CastElement from "../../data/Interfaces/castElement.interface";
import IsTitlePageNew from "../../utils/GetIsTitlePageNew";
import getActorLocalStorageName from "../ChooseActorPopup/getActorLocalStorageName";
import { getCarouselItemId } from "./getCarouselItemId";

interface CarouselItemProps {
  id: number;
  isCreator?: boolean;
  carouselItems: CastElement[];
  updateCarouselItems: React.Dispatch<React.SetStateAction<CastElement[]>>;
}

export default function CarouselItem({id,   updateCarouselItems, carouselItems, isCreator}: CarouselItemProps): JSX.Element {
  // FIXME function's name is not clearly understandable
  const deleteCurrentActorFromLocalStorage = (newCastElementData: CastElement[]) => {
    for (const i in newCastElementData) {
      const localStorageName = IsTitlePageNew().isNew ? `draft-new-title-actor-${i}` : `draft-edit-${IsTitlePageNew().titleId}-title-actor-${i}`;
      window.localStorage.setItem(localStorageName, JSON.stringify(newCastElementData[i]));
    }
    
    window.localStorage.removeItem(getActorLocalStorageName(newCastElementData.length));
  };
  
  console.log(isCreator);
  
  return (
    <li>
     { isCreator || <button className="close" onClick={() => {
        const newCastElementData: CastElement[] = [];
       Object.entries(window.localStorage).filter(([key]) => {
          const filterLocalStorageName = IsTitlePageNew().isNew ? "draft-new-title-actor" : `draft-edit-${IsTitlePageNew().titleId}-title-actor`;
          return key.includes(filterLocalStorageName);
        }).sort(([keyA], [keyB]) => {
          return getCarouselItemId(keyA) - getCarouselItemId(keyB);
        }).map(([, value]) => JSON.parse(value)).forEach((val, i, arr) => {
          
          console.log(arr);
          
          if (i === id) {
            newCastElementData[arr.length - 1] = {};  
            return;
          }
          
          if (i < id) {
            newCastElementData[i] = val
            return;
          }

          newCastElementData[i - 1] = val
        });
                
        newCastElementData.pop();
        deleteCurrentActorFromLocalStorage(newCastElementData);

        
        updateCarouselItems(newCastElementData);
      }}></button>}
      {!isCreator ? <button id={`CarouselItem${id}`}  className="carousel-item" onClick={() => {
        const popupElement = document.querySelector(`#ChooseActorPopup${id}`);
        if (popupElement?.className.includes('Active')) {
          popupElement?.classList.remove("Active");
          return;
        }

        document.querySelectorAll('.ChooseActorPopup').forEach((value) => {
          value.classList.remove("Active");
        });

        popupElement?.classList.add("Active");
      }}> 
        <img></img>
      </button>: <button className="new-carousel-item" onClick={() => {
        window.localStorage.setItem(getActorLocalStorageName(carouselItems.length), '{}');
        updateCarouselItems(arr => [...arr, {}])
      }}></button>}
    </li>
  );
}
