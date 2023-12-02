import { useEffect, useState } from "react";

const imUrl = "http://localhost:3050/";

export function TestFetch() {
  const [img, setImg] = useState();

  const fetchImage = async () => {
    try {
      const res = await fetch(imUrl);
      const imageBlob = await res.blob();
      const imageObjectURL = URL.createObjectURL(imageBlob);
      setImg(imageObjectURL);
    } catch (e) {
      //no console log for real app
      //placeholder with loading/error
      console.log("TestFound err:", e);
    }
  };
  useEffect(() => {
    fetchImage();
  }, []);

  return (
    <>
      <div>fetchTest</div>
      <img src={img} alt="err" />
    </>
  );
}
