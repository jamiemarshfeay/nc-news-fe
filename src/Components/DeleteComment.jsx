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
    const message = {
      comment_id: `temp-del-${Date.now()}`,
      votes: 0,
      created_at: "",
      author: "",
      body: "Deleting comment...",
    };
    const index = deleteOptimisticComment?.(comment, message);

    fetch(
      `https://nc-news-application-7t81.onrender.com/api/comments/${comment.comment_id}`,
      {
        method: "DELETE",
      }
    )
      .then((res) => {
        console.log(res, "<<< response from delete request");
        if (!res.ok) {
          return res.json().then((data) => {
            console.log(
              data,
              "<<< data back from delete request - should be undefined"
            );
            if (data.msg) throw new Error(data.msg);
          });
        }
        confirmDeleteComment?.(index);
      })
      .catch((err) => {
        console.log(err.message);
        // if (!err.message === ) {
          reAddOptimisticComment?.(comment, index);
        // }
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsDeleting(false);
      });
  }

  //   if (error?.message) {
  //     return <p>{error.message}.</p>;
  //   } else if (error) {
  //     return <p>Unable to delete comment.</p>;
  //   }

  return (
    <>
      {error && <p>{error.message || "Unable to delete comment."}</p>}
      <button
        id="delete-comment-button"
        onClick={handleClick}
        disabled={isDeleting}
      >
        {isDeleting ? "Deleting..." : "Delete🗑️"}
      </button>
    </>
  );
}

export default DeleteComment;
