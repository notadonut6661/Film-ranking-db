import { useEffect, useState } from "react";

interface ContentRowProps {
  title: string;
  request_uri: string;
  elementsQuantity: number;
}

export default function ContentRow({
  title,
  request_uri,
  elementsQuantity,
}: ContentRowProps): JSX.Element {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch(request_uri)
      .then((response) => response.json())
      .then((data) => setContent(data));
  });

  return (
    <div className="ContentRow">
      <span>{title}</span>
      {content.map(() => <a></a>)}
    </div>  );
}
