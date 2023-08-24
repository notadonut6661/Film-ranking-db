import { FunctionComponent, useState, useCallback, useEffect } from "react";

interface FilterTagRangeProps {
  name: string;
  variableState: number;
}


const FilterTagRange: FunctionComponent<FilterTagRangeProps> = ({name}) => {

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  
  const minRangeValueChangeHandler = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    if (maxValue < +ev.target.value) {
      setMinValue(maxValue - 1);
      return;
    }

    setMinValue(Number(ev.target.value));
  }, [maxValue]);

  const maxRangeValueChangeHandler = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    if (+ev.target.value < minValue) {
      setMaxValue(minValue + 1);
      return;
    }

    setMaxValue(Number(ev.target.value));
  }, [minValue]);
  
  useEffect(() => {
    console.log(minValue);
    if (maxValue < minValue) {
      setMinValue(maxValue);
    }
  }, [minValue, maxValue]);

  return <div>
    <span className="filter-tag-name">{ name }</span>
    <span className="min-value range-number">{minValue}</span>
    <span className="max-value range-number">{maxValue}</span>
    <input type="range" className="min-range" value={minValue} onChange={minRangeValueChangeHandler}/>
    <input type="range" className="max-range" value={maxValue} onChange={maxRangeValueChangeHandler}/>
  </div>;
}


export default FilterTagRange;