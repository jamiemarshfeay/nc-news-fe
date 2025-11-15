import { useState, useEffect } from "react";
import { useParams } from "react-router";
import PreviousNextButtons from "./PreviousNextButtons";
import ArticleDetails from "./ArticleDetails";
import VotingButtons from "./VotingButtons";
import CommentSection from "./CommentSection";

function IndividualArticles() {
  const { article_id } = useParams();
  const [articleDetailsToDisplay, setArticleDetailsToDisplay] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${article_id}`
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
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;

  if (error?.message) {
    return <p>{error.message}.</p>;
  } else if (error) {
    return <p>Unable to load article.</p>;
  }

  function onVoteApplied(updatedArticle) {
    setArticleDetailsToDisplay(updatedArticle);
  }

  function onOptimisticVote(temporaryVotes) {
    const temporaryObject = structuredClone(articleDetailsToDisplay);
    temporaryObject.votes = temporaryVotes;
    setArticleDetailsToDisplay(temporaryObject);
  }

  return (
    <>
      <PreviousNextButtons articleDetailsToDisplay={articleDetailsToDisplay} />
      <h2>{articleDetailsToDisplay.title}</h2>
      <img
        src={articleDetailsToDisplay.article_img_url}
        alt=""
        role="presentation"
      />
      <ArticleDetails articleDetailsToDisplay={articleDetailsToDisplay} />
      <VotingButtons
        articleDetailsToDisplay={articleDetailsToDisplay}
        onVoteApplied={onVoteApplied}
        onOptimisticVote={onOptimisticVote}
      />
      <CommentSection articleDetailsToDisplay={articleDetailsToDisplay} />
    </>
  );
}

export default IndividualArticles;
