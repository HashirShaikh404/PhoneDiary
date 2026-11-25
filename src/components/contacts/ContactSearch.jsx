import './ContactSearch.css';

// search bar component for filtering contacts
export default function ContactSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="contact-search">
      <span className="search-icon">🔍</span>
      <input
        type="text"
        className="search-input"
        placeholder="Search by name, email, or phone..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {/* clear button only shows when typing */}
      {searchTerm && (
        <button
          className="search-clear"
          onClick={() => onSearchChange('')}
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}
