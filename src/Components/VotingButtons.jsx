import { useState } from "react";

function VotingButtons({
  articleDetailsToDisplay,
  onVoteApplied,
  onOptimisticVote,
}) {
  const [localArticleVotes, setLocalArticleVotes] = useState(
    articleDetailsToDisplay.votes
  );
  const [isVoting, setIsVoting] = useState(false);
  const [error, setError] = useState(null);

  function handleClick(event) {
    setIsVoting(true);
    setError(null);
    let incrementValue;

    if (event.target.innerHTML === "Like👍") {
      incrementValue = 1;
    }
    if (event.target.innerHTML === "Dislike👎") {
      incrementValue = -1;
    }

    let newVotes = localArticleVotes + incrementValue;
    onOptimisticVote?.(newVotes);

    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${articleDetailsToDisplay.article_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inc_votes: incrementValue,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {
        const updatedArticle = data.article;
        onVoteApplied?.(updatedArticle);
        setLocalArticleVotes(updatedArticle.votes);
      })
      .catch((err) => {
        newVotes = newVotes - incrementValue;
        onOptimisticVote?.(newVotes);
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsVoting(false);
      });
  }

  return (
    <section className="voting-buttons">
      {error && (
        <h4 className="loading-and-error">
          Apologies, you are unable to vote. Please check your connection,
          refresh, and try again.
        </h4>
      )}
      <button onClick={handleClick} disabled={isVoting}>
        {isVoting ? "Saving..." : "Like👍"}
      </button>
      <button onClick={handleClick} disabled={isVoting}>
        {isVoting ? "Saving..." : "Dislike👎"}
      </button>
    </section>
  );
}

export default VotingButtons;
