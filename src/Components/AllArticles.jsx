import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import UtilityBar from "./UtilityBar.jsx";
import ArticleList from "./ArticleList.jsx";

function AllArticles() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [articleList, setArticleList] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderDir, setOrderDir] = useState("DESC");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(searchParams, '<<< search params')

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles?sort_by=${sortBy}&order=${orderDir}`
    )
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
  }, [sortBy, orderDir]);

  function applyQuery(type, value) {
    setIsLoading(true);
    if (type === "sort_by") setSortBy(value);
    if (type === "order") setOrderDir(value);
  }

  if (isLoading) return <p>Loading all articles...</p>;
  if (error) return <p>Unable to load articles.</p>;

  return (
    <>
      <h2>All Articles</h2>
      <UtilityBar applyQuery={applyQuery} sortBy={sortBy} orderDir={orderDir} />
      <ArticleList articleList={articleList} />
    </>
  );
}

export default AllArticles;
