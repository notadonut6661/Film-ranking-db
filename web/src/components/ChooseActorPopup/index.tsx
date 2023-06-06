// ! IT SHOULDN'T BE USED OTHER THAN FROM ACTOR CAROUSEL, IT DOESN'T NEED A SEPARATE FOLDER!
import { useState, useEffect } from "react";
import "./style.scss";
import IsTitlePageNew from "../../utils/GetIsTitlePageNew";
import { ChooseCastMemberPopupProps } from "../../data/Interfaces/ChooseActorPopupProps.interface";
import { PopupStages } from "../../data/PopupStages.enum";
import ChoosingActor from "./ChoosingActor";
import SelectingCharacter from "./SelectingCharacter";
import Submitting from "./Sumbitting";

// Submitting actor stage could be renamed to selecting character

export default function ChooseCastMember({
  ActorId,
  id,
  PlayedCharacter,
  InitialPopupStage,
  top,
  left
}: ChooseCastMemberPopupProps): JSX.Element {
  const PopupStageRequirements: readonly boolean[][] = [[], [ActorId !== undefined], [ActorId !== undefined, PlayedCharacter !== undefined]];
  const [chosenActorId, setChosenActorId] = useState(0);
  const [chosenCharacter, setChosenCharater] = useState('');

  const [currentPopupStage, setCurrentPopupStage] = useState(InitialPopupStage);
  const getActorLocalStorageName = () => {
    const IfCurrentTitleNew = IsTitlePageNew();

    return IfCurrentTitleNew.isNew
      ? `draft-new-title-actor-${id}`
      : `draft-edit-${IfCurrentTitleNew.titleId}-title-actor-${id}`;
  };

  const deleteCurrentActorFromLocalStorage = () => {
    window.localStorage.removeItem(getActorLocalStorageName());
  };

  const saveCurrentActorToLocalStorage = () => {
    if (currentPopupStage < PopupStages.Submitted) return;

    window.localStorage.setItem(getActorLocalStorageName(), JSON.stringify({
      ActorId: chosenActorId, Character: chosenCharacter
    }))
  }

  const PopupStageNavigation = (direction: 'toPrev' | 'toNext') => {
    const element = document.getElementById(`ChooseActorPopup${id}`);

    if(direction === 'toPrev' && currentPopupStage === 0) {
        element?.classList.remove("Active");
        return;
    }

    if(direction === 'toNext' && currentPopupStage === PopupStages.Submitted) {
      saveCurrentActorToLocalStorage();
      element?.classList.remove("Active");
      return;
    }

    setCurrentPopupStage(val => direction === 'toPrev' ? val - 1 : val + 1)
  }

  const  checkPopupStageRequirements = (checkingStage: PopupStages) =>  !!PopupStageRequirements[checkingStage].filter(val => !val).length;
  
  useEffect(() => {
    // const ActorSearch = document.querySelector('.ChooseActorPopup > input#ActorSearch') as HTMLInputElement;
    if (currentPopupStage <= PopupStages.ChoosingActor) return;

    window.localStorage.setItem(
      getActorLocalStorageName(),
      JSON.stringify({
        ActorId,
        PlayedCharacter,
      })
    );
  });

  return (
  <div className="ChooseActorPopup ChoosingActor" id={`ChooseActorPopup${id}`} style={{ left }}>
        
        {currentPopupStage === PopupStages.ChoosingActor && <ChoosingActor/>}
      {currentPopupStage === PopupStages.SelectingCharacter && <SelectingCharacter ActorId={ActorId ?? 0}/>}
      {currentPopupStage === PopupStages.Submitted && <Submitting ActorId={ActorId ?? 0} Character={PlayedCharacter ?? ''}/>}
        <div className="Arrow-navigation">
   <button id="back" 
       disabled={currentPopupStage === 0 ? false : checkPopupStageRequirements(currentPopupStage - 1)} 
       onClick={() => PopupStageNavigation('toPrev')}
       >
       {currentPopupStage === 0 ? "Cancel": "Back"}
     </button> 
   <button id="next" 
       disabled={currentPopupStage === PopupStages.Submitted ? false : checkPopupStageRequirements(currentPopupStage + 1)} 
       onClick={() => PopupStageNavigation('toNext')}>
       {currentPopupStage === PopupStages.Submitted ? "Submit": "Next"}
   </button>
   </div>
  </div>
  );
}
