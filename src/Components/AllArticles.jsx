import { useEffect, useState } from "react";
import UtilityBar from "./UtilityBar.jsx";
import ArticleList from "./ArticleList.jsx";

function AllArticles() {
  const [articleList, setArticleList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://nc-news-application-7t81.onrender.com/api/articles")
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        setArticleList(data.articles);
      });
  }, []);

  if (isLoading) return <p>Loading all articles...</p>;

  return (
    <>
      <UtilityBar />
      <ArticleList articleList={articleList} />
    </>
  );
}

export default AllArticles;
