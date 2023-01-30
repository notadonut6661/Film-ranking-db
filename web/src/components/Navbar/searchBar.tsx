import submitSearchQuery from "./sumbitSearchQuery";

export default function SearchBar(): JSX.Element {
  return (
    <div className="search-bar">
      <input
        type={"text"}
        placeholder="Search"
        className="search-bar"
        onKeyDown={({ key }) => {
          if (key === "Enter") {
            console.log("key pressed");
            submitSearchQuery();
          }
        }}
      />
    </div>
  );
}
