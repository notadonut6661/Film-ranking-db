/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import "./style.scss";

export default function CarouselForAddingActors(): JSX.Element {
  const [ulLength, setUlLength] = useState(0);
  const [scrolledElements, setScrolledElements] = useState(0);

  useEffect(() => {
    setUlLength(document.querySelector("div.cast > ul")?.children.length ?? 0);
  });

  // FIXME magic number
  const getMaximalScrollIndex = (): number => ulLength - 4;
  // FIXME magic number
  const getMinimalScrollIndex = (): number => 0;


  return (
    // TODO: delete magic numbers
    <div className="CarouselForAddingActors">
      <button
        className="scrollButton"
        id="right"
        onClick={(ev) => {
          if (scrolledElements === getMinimalScrollIndex()) return;
          
          setScrolledElements(() => scrolledElements - 1);
          console.log(scrolledElements);
          
        }}
      ></button>
      <div className="cast">
        <ul
          style={{
            width: ulLength > 4 ? `${100 + (ulLength - 4) * 26.7}%` : "100%",
            right: ulLength >= 4 ? `${26.667 * scrolledElements}%` : 0,
          }}
        >
          <li style={{
            background: 'red'
          }}>
             <button></button>
          </li>
          <li style={{
            background: '#ff11f0'
          }}></li>
          <li></li>
          <li></li>
          <li></li>

          <li></li>
        </ul>
      </div>

      <button
        className="scrollButton"
        id="left"
        onClick={(ev) => {
          if (scrolledElements === getMaximalScrollIndex()) return;

          setScrolledElements(() => scrolledElements + 1);
        }}
      ></button>
    </div>
  );
}
