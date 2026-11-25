import './Navbar.css';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img src="/logo.png" alt="Phone Diary Logo" className="navbar-logo" />
          <div className="navbar-title-group">
            <div className="navbar-title-row">
              <h1 className="navbar-title">Phone Diary</h1>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
