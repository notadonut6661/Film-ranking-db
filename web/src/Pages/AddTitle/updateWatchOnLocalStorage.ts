import { getLocalStorageName } from "./getLocalStorageName";

export default function updateWatchOnLocalStorage(name: string, isOnService: boolean, url: string): void {
  if (window.localStorage.getItem(getLocalStorageName("WatchOn")) === null) {
    window.localStorage.setItem(getLocalStorageName("WatchOn"), JSON.stringify({}));
  }
  
  const prevWatchOn = JSON.parse(window.localStorage.getItem(getLocalStorageName("WatchOn")) ?? '{}');
  const newWatchOn: Record<string, string> = { ...prevWatchOn };

  if (isOnService) {
    newWatchOn[name] = url;
  } else {
    delete newWatchOn[name];
  }

  window.localStorage.setItem(getLocalStorageName("WatchOn"), JSON.stringify(newWatchOn))
}