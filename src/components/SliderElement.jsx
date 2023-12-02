import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function SliderElement({ el, marginComputed }) {
  //   const portalSliderElement = document.getElementById("portalSliderElement");
  console.log("ELEMENT IN MAIN", el.slice(5));

  const [isPortal, setIsPortal] = useState(false);
  const copiedURL = useRef(undefined);

  //создаем новую картинку по url созданном ранее
  //пример url-blob:  http://localhost:3000/1bcbb448-bb8b-4337-83f0-159e25fc5202
  useEffect(() => {
    copyImg();
  }, []);

  async function copyImg() {
    copiedURL.current = el;
  }
  function handlePortalChange() {
    setIsPortal((prev) => !prev);
  }

  function OnClickHandler() {
    setIsPortal(true);
  }
  if (!isPortal) {
    return (
      <div
        className="lenta-elem"
        style={{ margin: `10px ${marginComputed.margin}px` }}
      >
        <img src={el} className="lenta-elem-img" onClick={OnClickHandler} />
      </div>
    );
  } else {
    return (
      <>
        {createPortal(
          <PortalElement
            el={copiedURL}
            baseElemNormalizing={handlePortalChange}
          />,
          document.body
        )}
      </>
    );
  }
}

function PortalElement({ el, baseElemNormalizing }) {
  const [isShown, setIsShown] = useState(true);
  const imgBackgroundRef = useRef();

  console.log("ELEMENT IN COPY", el.current);

  useEffect(() => {
    if (el.current === undefined) {
    } else {
      const path = el.current.slice(5).toString();
      //   imgBackgroundRef.current.style.backgroundImage = "url(" + path + ");";
      //   imgBackgroundRef.current.style.background = "black";
      console.log("url(" + path + ");");
      imgBackgroundRef.current.style.background =
        "url(https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80)";
        imgBackgroundRef.current.style.background = "url(" + path + ");";
    }
  });

  if (el === undefined) {
    return;
  }

  if (isShown) {
    return (
      <div
        className="portal-wrapper"
        ref={imgBackgroundRef}
        onClick={() => {
          baseElemNormalizing();
          setIsShown(false);
        }}
      >
        {/* <img src={el.current} className="background-slider-elem" /> */}
        <div className="enlarge">
          <img src={el.current} className="enlarge-img" />
        </div>
      </div>
    );
  } else {
    <></>;
  }
}

function ProgressBar(){
    
}