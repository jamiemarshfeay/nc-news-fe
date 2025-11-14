import { useState } from "react";

function PostCommentBox({
  articleDetailsToDisplay,
  onCommentPosted,
  addOrCutOptimisticCommentPost,
}) {
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    if (commentText.length <= 0) {
      setEmptyFieldMessage("Cannot submit an empty field. Please try again.");
    } else {
      setIsPosting(true);
      setEmptyFieldMessage("");

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
    <>
      <h3>Post Comment Box</h3>
      <p>{emptyFieldMessage}</p>
      {error && <p>There was a problem posting your comment.</p>}
      <form id="post-comment-box" onSubmit={handleSubmit}>
        <label>
          Type Comment:
          <input
            id="post-comment-text-area"
            type="text"
            value={commentText}
            onChange={(event) => {
              return setCommentText(event.target.value);
            }}
          ></input>
        </label>
        <button id="post-comment-button" type="submit" disabled={isPosting}>
          {isPosting ? "Saving..." : "Post"}
        </button>
      </form>
    </>
  );
}

export default PostCommentBox;
