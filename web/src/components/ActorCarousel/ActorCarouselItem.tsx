import { useState } from "react";

export default function CarouselItem({id}: {id: number, }): JSX.Element {
  const [isPopupActive, setIsPopupActive] = useState(false);

  return (
    <li>
      <button id={`CarouselItem${id}`} onClick={() => {
        const popupElement = document.querySelector(`#ChooseActorPopup${id}`);
        document.querySelectorAll('.ChooseActorPopup').forEach((value) => {
          value.classList.remove("Active");
        });
      
        if (isPopupActive) {
          popupElement?.classList.remove("Active");
          setIsPopupActive(value => !value)
          return;
        }

        popupElement?.classList.add("Active");
        setIsPopupActive(value => !value);
      }}></button>
    </li>
  );
}
