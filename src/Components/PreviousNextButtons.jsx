import { Link } from "react-router";

function PreviousNextButtons({
  articleDetailsToDisplay,
  isLoading,
  setIsLoading,
}) {
  return (
    <nav>
      {articleDetailsToDisplay.article_id > 1 && (
        <Link
          to={`/articles/${articleDetailsToDisplay.article_id - 1}`}
          id="previous-article"
        >
          <button onClick={() => setIsLoading(true)} disabled={isLoading}>
            Previous Article
          </button>
        </Link>
      )}
      {articleDetailsToDisplay.article_id < 37 && (
        <Link
          to={`/articles/${articleDetailsToDisplay.article_id + 1}`}
          id="next-article"
        >
          <button onClick={() => setIsLoading(true)} disabled={isLoading}>
            Next Article
          </button>
        </Link>
      )}
    </nav>
  );
}

export default PreviousNextButtons;
