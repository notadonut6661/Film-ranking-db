import PostersPopupTrigger from "./postersPopupTrigger";
import posterData from '../../data/Interfaces/posterData.interface';
import setNewImageToCropTools from "../../components/CropPopup/setNewImageToCropTools";
import PosterCropPopup from "../../components/CropPopup/PosterCropPopup";

interface PosterProps {
  addedPosters: posterData[];
  updateAddedPosters: React.Dispatch<React.SetStateAction<posterData[]>>;
}

export default function Poster({addedPosters, updateAddedPosters}: PosterProps): JSX.Element {

  const getAllElements = () => {
    const maxShowLength = 3;
    return [...addedPosters.slice(0, maxShowLength), {src: "", isAddButton: true}];
  }

  const fileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file === undefined) return;

    setNewImageToCropTools(file);
    // updateAddedPosters(prev => [...prev,  {src: urlToPoster, isAddButton: false} ] as posterData[]);
  }

  return (<>
  <ul className="add-title-poster">
    {getAllElements().map(({src, isAddButton}, index) => {
      return <li className={isAddButton ? "add-poster-button" : "poster"}>
          {isAddButton && <label><input type="file" onInput={(fileInputHandler)} accept="image/png, image/jpeg" /></label>}
          {isAddButton || <PostersPopupTrigger index={index} src={src}/>}
      </li>;
    })}
  </ul>
  </>);
}
