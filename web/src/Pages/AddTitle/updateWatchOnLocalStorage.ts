export default function updateWatchOnLocalStorage(name: string, isOnService: boolean, url: string): void {
  if (window.localStorage.getItem('WatchOn') === null) window.localStorage.setItem('WatchOn', JSON.stringify({}));
  
  const prevWatchOn = JSON.parse(window.localStorage.getItem("WatchOn") ?? '{}');
  const newWatchOn: Record<string, string> = { ...prevWatchOn };

  if (isOnService) {
    newWatchOn[name] = url;
  } else {
    delete newWatchOn[name];
  }

  window.localStorage.setItem("WatchOn", JSON.stringify(newWatchOn))
}