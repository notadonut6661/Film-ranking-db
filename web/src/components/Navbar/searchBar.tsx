import { useNavigate } from "react-router-dom";
import config from "../../data/Json/config.json";

export default function SearchBar(): JSX.Element {
  const navigate = useNavigate();

  return (
    <div className="search-bar">
      <input
        type={"text"}
        placeholder="Search"
        className="search-bar"
        onKeyDown={({ key }) => {
        if (config.shortcuts.search === key) {
            navigate('/search');
          }
        }}
      />
    </div>
  );
}
