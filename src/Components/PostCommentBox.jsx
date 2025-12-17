import { useState } from "react";

function PostCommentBox({
  articleDetailsToDisplay,
  onCommentPosted,
  addOrCutOptimisticCommentPost,
}) {
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState(null);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    if (commentText.length <= 0) {
      setEmptyFieldMessage("Cannot submit an empty field. Please try again.");
    } else {
      setIsPosting(true);
      setEmptyFieldMessage(null);

      const postingBody = commentText;
      const postTimestamp = new Date(Date.now());
      const temporaryComment = {
        comment_id: `temp-post-${Date.now()}`,
        votes: 0,
        created_at: postTimestamp.toISOString(),
        author: "tickle122",
        body: postingBody,
        article_id: articleDetailsToDisplay.article_id,
      };
      addOrCutOptimisticCommentPost?.(temporaryComment);

      fetch(
        `https://nc-news-application-7t81.onrender.com/api/articles/${articleDetailsToDisplay.article_id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "tickle122",
            body: postingBody,
          }),
        }
      )
        .then((res) => {
          if (!res.ok) throw new Error();
          return res.json();
        })
        .then((data) => {
          const postedComment = data.comment;
          onCommentPosted?.(postedComment);
        })
        .catch((err) => {
          addOrCutOptimisticCommentPost?.();
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setIsPosting(false);
          setCommentText("");
        });
    }
  }

  return (
    <section id="post-comment-box">
      {emptyFieldMessage && (
        <p className="loading-and-error">{emptyFieldMessage}</p>
      )}
      {error && (
        <p className="loading-and-error">
          There was a problem posting your comment. Please check your
          connection, refresh, and try again.
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Type Comment:{" "}
          <input
            type="text"
            value={commentText}
            onChange={(event) => {
              return setCommentText(event.target.value);
            }}
          ></input>
        </label>
        <button type="submit" disabled={isPosting}>
          {isPosting ? "Saving..." : "Post"}
        </button>
      </form>
    </section>
  );
}

export default PostCommentBox;
