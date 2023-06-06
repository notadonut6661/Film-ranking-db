import { PopupStages } from "../PopupStages.enum";

export interface ChooseCastMemberPopupProps {
  InitialPopupStage: PopupStages;
  id: number;
  top: string;
  left: string;
  PlayedCharacter?: string;
  ActorId?: number;
}
