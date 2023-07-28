import { Link } from "react-router-dom";
import "../Styles/Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/" className="title">
        Quiz
      </Link>
      <hr className="divider" />
    </div>
  );
};

export default Header;