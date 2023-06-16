// TODO grid area
export default function CarouselItem({id}: {id: number, }): JSX.Element {
  return (
    <li>
      <button className="close"></button>
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
