export function getLocalStorageName(elementName: string) {
  return window.location.pathname.includes("add")
        ? `draft-new-title-${elementName}`
        : `draft-edit-${window.location.pathname.split("/")[1]}title-${elementName}`;
}
