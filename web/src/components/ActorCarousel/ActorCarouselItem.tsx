// TODO grid area
export default function CarouselItem({id}: {id: number, }): JSX.Element {
  return (
    <li>
      <button id={`CarouselItem${id}`} onClick={() => {
        const popupElement = document.querySelector(`#ChooseActorPopup${id}`);
        if (popupElement?.className.includes('Active')) {
          popupElement?.classList.remove("Active");
          return;
        }

        document.querySelectorAll('.ChooseActorPopup').forEach((value) => {
          value.classList.remove("Active");
        });

        popupElement?.classList.add("Active");
      }}></button>
    </li>
  );
}
