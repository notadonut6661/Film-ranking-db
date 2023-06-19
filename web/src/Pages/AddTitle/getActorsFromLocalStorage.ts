import CastElement from "../../data/Interfaces/castElement.interface";
import IsTitlePageNew from "../../utils/GetIsTitlePageNew";

export default function getActorsFromLocalStorage(): CastElement[] {
  const getActorLocalStorageNameTemplate = () => {
    return IsTitlePageNew() ? "draft-new-title-actor" : `draft-${IsTitlePageNew().titleId}-title-actor`
  }

  return Object.entries(localStorage).filter(([key]) => key.includes(getActorLocalStorageNameTemplate())).map(([, value]) => JSON.parse(value)) as CastElement[];
}
