import { FunctionComponent, useCallback, useEffect, useState } from "react";
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

const Search: FunctionComponent<SearchProps> = props => {
  const [filter, updateFilter] = useState(new Map<keyof Title, [number, number] | string | null>());  
  const [filteredItems, setFilteredItems] = useState<Array<Title>>([{
    name: "Example Movie",
    description: "This is an example movie description.",
    rating: 5,
    maturity: 13,
    poster: new Blob(), // Placeholder for the poster image 
    teaser_youtube_id: "https://example.com/teaser.mp4",
  },{
    name: "Example Movie",
    description: "This is an example movie description.",
    rating: 5,
    maturity: 13,
    poster: new Blob(), // Placeholder for the poster image 
    teaser_youtube_id: "https://example.com/teaser.mp4",
  }]);
  
  useEffect(() => {
    // getFilteredItemsFromApi<Title>(filter, "") 
    // .then(res => setFilteredItems(res));
  });

  return (<><div className="body" id="search">
  <Filter<Title> FilteredItemsState={filteredItems} FilterState={filter} UpdateFilterFunction={updateFilter} FilterTags={x as Array<{ variable_name: keyof Title; name: string; type: string; options?: Array<string>; }>}/>
  <div id="search-results">
    <div id="item-settings">
      <label>Sort Order</label>
      <select></select>
      <>
        <label>
          <input id=""type="radio" name="item-size"/>
          <span  className={``}></span>
        </label>
        <label>
          <input id="" type="radio" name="item-size"/>
          <span  className={``}></span>
        </label>
      </>
    </div>
    <div id="items">
      {filteredItems.map(el => <TileItem size={TitleSize.Full} name={el.name} description={el.description} rating={el.rating} maturity={0} poster={new Blob()} teaser_youtube_id={""} />)}
    </div>
  </div>
  <div></div>
  </div>
<Footer />
<Navbar/></>);
}
 
export default Search;
