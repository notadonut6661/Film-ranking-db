import { FunctionComponent } from "react";

interface FilterTagRangeProps {
  name: string;
}


const FilterTagRange: FunctionComponent<FilterTagRangeProps> = ({name}) => {
  return <div><input type="range"/><input type="range"/></div>;
}


export default FilterTagRange;