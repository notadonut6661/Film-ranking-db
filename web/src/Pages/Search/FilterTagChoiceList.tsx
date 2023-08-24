import { FunctionComponent } from "react";

interface FilterTagChoiceListProps {
  options: Array<string>;
  name: string;
  button?: FunctionComponent;
}
 
const FilterTagChoiceList: FunctionComponent<FilterTagChoiceListProps> = ({options, name}) => {
  return (<div className="filter-multiple-choices">
    <span className="filter-tag-name">{ name }</span>
    {options.map((el) => {
    return (<div>
      <label className="filter-choice"><input  type="checkbox"/><span>{el}</span></label>
      </div>)
  })}</div>);
}
 
export default FilterTagChoiceList; 