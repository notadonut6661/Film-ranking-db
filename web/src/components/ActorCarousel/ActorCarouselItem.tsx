export default function CarouselItem({id}: {id: number}): JSX.Element {
  return (
    <li>
      <button id={`CarouselItem${id}`} onClick={() => {
        document.querySelectorAll('.ChooseActorPopup').forEach((value) => {
          value.classList.remove("Active");
        });

        document.querySelector(`#ChooseActorPopup${id}`)?.classList.add("Active");
        console.log(document.querySelector(`#ChooseActorPopup${id}`));
      }}></button>
    </li>
  );
}
