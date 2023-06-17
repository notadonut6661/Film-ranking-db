import { useState  } from "react";
import "./style.scss";
import { ChooseCastMemberPopupProps } from "../../data/Interfaces/ChooseActorPopupProps.interface";
import { PopupStages } from "../../data/PopupStages.enum";
import ChoosingActor from "./ChoosingActor";
import SelectingCharacter from "./SelectingCharacter";
import Submitting from "./Submitting";
import PopupStageNavigation from "./PopupStageNavigation";
import getActorLocalStorageName from "./getActorLocalStorageName";
import CastElement from "../../data/Interfaces/castElement.interface";

export default function ChooseCastMember({
  ActorId, id, PlayedCharacter,
  InitialPopupStage, top, left
}: ChooseCastMemberPopupProps): JSX.Element {
  const {ActorId: InitialActorId, Character: InitialCharacter} = JSON.parse(window.localStorage.getItem(getActorLocalStorageName(id)) ?? '{}') as CastElement;

  const [chosenActorId, setChosenActorId] = useState(InitialActorId ?? 0);
  const [chosenCharacter, setChosenCharacter] = useState(InitialCharacter ?? '');
  
  const PopupStageRequirements = (): readonly boolean[][] => [[], [chosenActorId !== 0], [chosenActorId !== 0, chosenCharacter !== '']];

  console.log(PopupStageRequirements(), InitialActorId);
  
  const [currentPopupStage, setCurrentPopupStage] = useState(InitialPopupStage);
  


  return (
  <div className={`ChooseActorPopup ${PopupStages[InitialPopupStage]}`} id={`ChooseActorPopup${id}`} style={{ left }}>

      {currentPopupStage === PopupStages.ChoosingActor && <ChoosingActor ActorId={ActorId} PopupId={id} SetActorState={setChosenActorId}/>}
      {currentPopupStage === PopupStages.SelectingCharacter && <SelectingCharacter PopupId={id} SetCharacterState={setChosenCharacter}/>}
      {currentPopupStage === PopupStages.Submitted && <Submitting  PopupId={id}/>}
        
        <PopupStageNavigation PopupId={id} currentPopupStage={currentPopupStage} setCurrentPopupStage={setCurrentPopupStage} CastElement={{ActorId, Character: PlayedCharacter}} PopupStageRequirements={PopupStageRequirements()}/>
  </div>
  );
}
