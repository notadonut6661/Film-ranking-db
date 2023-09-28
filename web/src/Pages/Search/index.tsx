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
import PageSelector from "./PageSelector";

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
    teaser_youtube_id: "jTx5c-2QOXc",
  },{
    name: "Example Movie",
    description: "Kazakh TV talking head Borat is dispatched to the United States to report on the greatest country in the world. With a documentary crew in tow, Borat becomes more interested in locating and marrying Pamela Anderson.",
    rating: 5,
    maturity: 13,
    poster: new Blob(), // Placeholder for the poster image 
    teaser_youtube_id: "https://example.com/teaser.mp4",
  },{
    name: "Example Movie",
    description: "A young guy went to 1960s after dr. Emmet Brown has been killed by terrorists. And then his mother falls in love with him. He has to bring her and his dad together to continue living, and also he has to get back in 1980s, but time machine has no fuel.\n",
    rating: 5,
    maturity: 13,
    poster: new Blob(), // Placeholder for the poster image 
    teaser_youtube_id: "https://example.com/teaser.mp4",
  }, {
    name: "Example Movie",
    description: "This is an example movie description.",
    rating: 5.75,
    maturity: 13,
    poster: new Blob(), // Placeholder for the poster image 
    teaser_youtube_id: "https://example.com/teaser.mp4",
  }]);
  
  const [areItemsWide, setAreItemsWide] = useState(false);
  const [sortBy, setSortBy] = useState<[keyof Title, 'asc' | 'desc'] | null>(null);

  useEffect(() => {
    // getFilteredItemsFromApi<Title>(filter, "") 
    // .then(res => setFilteredItems(res));
  });

  return (<><div className="body" id="search">
  <Filter<Title> FilteredItemsState={filteredItems} FilterState={filter} UpdateFilterFunction={updateFilter} FilterTags={x as Array<{ variable_name: keyof Title; name: string; type: string; options?: Array<string>; }>}/>
  <div id="search-results">
    <div id="item-settings">
      <label>Sort Order</label>
      <select>
        {}
      </select>
      <>
        <label id="wide" className="radio">
        <input onClick={() => setAreItemsWide(true)} type="radio" name="item-size"/>
          <span  className={``}></span>
        </label>

        <label id="squares" className="radio" >
          <input onClick={() => setAreItemsWide(false)} id="" type="radio" name="item-size"/>
          <span  className={``}></span>
        </label>
      </>
    </div>
    <div id="items" className={`${areItemsWide ? "wide" : ""}`}>
      {filteredItems.map(el => <TileItem size={areItemsWide ? TitleSize.Small : TitleSize.Full} name={el.name} description={el.description} rating={el.rating} maturity={0} poster={new Blob()} teaser_youtube_id={el.teaser_youtube_id } />)}
    </div>
 <PageSelector totalPageNumber={filteredItems.length / 25}/>
  </div>
  </div>
<Footer />
<Navbar/></>);
}
 
export default Search;
