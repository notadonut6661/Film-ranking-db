import { FunctionComponent } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterTagChoiceListProps {
  options: Array<string>;
  name: string;
  button?: JSX.Element;
  searchBar?: JSX.Element;
}
 
const FilterTagChoiceList: FunctionComponent<FilterTagChoiceListProps> = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  return (<div className="filter-multiple-choices">
    <div className="filter-tag-name">{ props.name }</div>
    {props.options.map((el) => {
    return (<div onClick={() => setSearchParams(prev => {
      if ((prev.get(`filter-${props.name}`) ?? "").includes(el)) prev.set(`filter-${props.name}`, prev.get(`filter-${props.name}`)?.split('-').filter(v => v !== el).join('-') ?? "");
      else  prev.set(`filter-${props.name}`, `${prev.get(`filter-${props.name}`) ?? ""}-${el}`);
      return prev; 
    })}>
      <label className="filter-choice">{props.button ?? <input  type="checkbox"/>}<span>{el}</span></label>
    </div>)
  })}</div>);
}
 
export default FilterTagChoiceList; 