import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import CarouselForAddingActors from "./addActorCarousel";
import "./style.scss";

export default function GUIForAddingToDB(): JSX.Element {
  return (
    <>
      <div className="body" id="Add">
        <div className="Enters">
          <div className="TextForm" id="Title">
            <input type={"text"} placeholder="Enter Title" maxLength={50}></input>
          </div>
          <select onChange={(ev) => {
          console.log(document.querySelector('select')?.value)
        }}>
            <option value="Film">Film</option>
            <option value="Series">Series</option>
          </select>
          <div className="TextForm" id="Plot">
            <textarea maxLength={512}></textarea>
          </div>
          
        </div>
        <CarouselForAddingActors/>
        <input type="button"  value={"Submit"} />
      </div>

      <Footer></Footer>
      <Navbar></Navbar>
    </>
  );
}
