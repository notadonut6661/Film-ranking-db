import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import ContentRow from "./contentRow";
import "./style.scss";

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <div className="body" id="Home">
        <ContentRow title="Coming soon" request_uri="" />
        <ContentRow title="Films and series for you" request_uri="" />
      </div>
      <Footer />
    </>
  );
}
