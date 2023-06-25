import { useState } from "react";
import PostersPopupTrigger from "./postersPopupTrigger";

interface posterData {
  src: "";
  isAddButton: boolean;
}

export default function AddTitlePoster(): JSX.Element {
  const [addedPosters, updateAddedPosters] = useState<posterData[]>([]);
  const popupActivated = useState(false);

  const getAllElements = () => {
    const maxShowLength = popupActivated ? null : 3;
    return [...(addedPosters.slice(0, maxShowLength || undefined)), {src: "", isAddButton: true}];
  }

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.error(11);
    
    const file = e.target.files?.[0];

    if (file === undefined) return;

    const urlToPoster = URL.createObjectURL(file);
    updateAddedPosters(prev => [...prev,  {src: String(urlToPoster), isAddButton: false} ] as posterData[]);
  }

  return (<ul className="add-title-poster">
    {getAllElements().map(({src, isAddButton}, index) => {
      return <li className={isAddButton ? "add-poster-button" : "poster"}>
          {isAddButton && <label><input type="file" onInput={(fileInputHandler)}/></label>}
          {isAddButton || <PostersPopupTrigger index={index} src={src}/>}
      </li>;
    })}
  </ul>);
}
