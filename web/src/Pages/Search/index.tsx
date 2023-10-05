import { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import './style.scss';
import Navbar from "components/Navbar";
import config from "data/Json/config.json";
import filterConfig from "./filter_config.json";
import Filter from "./Filter/Filter";
import Footer from "components/Footer";
import { TileItem, TitleSize } from "./TitleItem/TitleItemFactory";
import { Title } from "./TitleItem/Title.interface";
import getFilteredItemsFromApi from "./getFilteredItemsFromApi";
import PageSelector from "./PageSelector";

interface SearchProps {
} 

const Search: FunctionComponent<SearchProps> = props => {
  const [filteredItems, setFilteredItems] = useState<Array<Title>>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  
  // useEffect(() => {
  //   getFilteredItemsFromApi<Title>(filter, "") 
  //   .then(setFilteredItems);
  // });

  return (<><div className="body" id="search">
  <Filter<Title> FilteredItemsState={filteredItems}  FilterTags={filterConfig as Array<{ variable_name: keyof Title; name: string; type: string; options?: Array<string>; }>}/>
  <div id="search-results">
    <div id="item-settings">
      <label>Sort Order</label>
      <select>
        {}
      </select>
      <>
        <label id="wide" className="radio">
        <input onClick={() => setSearchParams(prev => {
          prev.set('setViewMode', 'list');
          return prev;
        })} type="radio" name="item-size"/>
          <span  className={``}></span>
        </label>

        <label id="squares" className="radio" >
          <input onClick={() => setSearchParams(prev => {
          prev.set('setViewMode', 'block');
          return prev;
        })} id="" type="radio" name="item-size"/>
          <span  className={``}></span>
        </label>
      </>
    </div>
    <div id="items" className={`${searchParams.get('setViewMode')}`}>
      {filteredItems.map(el => <TileItem size={searchParams.get('setViewMode') === 'list' ? TitleSize.Small : TitleSize.Full} name={el.name} description={el.description} rating={el.rating} maturity={0} poster={new Blob()} teaser_youtube_id={el.teaser_youtube_id } />)}
    </div>
 <PageSelector totalPageNumber={Math.max(filteredItems.length / config.max_titles_on_page, 20)}/>
  </div>
  </div>
<Footer />
<Navbar/></>);
}
 
export default Search;
