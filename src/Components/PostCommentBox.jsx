import { useState } from "react";

function PostCommentBox({
  articleDetailsToDisplay,
  onCommentPosted,
  addOrCutOptimisticComment,
}) {
  const [isPosting, setIsPosting] = useState(false);
  const [error, setError] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setIsPosting(true);

    const postingBody = event.target[0].value;
    const postTimestamp = new Date(Date.now());
    const temporaryComment = {
      comment_id: `temp-${Date.now()}`,
      votes: 0,
      created_at: postTimestamp.toISOString(),
      author: "tickle122",
      body: postingBody,
      article_id: articleDetailsToDisplay.article_id,
    };

    console.log(temporaryComment, "<<< temporary comment");
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
        const postedComment = data.comment;
        console.log(postedComment, "<<< posted comment");
        onCommentPosted?.(postedComment);
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

  return (
    <>
      <h3>Post Comment Box</h3>
      <form id="post-comment-box" onSubmit={handleSubmit}>
        <label>
          Type Comment:
          <input id="post-comment-text-area" type="text"></input>
        </label>
        <button id="post-comment-button" type="submit" disabled={isPosting}>
          {isPosting ? "Saving..." : "Post"}
        </button>
      </form>
    </>
  );
}

export default PostCommentBox;
