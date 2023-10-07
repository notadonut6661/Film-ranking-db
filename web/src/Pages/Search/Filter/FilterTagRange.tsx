import { FunctionComponent, useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

interface FilterTagRangeProps {
  name: string;
  min: number;
  max: number;
}

const FilterTagRange: FunctionComponent<FilterTagRangeProps> = ({name}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [min, setMin] = useState(Number(searchParams.get(`${name}-min`)));
  const [max, setMax] = useState(Number(searchParams.get(`${name}-max`)));

  const RangeValueChangeHandler = useCallback((ev: React.ChangeEvent<HTMLInputElement>, valueType: 'min' | 'max') => {
    ev.preventDefault();
    if (('min'=== valueType  && Number(searchParams.get(`${name}-max`)) <= +ev.target.value) || 
      ('max'=== valueType  && Number(searchParams.get(`${name}-min`)) >= +ev.target.value )) {
      console.log(min, max);
      setSearchParams(prev => {
        if ('min'=== valueType)  setMin(max - 1);
        if ('min'=== valueType)  setMax(min + 1);

        prev.set(`${name}-${valueType}`, String(valueType === 'max' ? max : min));
        return prev;
      })

      return;
    }

     setSearchParams(prev => {
      if ('min'=== valueType)  setMin(+ev.target.value);
      if ('max'=== valueType)  setMax(+ev.target.value);
        prev.set(`${name}-${valueType}`, ev.target.value);
        return prev;
      })
  }, [max, min, name, searchParams, setSearchParams]);

  return <div >
    <div className="filter-tag-name">{ name }</div>
    <div className="range-data"> 
      <div>
        <span>From </span>
        <input min="0" type="number" className="min-value range-number" value={min} onChange={ev => RangeValueChangeHandler(ev, 'min')}/>
        <span> To </span>
        <input max={100} type="number" className="max-value range-number" value={max} onChange={ev => RangeValueChangeHandler(ev, 'max')}/>
      </div>
      <div>
        <input type="range" className="min-range" value={min} onChange={ev => RangeValueChangeHandler(ev, 'min')}/>
        <input type="range" className="max-range" value={max} onChange={ev => RangeValueChangeHandler(ev, 'max')}/>
      </div>

    </div>
  </div>;
}


export default FilterTagRange;