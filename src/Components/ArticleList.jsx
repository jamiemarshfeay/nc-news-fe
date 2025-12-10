import { Link } from "react-router";

function ArticleList({ articleList }) {
  return (
    <>
      <ul id="article-list">
        {articleList.map((article) => {
          return (
            <li>
              <Link
                to={`/articles/${article.article_id}`}
                key={article.article_id}
              >
                <h3>{article.title}</h3>
                <ul>
                  <li>
                    Topic:{" "}
                    {article.topic[0].toUpperCase() + article.topic.slice(1)}
                  </li>
                  <li>Author: {article.author}</li>
                  <li>
                    Publish Date:{" "}
                    {`${article.created_at.slice(
                      8,
                      10
                    )}/${article.created_at.slice(
                      5,
                      7
                    )}/${article.created_at.slice(0, 4)}`}
                  </li>
                  <li>Likes: {article.votes}</li>
                  <li>Comments: {article.comment_count}</li>
                </ul>
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ArticleList;
