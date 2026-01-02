import { Link } from "react-router";

function Header() {
  return (
    <header className="header">
      <h1>NC News</h1>
      <nav className="header-nav">
        <ul>
          <li>
            <Link to="/articles">All Articles</Link>
          </li>
          <li>
            <Link to="/articles/1">Individual Articles</Link>
          </li>
          <li>
            <Link to="/topics">List of Topics</Link>
          </li>
        </ul>
      </nav>
      <p>Logged in as tickle122</p>
    </header>
  );
}

export default Header;
