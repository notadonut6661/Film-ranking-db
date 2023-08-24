import { FunctionComponent } from "react";
import FilterTagMultipleChoices from "./FilterTagChoiceList";
import FilterTagRange from "./FilterTagRange";

interface FilterProps {
  FilterTags: Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>
}
 
const Filter: FunctionComponent<FilterProps> = ({FilterTags}) => {
  return (<div id="filters">{
    FilterTags.map(({name, type, options}) => {
      switch (type) {
      case "multiple_choices":
        return <FilterTagMultipleChoices name={name} options={options ?? [  ]}/>
      
      case "range":
        return <FilterTagRange name={""} />
      
      default: 
       return <p></p>
    }
  })  
  }</div>);
}
 
export default Filter;