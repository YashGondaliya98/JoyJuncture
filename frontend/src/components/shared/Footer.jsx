import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  const goTo = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>🎉 Joy Juncture</h3>
          <p>
            A joyful ecosystem of games, experiences and community where play
            creates lasting connections.
          </p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li onClick={() => goTo("/")}>Home</li>
            <li onClick={() => goTo("/about_us")}>About Us</li>
            <li onClick={() => goTo("/founder_story")}>Founder Story</li>
            <li onClick={() => goTo("/gamestore")}>Game Store</li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Contact</h4>
          <p>📧 support@joyjuncture.com</p>
          <p>📞 +91 98765 43210</p>
          <p>📍 India</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Joy Juncture. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;