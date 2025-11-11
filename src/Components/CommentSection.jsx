import { useState, useEffect } from "react";

function CommentSection({ articleDetailsToDisplay }) {
  const [commentsList, setCommentsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [articleIdToSearch, setArticleIdToSearch] = useState(
    articleDetailsToDisplay.article_id || 1
  );

  useEffect(() => {
    fetch(
      `https://nc-news-application-7t81.onrender.com/api/articles/${articleIdToSearch}/comments`
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

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Unable to load comments.</p>;

  return (
    <>
      <h2>Comments</h2>
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
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CommentSection;
