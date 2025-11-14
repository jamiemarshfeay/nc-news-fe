import { useEffect, useState } from "react";
import UtilityBar from "./UtilityBar.jsx";
import ArticleList from "./ArticleList.jsx";

function AllArticles() {
  const [articleList, setArticleList] = useState([]);
  // const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  function applyQuery(type, value) {
    // setQuery(`&${type}=${value}`)
  }

  useEffect(() => {
    fetch("https://nc-news-application-7t81.onrender.com/api/articles")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticleList(data.articles);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading all articles...</p>;
  if (error) return <p>Unable to load articles.</p>;

  return (
    <>
      <h2>All Articles</h2>
      <UtilityBar applyQuery={applyQuery} />
      <ArticleList articleList={articleList} />
    </>
  );
}

export default AllArticles;
