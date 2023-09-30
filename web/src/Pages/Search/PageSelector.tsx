import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import config from "../../data/Json/config.json";

interface PageSelectorProps {
  totalPageNumber: number;
}
 
const PageSelector: React.FunctionComponent<PageSelectorProps> = props => {
  const [searchParams, setSearchParams] = useSearchParams();
 
  const ChangeResultPage = useCallback((changeTo: number) => {
    setSearchParams(`page=${changeTo}`);
  }, [setSearchParams]);

  return (<div className="page-selector">
    {[...Array(Math.min(config.max_search_result_navigation_options, props.totalPageNumber))].map((v, i) => {
    if (config.max_search_result_navigation_options <= props.totalPageNumber) {
      if (9 === i+1) {
        return <div ><span>{props.totalPageNumber <= Number(searchParams.get('page')) + 6 ? props.totalPageNumber - 10 + i + 1 : "..."}</span></div>;
      }

      if (9 === i) {
        return <div className={`${Number(searchParams.get('page')) === props.totalPageNumber ? "active" : ""}`} onClick={() => ChangeResultPage(props.totalPageNumber)}><span>{props.totalPageNumber}</span></div>;
      }

      if(0 === i) {
        return <div className={`${Number(searchParams.get('page')) === 1 ? "active" : ""}`} onClick={() => ChangeResultPage(1)}><span>1</span></div>
      }
    }

    return (
    <div 
      className={`${Number(searchParams.get('page')) === Math.min(props.totalPageNumber - 10 + i + 1, i + 1 + (Math.max(6, Number(searchParams.get('page'))) - 6)) ? "active" : ""}`} 
      onClick={() => ChangeResultPage(Math.min(props.totalPageNumber - 10 + i + 1, i + 1 + (Math.max(6, Number(searchParams.get('page'))) - 6)))}>  
      <span>
        {Math.min(props.totalPageNumber - 10 + i + 1, i + 1 + (Math.max(6, Number(searchParams.get('page'))) - 6))}
      </span>
    </div>
    )
  })
  }
  </div>);
}
 
export default PageSelector;
