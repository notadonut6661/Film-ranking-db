import { FunctionComponent } from "react";
import './style.scss';
import Navbar from "components/Navbar";
import x from "./Filter_Config.json";

interface SearchProps {
}
const Search: FunctionComponent<SearchProps> = () => {
  return (<><div className="body" id="search">
  <div id="filters">{
    x.map(({name}) => <p>{name}</p>)
  }</div>
  <div></div>
  <div></div>
  </div>
<Navbar/></>);
}
 
export default Search;