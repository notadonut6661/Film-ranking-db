import { FunctionComponent, useState, useCallback, useEffect } from "react";

interface FilterTagRangeProps {
  name: string;
  min: number;
  max: number;
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
  

  return <div >
    <div className="filter-tag-name">{ name }</div>
    <div className="range-data"> 
      <div>
        <span>From </span>
        <input type="number" className="min-value range-number" value={minValue} onChange={minRangeValueChangeHandler}/>
        <span> To </span>
        <input type="number" className="max-value range-number" value={maxValue} onChange={maxRangeValueChangeHandler}/>
      </div>
      <div>
        <input type="range" className="min-range" value={minValue} onChange={minRangeValueChangeHandler}/>
        <input type="range" className="max-range" value={maxValue} onChange={maxRangeValueChangeHandler}/>
      </div>

    </div>
  </div>;
}


export default FilterTagRange;