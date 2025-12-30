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

  if (isLoading)
    return <p className="loading-and-error">Loading all topics...</p>;
  if (error) {
    return (
      <p className="loading-and-error">
        Unable to load topics. Please check your connection, refresh, and try
        again.
      </p>
    );
  }

  return (
    <section className="topics-list">
      <h2>All Topics</h2>
      <ul>
        {topicList.map((topic) => {
          const image =
            topic.img_url ||
            "https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg?w=700&h=700";
          return (
            <li>
              <Link to={`/topics/${topic.slug}`} key={topic.slug}>
                <h3>{topic.slug[0].toUpperCase() + topic.slug.slice(1)}</h3>
                <img src={image} alt="" role="presentation" />
                <h4>Description: {topic.description}</h4>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default TopicsList;
