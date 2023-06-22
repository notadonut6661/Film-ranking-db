import { useEffect, useState } from "react";
import updateWatchOnLocalStorage from "./updateWatchOnLocalStorage";
import { getLocalStorageName } from "./getLocalStorageName";

interface WatchOnElementProps {
  name: string;
  serviceDomain?: string;
}

export default function WatchOnElement({ name, serviceDomain = "https://wikipedia.org", }: WatchOnElementProps): JSX.Element {
  const savedLinkToService = JSON.parse(localStorage.getItem(getLocalStorageName("WatchOn")) ?? '{}')[name];
  const [isOnService, setIsOnService] = useState(false);
  const [linkToTitleVal, setLinkToTitleVal] = useState(savedLinkToService ?? serviceDomain);
  
  const checkboxClickHandler = () => {
    updateWatchOnLocalStorage(name, !isOnService, linkToTitleVal);
    setIsOnService((val) => !val);    
  } 
  
  const linkToTitleChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => { 
    setLinkToTitleVal(ev.target.value);
    updateWatchOnLocalStorage(name, isOnService, ev.target.value);
  }

  useEffect(() => {
    if (savedLinkToService) setIsOnService(true);
  }, [savedLinkToService]);

  return (
    <div>
      <input type="checkbox" onClick={checkboxClickHandler} checked={isOnService}/>
      <input
        type="url"
        className="linkToTitle"
        placeholder={name}
        disabled={!isOnService}
        value={isOnService ? linkToTitleVal : ""}
        onChange={linkToTitleChangeHandler}
      />
    </div>
  );
}
