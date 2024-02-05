import { useEffect, useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { SliderElement } from "../SliderElement";

const lentaRootUrl = "http://localhost:3050/";
const lentaRelative = "lenta/";

export function Lenta() {
  const [numberOfStories, setNumberOfStories] = useState(-1);
  const [imgArray, setImgArray] = useState([]);
  const [isLoadingChainAborted, setIsLoadingChainAborted] = useState(false);

  const [defaultElWidth, setDefaultElWidth] = useState(210);
  const [elMargin, setElMargin] = useState(10);
  const [dX, setDX] = useState(230);
  const [inlineElStyle, setInlineElStyle] = useState({ margin: 10 });

  const sliderRelativePos = useRef(0);
  const sliderOffsetX = useRef(0);
  //this is only for inner purpose of transform
  // let sliderOffsetX = 0;

  const fetchNumber = useCallback(async () => {
  
    try {
      let _n = await fetch(lentaRootUrl + lentaRelative);
      _n = await _n.text();
      if (typeof _n === "string") {
        const digitPattern = /[0-9]+/;
        if (!digitPattern.test(_n)) {
          throw new Error("GET: /lenta is not a parsable number");
        } else {
          _n = Number.parseInt(_n);
        }
      } else if (typeof _n !== "number") {
        throw new Error("GET: /lenta is neither string, nor number");
      }
      setNumberOfStories(_n);
      console.log("fetchNumber - success; n =", _n);
    } catch (e) {
      console.error(e);
      setIsLoadingChainAborted(true);
    }
  }, []);
  const fetchLentaImages = useCallback(async () => {
    console.log("QQQQQQ", numberOfStories);
    if (isLoadingChainAborted) {
      console.log("isLoadingChainAborted =", isLoadingChainAborted);
      return;
    } else {
      //id starts from 1 to N
      console.log("started fetchLentaImages");
      try {
        for (let i = 1; i <= numberOfStories; i++) {
          try {
            let fullPath = lentaRootUrl + lentaRelative + `${i}`;
            console.log("*fullPath =", fullPath);
            const res = await fetch(fullPath);
            const imageBlob = await res.blob();
            const imageObjectURL = URL.createObjectURL(imageBlob);
            //should be revoked on unmount, or memoize imageObjectURL
            //specially not from SetState - coz last rerender should be on last update
            imgArray.push(imageObjectURL);
          } catch (e) {
            //ffffff
            console.log(e);
            throw new Error(`fetchLentaImages error while fetching img ${e}`);
          }
        }
        console.log("right before setting array of images", imgArray);
        setImgArray(() => {
          return [...imgArray];
        });
        //2 catch критический так как в любом случае не позволит массиву отрендерится
      } catch (e) {
        console.error(`floated error ${e}`);
      }
    }
  }, [numberOfStories]);
  useEffect(() => {
    fetchNumber();
    //not good as only on mount number is checked
  }, []);
  useEffect(() => {
    fetchLentaImages();
    computeStyles();
  }, [numberOfStories]);

  // useEffect(()=>{
  //   computeStyles();
  // })
  function getMaxNumberOfSwipes() {
    return (
      //uses default elem width - если поедут ширины, поедет все
      Math.round(
        numberOfStories -
          contRef.current.clientWidth /
            (2 * inlineElStyle.margin + defaultElWidth)
      )
    );
  }

  function computeStyles() {
    console.log("FROM COMP current.innerWidth =", contRef.current.clientWidth);
    let _cWidth = contRef.current.clientWidth;
    let _n = _cWidth / (defaultElWidth + 2 * elMargin);
    if (_n <= 1) {
      return;
    }
    _n = Math.floor(_n);
    let subLength = _n * (defaultElWidth + 2 * elMargin);

    let _newMargin = (_cWidth - subLength) / (_n * 2) + elMargin;
    
    slider_lentaRef.current.style.width = `${
      (_newMargin * 2 + defaultElWidth) * numberOfStories + 10
    }px`;

    console.log("DX =", _newMargin * 2 + defaultElWidth);
    setDX(_newMargin * 2 + defaultElWidth);
    setInlineElStyle({ margin: _newMargin });
  }

  function handlerLeftClick(e) {
    if (sliderRelativePos.current === 0) {
      return;
    }

    addReactClassToListSCR(slider_lentaRef, "WOW");

    let _current_transform = slider_lentaRef.current.style.transform;
    if (
      _current_transform === "" ||
      _current_transform === " " ||
      _current_transform === undefined
    ) {
      sliderOffsetX.current = 0;
    } else {
      let _name_transform_pattern = /translateX/;
      if (_name_transform_pattern.test(_current_transform)) {
        let _transform_pattern = /-{0,1}[0-9]+/;
        sliderOffsetX.current = Number.parseInt(
          _current_transform.match(_transform_pattern)[0]
        );
      }
    }

    slider_lentaRef.current.style.transform = `translateX(${
      sliderOffsetX.current + dX
    }px)`;
    sliderRelativePos.current -= 1;
  }

  function handlerRightClick(e) {
    if (sliderRelativePos.current >= getMaxNumberOfSwipes()) {
      return;
    }

    addReactClassToListSCR(slider_lentaRef, "WOW");
    //--------
    let _current_transform = slider_lentaRef.current.style.transform;
    if (
      _current_transform === " " ||
      _current_transform === " " ||
      _current_transform === undefined
    ) {
      sliderOffsetX.current = 0;
    } else {
      let _name_transform_pattern = /translateX/;
      if (_name_transform_pattern.test(_current_transform)) {
        let _transform_pattern = /-{0,1}[0-9]+/;
        sliderOffsetX.current = Number.parseInt(
          _current_transform.match(_transform_pattern)[0]
        );
      }
    }
    // console.log("offsetX =", sliderOffsetX);
    slider_lentaRef.current.style.transform = `translateX(${
      sliderOffsetX.current - dX
    }px)`;
    sliderRelativePos.current += 1;
  }

  const slider_lentaRef = useRef();
  const slider_wrapperRef = useRef();
  const contRef = useRef();

  return (
    <section className="lenta">
      {/* <button onClick={computeStyles}>COMP STYLE</button> */}
      <div className="container cnt-lenta-overflow" ref={contRef}>
        <div className="slider-left-div divleft">
          <button className="slider-btn-style sb1" onClick={handlerLeftClick}>
            &#8592;
          </button>
        </div>
        <div className="slider-right-div divright">
          {/* DANGER */}
          <button className="slider-btn-style sb2" onClick={handlerRightClick}>
            &#8594;
          </button>
        </div>
        <div className="slider__wrapper" ref={slider_wrapperRef}>
          <div className="slider_lenta" ref={slider_lentaRef}>
            {/* lenta elem - будет с сервера мапится в массив */}

            {imgArray.map((el) => {
              return (
                <SliderElement
                  key={el}
                  el={el}
                  marginComputed={inlineElStyle}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function addReactClassToListSCR(itemRef, classNameToAdd) {
  let _classString = itemRef.current.classList.value;
  let _classes_array = _classString.split(" ");
  for (let val of _classes_array) {
    if (val === classNameToAdd) {
      return;
    }
  }
  _classes_array.push(classNameToAdd);
  let _new_className = _classes_array.join(" ");
  itemRef.current.className = _new_className;
}
