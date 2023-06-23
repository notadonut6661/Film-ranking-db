import Footer from "components/Footer";
import Navbar from "components/Navbar";
import { SettingBox } from "./SettingBox";
import './style.scss';

export default function Personal(): JSX.Element {
  return (<>
    <div className="body" id="Personal">
      <SettingBox id="AccountManagement" label="Account Management" settings={[{
        name: 'Name',
      }]}/>
      </div>
    <Navbar/>
    <Footer/>
  </>)
} 