export default function IsTitlePageNew() {
  return window.location.pathname.includes('add') ? {
    isNew: true
  }: {
    isNew: false, 
    titleId: window.location.pathname.split('/')[1]
  }
}
