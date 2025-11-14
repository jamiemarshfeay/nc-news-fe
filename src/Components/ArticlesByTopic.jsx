import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ArticleList from "./ArticleList.jsx";
import UtilityBar from "./UtilityBar.jsx";

function ArticlesByTopic() {
  const { slug } = useParams();
  const [articlesToDisplay, setArticlesToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const query = `?topic=${slug}`;

  useEffect(() => {
    fetch(`https://nc-news-application-7t81.onrender.com/api/articles${query}`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.msg) throw new Error(data.msg);
        setArticlesToDisplay(data.articles);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [slug]);

  if (isLoading) return <p>Loading articles...</p>;

  if (error?.message) {
    return <p>{error.message}.</p>;
  } else if (error) {
    return <p>Unable to load articles.</p>;
  }

  return (
    <>
      <h2>{`Articles to do with ${slug[0].toUpperCase() + slug.slice(1)}`}</h2>
      <UtilityBar />
      <ArticleList articleList={articlesToDisplay} />
    </>
  );
}

export default ArticlesByTopic;
