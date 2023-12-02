import { Link, Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Lenta } from "./header/Lenta";

export function Layout() {
  console.log("Layout");
  return (
    <>
      <div id='portalSliderElement'></div>
      <Header />
      <Lenta />
    </>
  );
}

// <header>
//         <Link to="/">Home</Link>
//         <Link to="/about">About</Link>
//         <Link to="/help">Help</Link>
//       </header>
//       <Outlet />
//       <footer>all rights 2023 res.</footer>
