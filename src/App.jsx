import "./App.css";
import Header from "./Components/Header.jsx";
import AllArticles from "./Components/AllArticles.jsx";
import IndividualArticles from "./Components/IndividualArticles.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AllArticles />}></Route>
        <Route path="/:article_id" element={<IndividualArticles />}></Route>
      </Routes>
    </>
  );
}

export default App;
