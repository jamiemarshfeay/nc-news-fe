import { Link } from "react-router";

function Header() {
  return (
    <>
      <h1>NC News</h1>
      <nav>
        <ul>
          <li>
            <Link to="/">All Articles</Link>
          </li>
          <li>
            <Link to="/1">Individual Articles</Link>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Header;
