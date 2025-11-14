import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ArticleList from "./ArticleList.jsx";
import UtilityBar from "./UtilityBar.jsx";

function ArticlesByTopic() {
  const { slug } = useParams();
  const [articlesToDisplay, setArticlesToDisplay] = useState([]);
  const [sortBy, setSortBy] = useState("created_at");
  const [orderDir, setOrderDir] = useState("DESC");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles?topic=${slug}&sort_by=${sortBy}&order=${orderDir}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setArticlesToDisplay(data.articles);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug, sortBy, orderDir]);

  function applyQuery(type, value) {
    setIsLoading(true);
    if (type === "sort_by") setSortBy(value);
    if (type === "order") setOrderDir(value);
  }

  if (isLoading) return <p>Loading articles...</p>;
  if (error) return <p>Unable to load articles.</p>;

  return (
    <>
      <h2>{`Articles to do with ${slug[0].toUpperCase() + slug.slice(1)}`}</h2>
      <UtilityBar applyQuery={applyQuery} sortBy={sortBy} orderDir={orderDir} />
      <ArticleList articleList={articlesToDisplay} />
    </>
  );
}

export default ArticlesByTopic;
