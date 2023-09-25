import { FunctionComponent } from "react";

interface FilterTagChoiceListProps {
  options: Array<string>;
  name: string;
  button?: JSX.Element;
  searchBar?: JSX.Element;
}
 
const FilterTagChoiceList: FunctionComponent<FilterTagChoiceListProps> = props => {
  return (<div className="filter-multiple-choices">
    <div className="filter-tag-name">{ props.name }</div>
    {props.options.map((el) => {
    return (<div>
      <label className="filter-choice">{props.button ?? <input  type="checkbox"/>}<span>{el}</span></label>
      </div>)
  })}</div>);
}
 
export default FilterTagChoiceList; 