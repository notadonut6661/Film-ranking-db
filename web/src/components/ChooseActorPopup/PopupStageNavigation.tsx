import CastElement from "../../data/Interfaces/castElement.interface";
import { PopupStages } from "../../data/PopupStages.enum";
import saveCurrentActorToLocalStorage from "./saveCurrentActorToLocalStorage";
import "./style.scss";


interface PopupStageNavigationProps {
  PopupId: number;
  currentPopupStage: PopupStages;
  setCurrentPopupStage: React.Dispatch<React.SetStateAction<PopupStages>>;
  PopupStageRequirements: readonly boolean[][];
  CastElement: CastElement;

}

export default function PopupStageNavigation({currentPopupStage, PopupId, setCurrentPopupStage, PopupStageRequirements, CastElement}: PopupStageNavigationProps):  JSX.Element {

  const  checkPopupStageRequirements = (checkingStage: PopupStages) =>  !!PopupStageRequirements[checkingStage].filter(val => !val).length;
  
  const ChangePopupStage = (direction: 'toPrev' | 'toNext') => {
    const element = document.getElementById(`ChooseActorPopup${PopupId}`);

    if(direction === 'toPrev' && currentPopupStage === 0) {
        element?.classList.remove("Active");
        return;
    }

    if(direction === 'toNext' && currentPopupStage === PopupStages.Submitted) {
      saveCurrentActorToLocalStorage(currentPopupStage, PopupId, CastElement);
      element?.classList.remove("Active");
      return;
    }

    setCurrentPopupStage(val => direction === 'toPrev' ? val - 1 : val + 1)
  }

  return (<div className="popup-stage-navigation">
  <button id="back" 
      disabled={currentPopupStage === 0 ? false : checkPopupStageRequirements(currentPopupStage - 1)} 
      onClick={() => ChangePopupStage('toPrev')}
      >
      {currentPopupStage === 0 ? "Cancel": "Back"}
    </button> 
  <button id="next" 
      disabled={currentPopupStage === PopupStages.Submitted ? false : checkPopupStageRequirements(currentPopupStage + 1)} 
      onClick={() => ChangePopupStage('toNext')}>
      {currentPopupStage === PopupStages.Submitted ? "Submit": "Next"}
  </button>
  </div>)
}