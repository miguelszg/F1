
import '../css/footbar.css';

const Footbar = () => {
  return (
    <footer className="footbar">
      <div className="footbar-container">
        <nav className="footbar-links">
          <a href="/privacy" className="footbar-link">Privacy Policy</a>
          <a href="/terms" className="footbar-link">Terms of Service</a>
        </nav>
        <div className="footbar-copyright">
          © {new Date().getFullYear()} Your Website Name. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footbar;