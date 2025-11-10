import { useEffect, useState } from "react";
import UtilityBar from "./UtilityBar.jsx";
import ArticleList from "./ArticleList.jsx";

function AllArticles() {
  const [articleList, setArticleList] = useState([]);

  useEffect(() => {
    fetch("https://nc-news-application-7t81.onrender.com/api/articles")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticleList(data.articles);
      });
  }, []);

  return (
    <>
      <UtilityBar />
      <ArticleList articleList={articleList} />
    </>
  );
}

export default AllArticles;
