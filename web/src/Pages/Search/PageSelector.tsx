import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

interface PageSelectorProps {
  totalPageNumber: number;
}
 
const PageSelector: React.FunctionComponent<PageSelectorProps> = props => {
  const [searchParams, setSearchParams] = useSearchParams();
 
  const ChangeResultPage = useCallback((changeTo: number) => {
    console.log(55);
    
    setSearchParams(`page=${changeTo}`);
  }, []);

  return (<div>
    {[...Array(Math.ceil(props.totalPageNumber))].map((v, i) => <div className={`${searchParams.toString().includes(`page=${i}`) ? "active" : ""}`} onClick={() => ChangeResultPage(i)}>{i}</div>)}
  </div>);
}
 
export default PageSelector;
