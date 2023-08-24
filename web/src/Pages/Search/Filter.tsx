import { FunctionComponent } from "react";
import FilterTagMultipleChoices from "./FilterTagChoiceList";
import FilterTagRange from "./FilterTagRange";

/**
 * FilterState - State that contains all the parameters of filtration, it will be filled by the component
 */
interface FilterProps<FS={}> {
  FilterTags: Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>;
  FilterState: FS;
  FilteredItems: Array<unknown>;
  UpdateFilterFunction: React.Dispatch<React.SetStateAction<FS>>;
}
 
function Filter<FS={}> ({FilterTags}: FilterProps<FS>) {
  return (<div id="filters">{
    FilterTags.map(({name, type, options}) => {
      switch (type) {
      case "multiple_choices":
        return <FilterTagMultipleChoices name={name} options={options ?? [  ]}/>
      
      case "range":
        return <FilterTagRange name={name} />
      
      default: 
       return <p></p>
    }
  })  
  }</div>);
}
 
export default Filter;