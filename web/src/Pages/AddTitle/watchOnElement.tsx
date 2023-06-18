import { useState } from "react";
import updateWatchOnLocalStorage from "./updateWatchOnLocalStorage";

interface WatchOnElementProps {
  name: string;
  serviceDomain?: string;
}

export default function WatchOnElement({ name, serviceDomain = "https://wikipedia.org", }: WatchOnElementProps): JSX.Element {
  const [isOnService, setIsOnService] = useState(false);
  const [linkToTitleVal, setLinkToTitleVal] = useState(serviceDomain);

  const checkboxClickHandler = () => {
    updateWatchOnLocalStorage(name, !isOnService, linkToTitleVal);

    setIsOnService((val) => !val);    
  } 
  
  const linkToTitleChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => { 
    setLinkToTitleVal(ev.target.value);
    updateWatchOnLocalStorage(name, isOnService, ev.target.value);
  }

  return (
    <div>
      <input type="checkbox" onClick={checkboxClickHandler} />
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
