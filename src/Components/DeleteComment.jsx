import { useState } from "react";

function DeleteComment({
  comment,
  deleteOptimisticComment,
  reAddOptimisticComment,
  confirmDeleteComment,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState(null);

  function handleClick() {
    setIsDeleting(true);
    setError(null);

    const message = structuredClone(comment);
    message.body = "Deleting comment...";
    const index = deleteOptimisticComment?.(comment, message);

    fetch(
      `https://nc-news-application-7t81.onrender.com/api/comments/${comment.comment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error();
        confirmDeleteComment?.(index);
      })
      .catch((err) => {
        if (index > -1) {
          reAddOptimisticComment?.(comment, index);
        }
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  return (
    <>
      <button
        id="delete-comment-button"
        onClick={handleClick}
        disabled={isDeleting}
      >
        Delete🗑️
      </button>
      {error && (
        <h4 className="loading-and-error">
          Unable to delete comment. Please check your connection, refresh, and
          try again.
        </h4>
      )}
    </>
  );
}

export default DeleteComment;
