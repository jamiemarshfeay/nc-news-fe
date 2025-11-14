import { Link } from "react-router";
import { useState, useEffect } from "react";

function TopicsList() {
  const [topicList, setTopicList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://nc-news-application-7t81.onrender.com/api/topics")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTopicList(data.topics);
      })
      .catch((err) => {
        console.error(err);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading all topics...</p>;
  if (error) return <p>Unable to load topics.</p>;

  return (
    <>
      <h2>All Topics</h2>
      <ul id="topics-list">
        {topicList.map((topic) => {
          const image = topic.img_url || null;
          return (
            <Link to={`/topics/${topic.slug}`} key={topic.slug}>
              <li className="topic-list-items">
                <h2>{topic.slug}</h2>
                <img src={image} alt="" role="presentation" />
                <h3>{topic.description}</h3>
              </li>
            </Link>
          );
        })}
      </ul>
    </>
  );
}

export default TopicsList;
