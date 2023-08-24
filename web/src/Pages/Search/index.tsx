import { FunctionComponent, useState } from "react";
import './style.scss';
import Navbar from "components/Navbar";
import x from "./Filter_Config.json";
import Filter from "./Filter";

interface SearchProps {
}
const Search: FunctionComponent<SearchProps> = () => {
  const [filter, updateFilter] = useState<Record<string, any>>({});


  return (<><div className="body" id="search">
  <Filter<{}> FilterState={filter} UpdateFilterFunction={updateFilter} FilterTags={x as Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>}/>
  <div></div>
  <div></div>
  </div>
<Navbar/></>);
}
 
export default Search;