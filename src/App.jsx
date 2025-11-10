import "./App.css";
import Header from "./Components/Header";
import AllArticles from "./Components/AllArticles";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AllArticles />}></Route>
      </Routes>
    </>
  );
}

export default App;
