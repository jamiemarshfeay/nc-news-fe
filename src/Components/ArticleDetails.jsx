function ArticleDetails({ articleDetailsToDisplay }) {
  return (
    <>
      <ul>
        <li>Author: {articleDetailsToDisplay.author}</li>
        <li>Topic: {articleDetailsToDisplay.topic[0].toUpperCase() + articleDetailsToDisplay.topic.slice(1)}</li>
        <li>
          Publish Date:{" "}
          {`${articleDetailsToDisplay.created_at.slice(
            8,
            10
          )}/${articleDetailsToDisplay.created_at.slice(
            5,
            7
          )}/${articleDetailsToDisplay.created_at.slice(0, 4)}`}
        </li>
        <li>Likes: {articleDetailsToDisplay.votes}</li>
      </ul>
      <p>{articleDetailsToDisplay.body}</p>
      <p>Article ID: {articleDetailsToDisplay.article_id}</p>
    </>
  );
}

export default ArticleDetails;
