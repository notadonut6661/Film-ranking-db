import Footer from "components/Footer";
import Navbar from "components/Navbar";
import ActorCarousel from "components/ActorCarousel";
import "./style.scss";
import { useEffect, useState } from "react";
import WatchOn from "./watchOn";
import { getLocalStorageName } from "./getLocalStorageName";
import postTitle from "./postTitle";
import Poster from "./Poster";
import posterData from "data/Interfaces/posterData.interface";
import PosterCropPopup from "../../components/CropPopup/PosterCropPopup";

export default function AddTitle(): JSX.Element {
  const [titleValue, setTitleValue] = useState(localStorage.getItem(getLocalStorageName('Title')) ?? '');
  const [categoryValue, setCategoryValue] = useState(localStorage.getItem(getLocalStorageName('Category')) ?? '' );
  const [plotValue, setPlotValue] = useState(localStorage.getItem(getLocalStorageName('Plot')) ?? '' );
  const [addedPosters, updateAddedPosters] = useState<posterData[]>([]);

  const saveFormDataToLocalStorage = (CurrentFormData: {
    Title?: string;
    Category?: string;
    Plot?: string;
  }): void => {
    Object.entries(CurrentFormData).forEach(([key, value]) => {
      // FIXME move to function
      window.localStorage.setItem(getLocalStorageName(key), value);
    });
  };

  useEffect(() => {
    let Title = document.getElementById("TitleInputEl") as HTMLInputElement;
    let Category = document.getElementById("Category") as HTMLSelectElement;
    let Plot = document.getElementById("Plot") as HTMLTextAreaElement;

    Title.addEventListener("change", () => {
      saveFormDataToLocalStorage({
        Title: Title.value,
      });
      localStorage.setItem(getLocalStorageName('Title'), Title.value)

    });

    Category.addEventListener("change", () => {
      saveFormDataToLocalStorage({
        Category: Category.value,
      });
      
      localStorage.setItem(getLocalStorageName('Category'), Category.value)
    });

    Plot.addEventListener("change", () => {
      saveFormDataToLocalStorage({
        Category: Category.value,
      });

      localStorage.setItem(getLocalStorageName('Plot'), Plot.value)
    });
  });

  // FIXME maxLength of 512 obviously belongs to magic number anti-pattern and has to be moved to config
  return (
    <>
      <div className="body" id="Add">
        <div className="film-data">
          <div className="Enters">
            <div className="TextForm" id="Title">
              <input
                type={"text"}
                placeholder="Enter Title"
                maxLength={50}
                id="TitleInputEl"
                value={titleValue}
                onChange={ev => {
                  setTitleValue(ev.target.value);
                }}
              ></input>
            </div>
            <select
              id="Category"
              value={categoryValue}
              onChange={ev => {
                setCategoryValue(ev.target.value);
                console.log(document.querySelector("select")?.value);
              }}
            >
              <option value="Film">Film</option>
              <option value="Series">Series</option>
            </select>
            <Poster addedPosters={addedPosters} updateAddedPosters={updateAddedPosters}/>
            <textarea maxLength={512} className="TextForm" id="Plot" value={plotValue} onChange={ev => {
                setPlotValue(ev.target.value);
            }}></textarea>
          </div>
          <ActorCarousel EditMode={true} />
          <input type="button" value={"Submit"} className="Submit" onClick={postTitle}/>
        </div>
        <div>
          <WatchOn/>
        </div>
      </div>
      <PosterCropPopup />
      <Footer></Footer>
      <Navbar></Navbar>
    </>
  );
}
