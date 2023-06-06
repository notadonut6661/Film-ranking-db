export default function IsTitlePageNew() {
  // FIXME use config
  return window.location.pathname.includes('add') ? {
    isNew: true
  }: {
    isNew: false, 
    titleId: window.location.pathname.split('/')[1]
  }
}
