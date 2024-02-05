import { Link, Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Lenta } from "./header/Lenta";
import { Footer } from "./footer/Footer";

export function Layout() {
  console.log("Layout");
  return (
    <>
      <div id='portalSliderElement'></div>
      <Header />
      <Lenta />

      <Outlet />

      <Footer />
    </>
  );
}
