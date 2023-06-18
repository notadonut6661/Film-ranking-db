import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ActorCarousel from "../../components/ActorCarousel";
import "./style.scss";
import { useEffect } from "react";
import WatchOn from "./watchOn";
import { getLocalStorageName } from "./getLocalStorageName";
import postTitle from "./postTitle";

//FIXME It's actually add&edit title, name doesn't correctly tells purposes of function
export default function AddTitle(): JSX.Element {
  const saveFormDataToLocalStorage = (CurrentFormData: {
    Title?: string;
    Category?: string;
  }): void => {
    Object.entries(CurrentFormData).forEach(([key, value]) => {
      // FIXME move to function
      window.localStorage.setItem(getLocalStorageName(key), value);
    });
  };

  useEffect(() => {
    let Title = document.getElementById("TitleInputEl") as HTMLInputElement;
    let Category = document.getElementById("Category") as HTMLSelectElement;

    Title.addEventListener("change", () => {
      saveFormDataToLocalStorage({
        Title: Title.value,
      });
    });

    Category.addEventListener("change", () => {
      saveFormDataToLocalStorage({
        Category: Category.value,
      });
    });
  });
  // FIXME maxLength of 512 is obviously belongs to magic number anti-pattern, it has to be moved to config
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
              ></input>
            </div>
            <select
              id="Category"
              onChange={() => {
                console.log(document.querySelector("select")?.value);
              }}
            >
              <option value="Film">Film</option>
              <option value="Series">Series</option>
            </select>
            <textarea maxLength={512} className="TextForm" id="Plot"></textarea>
          </div>
          <ActorCarousel EditMode={true} />
          <input type="button" value={"Submit"} className="Submit" onClick={postTitle}/>
        </div>
        <WatchOn/>
      </div>
      <Footer></Footer>
      <Navbar></Navbar>
    </>
  );
}
