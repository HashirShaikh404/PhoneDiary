import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import './Navbar.css';

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <header className="navbar">
      <div className="navbar-content">
        <div className="navbar-brand">
          <img src="/logo.png" alt="Phone Diary Logo" className="navbar-logo" />
          <div className="navbar-title-group">
            <div className="navbar-title-row">
              <h1 className="navbar-title">Phone Diary</h1>
            </div>
            <p className="navbar-subtitle">Contact Directory</p>
          </div>
        </div>

        <div className="navbar-actions">
          <button
            type="button"
            className="theme-toggle-btn"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
}
