import "./App.css";
import Header from "./Components/Header.jsx";
import AllArticles from "./Components/AllArticles.jsx";
import IndividualArticles from "./Components/IndividualArticles.jsx";
import TopicsList from "./Components/TopicsList.jsx";
import ArticlesByTopic from "./Components/ArticlesByTopic.jsx";
import NotFound from "./Components/NotFound.jsx";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<AllArticles />}></Route>
        <Route path="/articles" element={<AllArticles />}></Route>
        <Route
          path="/articles/:article_id"
          element={<IndividualArticles />}
        ></Route>
        <Route path="/topics" element={<TopicsList />}></Route>
        <Route path="/topics/:slug" element={<ArticlesByTopic />}></Route>
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </>
  );
}

export default App;
