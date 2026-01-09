import Header from "./Header";
import Footer from "./Footer";
import "./Layout.css";

function Layout({ children, className = "" }) {
  return (
    <div className="app-layout">
      <Header />
      <main className={`main-content ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;