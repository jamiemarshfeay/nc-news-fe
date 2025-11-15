import { Link } from "react-router";

function PreviousNextButtons({
  articleDetailsToDisplay,
  isLoading,
  setIsLoading,
}) {
  return (
    <>
      {articleDetailsToDisplay.article_id > 1 && (
        <Link to={`/articles/${articleDetailsToDisplay.article_id - 1}`}>
          <button onClick={() => setIsLoading(true)} disabled={isLoading}>
            Previous Article
          </button>
        </Link>
      )}
      {articleDetailsToDisplay.article_id < 37 && (
        <Link to={`/articles/${articleDetailsToDisplay.article_id + 1}`}>
          <button onClick={() => setIsLoading(true)} disabled={isLoading}>
            Next Article
          </button>
        </Link>
      )}
    </>
  );
}

export default PreviousNextButtons;
