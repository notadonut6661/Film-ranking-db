import { FunctionComponent, useCallback, useState } from "react";
import './style.scss';
import Navbar from "components/Navbar";
import config from "data/Json/config.json";
import x from "./Filter_Config.json";
import Filter from "./Filter/Filter";
import Footer from "components/Footer";
import { TileItem, TitleSize } from "./TitleItem/TitleItemFactory";
import { Title } from "./TitleItem/Title.interface";
import getFilteredItemsFromApi from "./getFilteredItemsFromApi";

interface SearchProps {
} 

const Search: FunctionComponent<SearchProps> = () => {
  const [filter, updateFilter] = useState<Map<string, number | string>>(new Map<string, number | string>());  

  return (<><div className="body" id="search">
  <Filter FilteredItems={[]} FilterState={filter} UpdateFilterFunction={updateFilter} FilterTags={x as Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>}/>
  <div>{getFilteredItemsFromApi<Title>().map(() => <TileItem size={TitleSize.Small} name={""} description={""} rating={0} maturity={0} poster={new Blob()} teaser_url={""} />)}</div>
  <div></div>
  </div>
<Footer />
<Navbar/></>);
}
 
export default Search;