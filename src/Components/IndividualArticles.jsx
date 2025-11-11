import { useState, useEffect } from "react";
import { useParams } from "react-router";
import ArticleDetails from "./ArticleDetails";
import CommentSection from "./CommentSection";

function IndividualArticles() {
  const { article_id } = useParams();
  const [articleIdToSearch, setArticleIdToSearch] = useState(article_id || 1);
  const [articleDetailsToDisplay, setArticleDetailsToDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${articleIdToSearch}`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data.msg) throw new Error(data.msg);
        setArticleDetailsToDisplay(data.article);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [articleIdToSearch]);

  if (isLoading) return <p>Loading article...</p>;

  if (error?.message) {
    return <p>{error.message}.</p>;
  } else if (error) {
    return <p>Unable to load article.</p>;
  }

  return (
    <>
      {/* <PreviousNextButtons /> */}
      <h2>{articleDetailsToDisplay.title}</h2>
      <img
        src={articleDetailsToDisplay.article_img_url}
        alt=""
        role="presentation"
      />
      <ArticleDetails articleDetailsToDisplay={articleDetailsToDisplay} />
      {/* <VotingButtons /> */}
      <CommentSection articleDetailsToDisplay={articleDetailsToDisplay} />
    </>
  );
}

export default IndividualArticles;
