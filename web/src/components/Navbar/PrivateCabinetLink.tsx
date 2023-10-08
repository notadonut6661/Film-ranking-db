import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PrivateCabinetLink(): JSX.Element {
  const [linkDirection, setLinkDirection] = useState('/login');

  useEffect(() => {
    if (localStorage.getItem('hash') !== null && localStorage.getItem("id") !== null) {
      setLinkDirection('/personal');
    }
  }, [setLinkDirection]);


  return (<Link className="private-cabinet-link" to={linkDirection}></Link>);
}
