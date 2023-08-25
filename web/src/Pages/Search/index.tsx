import { FunctionComponent, useState } from "react";
import './style.scss';
import Navbar from "components/Navbar";
import x from "./Filter_Config.json";
import Filter from "./Filter";
import Footer from "components/Footer";

interface SearchProps {
}
const Search: FunctionComponent<SearchProps> = () => {
  const [filter, updateFilter] = useState<Map<string, number | string>>(new Map<string, number | string>());


  return (<><div className="body" id="search">
  <Filter FilteredItems={[]} FilterState={filter} UpdateFilterFunction={updateFilter} FilterTags={x as Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>}/>
  <div></div>
  <div></div>
  </div>
<Footer />
<Navbar/></>);
}
 
export default Search;