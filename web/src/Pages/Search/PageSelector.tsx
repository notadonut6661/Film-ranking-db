import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import config from "../../data/Json/config.json";

interface PageSelectorProps {
  totalPageNumber: number;
}
 
const PageSelector: React.FunctionComponent<PageSelectorProps> = props => {
  const [searchParams, setSearchParams] = useSearchParams();
  const SHOWN_LINKS_NUMBER = Math.min(config.max_search_result_navigation_options, props.totalPageNumber);
  const CAROUSEL_SHIFT = Math.max(6, Number(searchParams.get('page')));

  const ChangeResultPage = useCallback((changeTo: number) => {
    setSearchParams(prev => {
      prev.set('page', String(changeTo));
      return prev;
    });
  }, [setSearchParams]);

  return (<div className="page-selector">
    {[...Array(SHOWN_LINKS_NUMBER)].map((v, i) => {
    if (config.max_search_result_navigation_options <= props.totalPageNumber) {
      if (8 === i) {
        return <div ><span>{props.totalPageNumber <= Number(searchParams.get('page')) + 6 ? Math.min(SHOWN_LINKS_NUMBER + i + 1, i + 1 + CAROUSEL_SHIFT ) : "..."}</span></div>;
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
      className={`${Number(searchParams.get('page')) === Math.min(props.totalPageNumber - 10 + i + 1, i + 1 + CAROUSEL_SHIFT ) ? "active" : ""}`} 
      onClick={() => ChangeResultPage(Math.min(props.totalPageNumber - SHOWN_LINKS_NUMBER + i + 1, i + 1 + CAROUSEL_SHIFT))}>  
      <span>
        {Math.min(props.totalPageNumber - SHOWN_LINKS_NUMBER + i + 1, i + 1 + CAROUSEL_SHIFT)}
      </span>
    </div>
    )
  })
  }
  </div>);
}
 
export default PageSelector;
