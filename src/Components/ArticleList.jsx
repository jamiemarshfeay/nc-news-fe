function ArticleList({ articleList }) {
  return (
    <>
      <ul id="all-articles-list">
        {articleList.map((article) => {
          return (
            <li class="article-list-items" key={article.article_id}>
              <h3>{article.title}</h3>
              <ul class="article-details">
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
              </ul>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default ArticleList;
