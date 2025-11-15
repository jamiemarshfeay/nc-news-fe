import { Link } from "react-router";

function PreviousNextButtons({ articleDetailsToDisplay }) {
  return (
    <>
      {articleDetailsToDisplay.article_id > 1 && (
        <Link to={`/articles/${articleDetailsToDisplay.article_id - 1}`}>
          <button>Previous Article</button>
        </Link>
      )}
      {articleDetailsToDisplay.article_id < 37 && (
        <Link to={`/articles/${articleDetailsToDisplay.article_id + 1}`}>
          <button>Next Article</button>
        </Link>
      )}
    </>
  );
}

export default PreviousNextButtons;
