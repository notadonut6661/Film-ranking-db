import CastElement from "../../data/Interfaces/castElement.interface";
import IsTitlePageNew from "../../utils/GetIsTitlePageNew";
import getActorLocalStorageName from "../ChooseActorPopup/getActorLocalStorageName";
import { getCarouselItemId } from "./getCarouselItemId";

interface CarouselItemProps {
  id: number;
  carouselItems: CastElement[];
  updateCarouselItems: React.Dispatch<React.SetStateAction<CastElement[]>>;
}

export default function CarouselItem({id,   updateCarouselItems, carouselItems}: CarouselItemProps): JSX.Element {
  const deleteCurrentActorFromLocalStorage = (newCastElementData: CastElement[]) => {
    for (const i in newCastElementData) {
      const localStorageName = IsTitlePageNew().isNew ? `draft-new-title-actor-${i}` : `draft-edit-${IsTitlePageNew().titleId}-title-actor-${i}`;
      window.localStorage.setItem(localStorageName, JSON.stringify(newCastElementData[i]));
    }

    console.log('hsk', newCastElementData);
    
    window.localStorage.removeItem(getActorLocalStorageName(newCastElementData.length));
  };
  
  //TODO You need to rename all the localhost keys so it corresponds sliced array indexes.
  return (
    <li>
      <button className="close" onClick={() => {
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
            // console.log(val, 190);

            return;
          }
          
          if (i < id) {
            newCastElementData[i] = val
            // console.log(val);
            
            // window.localStorage.setItem(getActorLocalStorageName(i), JSON.stringify(val));
            
            return;
          }

          newCastElementData[i - 1] = val
        });
        console.log(newCastElementData);
                
        newCastElementData.pop();
        deleteCurrentActorFromLocalStorage(newCastElementData);

        console.log(newCastElementData);
        
        updateCarouselItems(newCastElementData);
      }}></button>
      <button id={`CarouselItem${id}`}  className="carousel-item" onClick={() => {
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
      </button>
    </li>
  );
}
