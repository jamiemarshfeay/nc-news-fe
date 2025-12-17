import { useState, useEffect } from "react";
import PostCommentBox from "./PostCommentBox";
import DeleteComment from "./DeleteComment";

function CommentSection({ articleDetailsToDisplay }) {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${articleDetailsToDisplay.article_id}/comments`
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCommentsList(data.comments);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p className="loading-and-error">Loading comments...</p>;
  if (error) {
    return (
      <p className="loading-and-error">
        Unable to load comments. Please check your connection, refresh, and try
        again.
      </p>
    );
  }

  function onCommentPosted(postedComment) {
    const copyCommentsList = structuredClone(commentsList);
    copyCommentsList.unshift(postedComment);
    setCommentsList(copyCommentsList);
  }

  function addOrCutOptimisticCommentPost(temporaryComment) {
    setCommentsList((currentList) => {
      const copyCommentsList = structuredClone(currentList);
      temporaryComment
        ? copyCommentsList.unshift(temporaryComment)
        : copyCommentsList.shift();
      return copyCommentsList;
    });
  }

  function confirmDeleteComment(index) {
    const copyCommentsList = structuredClone(commentsList);
    copyCommentsList.splice(index, 1);
    setCommentsList(copyCommentsList);
  }

  function deleteOptimisticComment(comment, message) {
    const copyCommentsList = structuredClone(commentsList);
    const index = copyCommentsList.findIndex((listItem) => {
      return listItem.comment_id === comment.comment_id;
    });
    if (index > -1) {
      copyCommentsList.splice(index, 1, message);
    }
    setCommentsList(copyCommentsList);
    return index;
  }

  function reAddOptimisticComment(comment, index) {
    const copyCommentsList = structuredClone(commentsList);
    if (index > -1) {
      copyCommentsList.splice(index, 1, comment);
    }
    setCommentsList(copyCommentsList);
  }

  return (
    <section className="comment-section">
      <PostCommentBox
        articleDetailsToDisplay={articleDetailsToDisplay}
        onCommentPosted={onCommentPosted}
        addOrCutOptimisticCommentPost={addOrCutOptimisticCommentPost}
      />
      <h3>Comment Count: {commentsList.length}</h3>
      <ul>
        {commentsList.map((comment) => {
          return (
            <li key={comment.comment_id}>
              <h4>
                <ul>
                  <li>Comment Author: {comment.author}</li>
                  <li>
                    Posted:{" "}
                    {`${comment.created_at.slice(
                      8,
                      10
                    )}/${comment.created_at.slice(
                      5,
                      7
                    )}/${comment.created_at.slice(0, 4)}`}
                  </li>
                  <li>Likes: {comment.votes}</li>
                </ul>
              </h4>
              {comment.body}
              {comment.author === "tickle122" && (
                <DeleteComment
                  comment={comment}
                  deleteOptimisticComment={deleteOptimisticComment}
                  reAddOptimisticComment={reAddOptimisticComment}
                  confirmDeleteComment={confirmDeleteComment}
                />
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default CommentSection;
