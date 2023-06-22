import { getLocalStorageName } from "./getLocalStorageName";
import config from '../../data/Json/config.json';
import getActorsFromLocalStorage from "./getActorsFromLocalStorage";
import getActorLocalStorageName from "../../utils/getActorLocalStorageName";

export default function postTitle(): void {
  function getPostData() {
    return {
      title: window.localStorage.getItem(getLocalStorageName('Title')),
      category: window.localStorage.getItem(getLocalStorageName('Category')),
      plot: window.localStorage.getItem(getLocalStorageName('Plot')),
      services: window.localStorage.getItem('WatchOn'),
      cast: getActorsFromLocalStorage()
    }
  }

  const { category } = getPostData();

  function deleteAllActorsFromDraft() {
    for (const i in getActorsFromLocalStorage()) {
      localStorage.removeItem(getActorLocalStorageName(Number(i)));
    }
  }

  console.log(getActorsFromLocalStorage());

  fetch(`${config.server_url}/${category?.toLocaleLowerCase()}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getPostData())
  }).then(res => res.json()).then(val => {
    console.log(val);

  }).catch(err => {
    console.warn(err);
    deleteAllActorsFromDraft();
  });
}
