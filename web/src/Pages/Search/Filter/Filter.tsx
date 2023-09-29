import { FunctionComponent, useCallback } from "react";
import FilterTagMultipleChoices from "./FilterTagChoiceList";
import FilterTagRange from "./FilterTagRange";

/**
 * FilterState - State that contains all the parameters of filtration, it will be filled by the component
 */
interface FilterProps<T> {
  FilteredItemsState: Array<T>;
  FilterTags: Array<{ variable_name: keyof T; name: string; type: string; options?: Array<string>; }>;
}
 
function Filter<T>(props: FilterProps<T>) {
  const getFilteredItemProp = useCallback((variableName: keyof T) => {
    return props.FilteredItemsState.map((el) => {
      return Number(el[variableName] ?? 0);
    })
  }, [props.FilteredItemsState]);

  return (<div id="filters">{
    props.FilterTags.map(({variable_name: variableName, name, type, options}) => {
      switch (type) {
       case "multiple_choices":
        return <FilterTagMultipleChoices name={name} options={options ?? [  ]}/>
      
        case "range":
        return <FilterTagRange name={name} max={Math.max(...getFilteredItemProp(variableName))} min={Math.min(...getFilteredItemProp(variableName))}/>
      
        default: 
       return <p></p>
    }
  })  
  }</div>);
}
 
export default Filter;