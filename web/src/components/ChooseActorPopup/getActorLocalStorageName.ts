import IsTitlePageNew from "../../utils/GetIsTitlePageNew";

export default function getActorLocalStorageName(id: number) {
  const IfCurrentTitleNew = IsTitlePageNew();

  return IfCurrentTitleNew.isNew
    ? `draft-new-title-actor-${id}`
    : `draft-edit-${IfCurrentTitleNew.titleId}-title-actor-${id}`;
}
