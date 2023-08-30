import { FunctionComponent, useState } from "react";
import './style.scss';
import Navbar from "components/Navbar";
import x from "./Filter_Config.json";
import Filter from "./Filter/Filter";
import Footer from "components/Footer";
import { getFilteredItemsFromApi } from "./getFilteredItemsFromApi";
import { TileItem, TitleSize } from "./TitleItem/TitleItemFactory";

interface SearchProps {
}
const Search: FunctionComponent<SearchProps> = () => {
  const [filter, updateFilter] = useState<Map<string, number | string>>(new Map<string, number | string>());


  return (<><div className="body" id="search">
  <Filter FilteredItems={[]} FilterState={filter} UpdateFilterFunction={updateFilter} FilterTags={x as Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>}/>
  <div>{getFilteredItemsFromApi<number>().map(() => <TileItem size={TitleSize.Small} name={""} description={""} rating={0} maturity={0} poster={new Blob()} teaser_url={""} />)}</div>
  <div></div>
  </div>
<Footer />
<Navbar/></>);
}
 
export default Search;