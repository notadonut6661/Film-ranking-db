import Navbar from "../../components/Navbar";
import ContentRow from "./contentRow";

export default function Home(): JSX.Element {
  return (
    <>
      <Navbar />
      <ContentRow title="Coming soon" request_uri="" elementsQuantity={5} />
    </>
  );
}
