/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState} from "react";
import "./style.scss";
import CarouselItem from "./ActorCarouselItem";
import IsTitlePageNew from "../../utils/GetIsTitlePageNew";
import ChooseCastMember from "../ChooseActorPopup";
import { getCarouselItemId } from "./getCarouselItemId";

interface ActorCarouselProps {
  EditMode: boolean;
}

interface CastElement {
  ActorId?: number;
  Character?: string;
}

export default function ActorCarousel({
  EditMode,
}: ActorCarouselProps): JSX.Element {
  const [scrolledElements, setScrolledElements] = useState(0);
  const IfCurrentTitleNew = IsTitlePageNew();

  // TODO add carousel element for adding actors
  // FIXME rename it
  const DraftCarousel: Array<CastElement>  = Object.entries(window.localStorage).filter(([key]) => {
    const filterLocalStorageName = IfCurrentTitleNew.isNew ? "draft-new-title-actor" : `draft-edit-${IfCurrentTitleNew.titleId}-title-actor`;
    return key.includes(filterLocalStorageName);
  }).sort(([keyA], [keyB]) => {
    return getCarouselItemId(keyA) - getCarouselItemId(keyB);
  }).map(([, value]) => JSON.parse(value)); 


  const [carouselItems, updateCarouselItems] =  useState(DraftCarousel);   

  const getAllCarouselItems = () => {
    return EditMode ? [...DraftCarousel, {}]: DraftCarousel
  }


  // FIXME magic number
  const getMaximalScrollIndex = (): number => getAllCarouselItems().length - 4;
  const getMinimalScrollIndex = (): number => 0;

  return (
    // TODO: delete magic numbers
    <>
      <div className="CarouselForAddingActors">
        <button
          className="scrollButton"
          id="right"
          onClick={() => {
            if (scrolledElements === getMinimalScrollIndex()) return;

            setScrolledElements(() => scrolledElements - 1);
          }}
        ></button>
        <div className="cast">
          <ul
            style={{
              width: getAllCarouselItems().length  > 4 ? `${100 + (getAllCarouselItems().length - 4) * 27}%` : "100%",
              right: getAllCarouselItems().length  >= 4 ? `${27 * scrolledElements}%` : 0,
            }}
          >
            {getAllCarouselItems().map((_val, i) => {
              const isElementForCreation = getAllCarouselItems().length - 1 === i;
              console.log(isElementForCreation, carouselItems);
              
              return <CarouselItem id={i} updateCarouselItems={updateCarouselItems} carouselItems={carouselItems} isCreator={isElementForCreation}/> 
    })}
          </ul>
        </div>

        <button
          className="scrollButton"
          id="left"
          onClick={() => {
            if (scrolledElements === getMaximalScrollIndex()) return;

            setScrolledElements(() => scrolledElements + 1);
          }}
        ></button>
      </div>
      <div id="ChooseCastMemberPopups">
    { carouselItems.map((value, index) => {
        let getCarouselForAddingActors = (document.querySelector(`#CarouselItem${index}`) as HTMLDivElement)?.getBoundingClientRect();
        return (
          <ChooseCastMember
            top={`${getCarouselForAddingActors?.top - getCarouselForAddingActors?.height  - 205}px`}
            left={`${getCarouselForAddingActors?.left}px`}
            InitialPopupStage={1}
            id={index}
            ActorId={value.ActorId}
          />
        );
  })}
</div>

    </>
  );
}
