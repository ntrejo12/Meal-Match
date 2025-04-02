import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage.jsx";
import GetStarted from "./GetStarted.jsx";
import GetRecipes from "./GetRecipes.jsx";

function App() {
  //react is all about reusing componenets - small section of code with js and html
  //js library
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/gettingstarted" element={<GetStarted />} />
        <Route path="/getrecipes" element={<GetRecipes />} />
      </Routes>
    </>
  );
}

export default App;
