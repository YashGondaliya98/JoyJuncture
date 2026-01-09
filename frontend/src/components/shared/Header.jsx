import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import "./Header.css";

function Header() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <header className="app-header">
      <nav className="app-nav">
        <div className="nav-brand" onClick={() => goTo("/")}>
          <img src={logo} alt="Joy Juncture" className="logo-img" />
          <div className="logo-text">Joy Juncture</div>
        </div>

        <ul className="nav-links">
          <li onClick={() => goTo("/")}>Home</li>
          <li onClick={() => goTo("/about_us")}>About Us</li>
          <li onClick={() => goTo("/founder_story")}>Founder Story</li>
          <li className="nav-login-btn" onClick={() => goTo("/login")}>
            Login
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;