import { useEffect, useState } from "react";

function VotingButtons({ articleDetailsToDisplay, onVoteApplied }) {
  const [localArticleVotes, setLocalArticleVotes] = useState(
    articleDetailsToDisplay.votes
  );
  const [isVoting, setIsVoting] = useState(false);

  function handleClick(event) {
    setIsVoting(true);
    let incrementValue;

    if (event.target.innerHTML === "Like👍") {
      incrementValue = 1;
      console.log(incrementValue, "<<< increment value");
    }
    if (event.target.innerHTML === "Dislike👎") {
      incrementValue = -1;
      console.log(incrementValue, "<<< increment value");
    }

    setLocalArticleVotes(currentValue => currentValue + incrementValue);
    // onOptimisitcVote?.(localArticleVotes);

    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${articleDetailsToDisplay.article_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inc_votes: 0,
        //   inc_votes: incrementValue,
        }),
      }
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data.article, '<<< returned data from patch');
        const updatedArticle = data.article;
        onVoteApplied?.(updatedArticle);
      })
      .catch(() => {
        setLocalArticleVotes(currentValue => currentValue - incrementValue);
      })
      .finally(() => {
        setIsVoting(false);
      });
  }

  return (
    <>
      <button onClick={handleClick} disabled={isVoting}>
        {isVoting ? "Saving..." : "Like👍"}
      </button>
      <button onClick={handleClick} disabled={isVoting}>
        {isVoting ? "Saving..." : "Dislike👎"}
      </button>
    </>
  );
}

export default VotingButtons;
