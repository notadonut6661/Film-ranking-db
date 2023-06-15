import { useState, useEffect } from "react";
import "./style.scss";
import { ChooseCastMemberPopupProps } from "../../data/Interfaces/ChooseActorPopupProps.interface";
import { PopupStages } from "../../data/PopupStages.enum";
import ChoosingActor from "./ChoosingActor";
import SelectingCharacter from "./SelectingCharacter";
import Submitting from "./Submitting";
import PopupStageNavigation from "./PopupStageNavigation";
import getActorLocalStorageName from "./getActorLocalStorageName";

export default function ChooseCastMember({
  ActorId, id, PlayedCharacter,
  InitialPopupStage, top, left
}: ChooseCastMemberPopupProps): JSX.Element {
  const PopupStageRequirements: readonly boolean[][] = [[], [ActorId !== undefined], [ActorId !== undefined, PlayedCharacter !== undefined]];
  const [chosenActorId, setChosenActorId] = useState(0);
  const [chosenCharacter, setChosenCharater] = useState('');

  const [currentPopupStage, setCurrentPopupStage] = useState(InitialPopupStage);

  const deleteCurrentActorFromLocalStorage = () => {
    window.localStorage.removeItem(getActorLocalStorageName(id));
  };


  return (
  <div className={`ChooseActorPopup ${PopupStages[InitialPopupStage]}`} id={`ChooseActorPopup${id}`} style={{ left }}>

      {currentPopupStage === PopupStages.ChoosingActor && <ChoosingActor ActorId={ActorId} PopupId={id}/>}
      {currentPopupStage === PopupStages.SelectingCharacter && <SelectingCharacter PopupId={id} />}
      {currentPopupStage === PopupStages.Submitted && <Submitting  PopupId={id}/>}
        
        <PopupStageNavigation PopupId={id} currentPopupStage={currentPopupStage} setCurrentPopupStage={setCurrentPopupStage} CastElement={{ActorId, Character: PlayedCharacter}} PopupStageRequirements={PopupStageRequirements}/>
  </div>
  );
}
