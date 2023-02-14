import submitSearchQuery from "./submitSearchQuery";

export default function SearchBar(): JSX.Element {
  return (
    <div className="search-bar">
      <input
        type={"text"}
        placeholder="Search"
        className="search-bar"
        onKeyDown={({ key }) => {
          // FIXME USE CONFIG
          if (key === "Enter") {
            console.log("key pressed");
            submitSearchQuery();
          }
        }}
      />
    </div>
  );
}
