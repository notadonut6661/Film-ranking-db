import { getLocalStorageName } from "./getLocalStorageName";
import config from 'data/Json/config.json';
import getActorsFromLocalStorage from "./getActorsFromLocalStorage";
import getActorLocalStorageName from "utils/getActorLocalStorageName";

export default function postTitle(): void {
  function getPostData() {
    return {
      title: window.localStorage.getItem(getLocalStorageName('Title')) ?? '',
      category: window.localStorage.getItem(getLocalStorageName('Category')) ?? 'Film',
      plot: window.localStorage.getItem(getLocalStorageName('Plot')) ?? '',
      services: window.localStorage.getItem('WatchOn')  ??  '{}',
      cast: getActorsFromLocalStorage()
    }
  }

  function deleteAllActorsFromDraft(): void {
    for (const el of config.title_data_type) {
      window.localStorage.removeItem(getLocalStorageName(el));
    }

    for (const i in getActorsFromLocalStorage()) {
      localStorage.removeItem(getActorLocalStorageName(Number(i)));
    }
  }

  const { category } = getPostData();

  fetch(`${config.server_url}/${category?.toLocaleLowerCase()}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(getPostData())
  }).then(res => res.json()).then(val => {
    deleteAllActorsFromDraft();
    window.location.href = `../`;
  }).catch(err => {
    console.warn(err);
  });
}
