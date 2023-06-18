import WatchOnElement from "./watchOnElement";
import config from '../../data/Json/config.json';

export default function WatchOn(): JSX.Element {
  
  return <div className="watch-on">
    {config.services.map(({name, url}) => <WatchOnElement name={name} serviceDomain={url}/>)}
  </div>;
}
