import { useState, useEffect } from "react";
import PostCommentBox from "./PostCommentBox";
import DeleteComment from "./DeleteComment";

function CommentSection({ articleDetailsToDisplay }) {
  const [commentsList, setCommentsList] = useState([]);
  const [commentCount, setCommentCount] = useState(0);
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
        setCommentCount(data.comments.length);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Unable to load comments.</p>;

  function onCommentPosted(postedComment) {
    const copyCommentsList = structuredClone(commentsList);
    copyCommentsList.unshift(postedComment);
    setCommentsList(copyCommentsList);
    setCommentCount(copyCommentsList.length);
  }

  function addOrCutOptimisticComment(temporaryComment) {
    const copyCommentsList = structuredClone(commentsList);
    temporaryComment
      ? copyCommentsList.unshift(temporaryComment)
      : copyCommentsList.shift();
    setCommentsList(copyCommentsList);
    setCommentCount(copyCommentsList.length);
  }

  function confirmDeleteComment(index) {
    const copyCommentsList = structuredClone(commentsList);
    copyCommentsList.splice(index, 1);
    setCommentsList(copyCommentsList);
    setCommentCount(copyCommentsList.length);
  }

  function deleteOptimisticComment(comment, message) {
    const copyCommentsList = structuredClone(commentsList);
    const index = copyCommentsList.findIndex((element) => {
      return element.comment_id === comment.comment_id;
    });
    if (index > -1) {
      copyCommentsList.splice(index, 1, message);
    }
    setCommentsList(copyCommentsList);
    setCommentCount(copyCommentsList.length);
    return index;
  }

  function reAddOptimisticComment(comment, index) {
    const copyCommentsList = structuredClone(commentsList);
    copyCommentsList.splice(index, 1, comment);
    setCommentsList(copyCommentsList);
    setCommentCount(copyCommentsList.length);
  }

  return (
    <>
      <h2>Comment Section</h2>
      <PostCommentBox
        articleDetailsToDisplay={articleDetailsToDisplay}
        onCommentPosted={onCommentPosted}
        addOrCutOptimisticComment={addOrCutOptimisticComment}
      />
      <h3>Comment Count: {commentCount}</h3>
      <ul>
        {commentsList.map((comment) => {
          return (
            <li key={comment.comment_id}>
              {comment.body === "Deleting comment..." ? (
                <p>Deleting comment...</p>
              ) : (
                <>
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
                </>
              )}
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CommentSection;
