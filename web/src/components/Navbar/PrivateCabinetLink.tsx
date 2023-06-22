import { useEffect, useState } from "react";

export default function PrivateCabinetLink(): JSX.Element {
  const [linkDirection, setLinkDirection] = useState('/login');

  useEffect(() => {
    if (localStorage.getItem('hash') !== null && localStorage.getItem("id") !== null) {
      setLinkDirection('/personal');
    }
  }, [setLinkDirection]);


  return (<a className="private-cabinet-link" href={linkDirection}><button></button></a>);
}
