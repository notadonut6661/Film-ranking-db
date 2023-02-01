import { useEffect, useState } from "react";

interface ContentRowProps {
  title: string;
  request_uri: string;
}

export default function ContentRow({ title, request_uri}: ContentRowProps): JSX.Element {
  const [content, setContent] = useState([
    {}
  ]);


  useEffect(() => {
    fetch(request_uri)
      .then((response) => response.json())
      .then((data) => setContent(data));
  }, []);

  return (
    <div className="ContentRow">
      <span className="content-row-label">{title}</span>
      {content.map(() => {
        return <a><img/></a>
      })}
    </div>
  );
}
