import { Link } from "react-router";

function Header() {
  return (
    <>
      <h1>NC News</h1>
      <p id="login-user-message">Logged in as tickle122.</p>
      <nav>
        <ul id="nav-bar">
          <li className="nav-bar-item">
            <Link to="/articles" className="nav-bar-link">All Articles</Link>
          </li>
          <li className="nav-bar-item">
            <Link to="/articles/1" className="nav-bar-link">Individual Articles</Link>
          </li>
          <li className="nav-bar-item">
            <Link to="/topics" className="nav-bar-link">List of Topics</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
