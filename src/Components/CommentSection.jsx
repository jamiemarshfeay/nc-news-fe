import { useState, useEffect } from "react";
import PostCommentBox from "./PostCommentBox";

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

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Unable to load comments.</p>;

  return (
    <>
      <h2>Comment Section</h2>
      <PostCommentBox />
      <h3>Comments</h3>
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
