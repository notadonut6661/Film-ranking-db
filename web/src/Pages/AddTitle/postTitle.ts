import { getLocalStorageName } from "./getLocalStorageName";
import config from '../../data/Json/config.json';

export default function postTitle(): void {
  function getPostData() {
    return {
      title: window.localStorage.getItem(getLocalStorageName('Title')),
      plot: window.localStorage.getItem(getLocalStorageName('Plot')),
      services: window.localStorage.getItem(getLocalStorageName('WatchOn')) 
    }
  }

  fetch(`${config.server_url}/film/`, {
    method: "POST", 
    mode: "cors", 
    cache: "no-cache", 
    credentials: "same-origin", 
    headers: {
      "Content-Type": "application/json",
       "Authorization": "Basic username:password", 
    },
    redirect: "follow", 
    referrerPolicy: "no-referrer",
    body: JSON.stringify(getPostData()), 
})
}
