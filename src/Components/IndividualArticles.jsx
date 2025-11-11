import { useState, useEffect } from "react";
import { useParams } from "react-router";
import UtilityBar from "./UtilityBar";
import ArticleDetails from "./ArticleDetails";

function IndividualArticles() {
  const { article_id } = useParams();
  const [articleIdToSearch, setArticleIdToSearch] = useState(article_id || 1);
  const [articleDetailsToDisplay, setArticleDetailsToDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${articleIdToSearch}`
    )
      .then((res) => {
        setIsLoading(false);
        return res.json();
      })
      .then((data) => {
        setArticleDetailsToDisplay(data.article);
      });
  }, []);

  if (isLoading) return <p>Loading article...</p>;

  return (
    <>
      {/* <PreviousNextButtons /> */}
      <h2>{articleDetailsToDisplay.title}</h2>
      <img src={articleDetailsToDisplay.article_img_url} alt={``} />
      <ArticleDetails articleDetailsToDisplay={articleDetailsToDisplay} />
      {/* <VotingButtons /> */}
      {/* <CommentSection articleDetailsToDisplay={articleDetailsToDisplay} /> */}
    </>
  );
}

export default IndividualArticles;
