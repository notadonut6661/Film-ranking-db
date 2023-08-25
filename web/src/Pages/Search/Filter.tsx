import { FunctionComponent, useCallback } from "react";
import FilterTagMultipleChoices from "./FilterTagChoiceList";
import FilterTagRange from "./FilterTagRange";

/**
 * FilterState - State that contains all the parameters of filtration, it will be filled by the component
 */
interface FilterProps {
  FilterTags: Array<{ variable_name: string; name: string; type: string; options?: Array<string>; }>;
  FilterState: Map<string, string | number>;
  FilteredItems: Array<Map<string, string | number>>;
  UpdateFilterFunction: React.Dispatch<React.SetStateAction<Map<string, string  | number>>>;
}
 
function Filter ({FilterTags, FilteredItems}: FilterProps) {
  const getFilteredItemVariable = useCallback((variableName: string) => {
    return FilteredItems.map((el) => {
      return Number(el.get(variableName) ?? 0);
    })
  }, [FilteredItems]);

  return (<div id="filters">{
    FilterTags.map(({variable_name: variableName, name, type, options}) => {
      switch (type) {
      case "multiple_choices":
        return <FilterTagMultipleChoices name={name} options={options ?? [  ]}/>
      
      case "range":
        return <FilterTagRange name={name} max={Math.max(...getFilteredItemVariable(variableName))} min={Math.min(...getFilteredItemVariable(variableName))}/>
      
      default: 
       return <p></p>
    }
  })  
  }</div>);
}
 
export default Filter;