import Navbar from './Navbar';
import './Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <Navbar />
      <main className="main-content">
        <div className="diary-binder">
          {/* Decorative binder rings for a realistic, cute diary look */}
          <div className="binder-spine" aria-hidden="true">
            <span className="binder-ring"></span>
            <span className="binder-ring"></span>
            <span className="binder-ring"></span>
            <span className="binder-ring"></span>
            <span className="binder-ring"></span>
            <span className="binder-ring"></span>
          </div>

          <div className="diary-sheet">
            {children}
          </div>
        </div>
      </main>

      <footer className="diary-footer">
        <p>Personal Phone Diary • Saved with care</p>
      </footer>
    </div>
  );
}
