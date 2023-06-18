import { getLocalStorageName } from "./getLocalStorageName";
import config from '../../data/Json/config.json';

export default function postTitle(): void {
  function getPostData() {
    return {
      title: window.localStorage.getItem(getLocalStorageName('Title')),
      plot: window.localStorage.getItem(getLocalStorageName('Plot')),
      services: window.localStorage.getItem('WatchOn') 
    }
  }

  console.log(JSON.stringify(getPostData()));
  
  fetch(`${config.server_url}/film/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({x: 11, b: 22})
  }).then(res => res.json()).then( val => {
    console.log(val);
    
  }).catch(err => console.warn(err));
}
