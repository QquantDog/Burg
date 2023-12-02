import "./App.css";
import { Route, Routes, Link } from "react-router-dom";

import { Layout } from "./components/Layout";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Help } from "./components/Help";
import { NotFound } from "./components/NotFound";
import { TestFetch } from "./components/testcomps/_fetch";

// function App() {
//   console.log("App");
//   return (
//     <TestFetch/>
//   );
// }


function App() {
  console.log("App");
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="help" element={<Help />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}




export default App;
