import IsTitlePageNew from "./GetIsTitlePageNew";

export default function getActorLocalStorageName(id: number) {
  return IsTitlePageNew().isNew
    ? `draft-new-title-actor-${id}`
    : `draft-edit-${IsTitlePageNew().titleId}-title-actor-${id}`;
}
