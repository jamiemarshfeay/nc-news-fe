import { useState } from "react";

function PostCommentBox({
  articleDetailsToDisplay,
  onCommentPosted,
  addOrCutOptimisticComment,
}) {
  const [commentText, setCommentText] = useState("");
  const [isPosting, setIsPosting] = useState(false);
  const [emptyFieldMessage, setEmptyFieldMessage] = useState("");
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
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
      addOrCutOptimisticComment?.(temporaryComment);

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
          return res.json();
        })
        .then((data) => {
          if (data.msg) throw new Error(data.msg);
          const postedComment = data.comment;
          onCommentPosted?.(postedComment);
          setCommentText("");
        })
        .catch((err) => {
          addOrCutOptimisticComment?.();
          console.error(err);
          setError(err);
        })
        .finally(() => {
          setIsPosting(false);
        });
    }
  }

  // if (error?.message) {
  //   return <p>{error.message}.</p>;
  // } else if (error) {
  //   return <p>There was a problem posting your comment.</p>;
  // }

  return (
    <>
      <h3>Post Comment Box</h3>
      <p>{emptyFieldMessage}</p>
      {error && <p>{error.message || "There was a problem posting your comment."}</p>}
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
