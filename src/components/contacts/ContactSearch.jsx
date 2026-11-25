import { Search, X } from 'lucide-react';
import './ContactSearch.css';

export default function ContactSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="contact-search">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Search diary by name, email, or phone..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      {searchTerm && (
        <button
          type="button"
          className="search-clear"
          onClick={() => onSearchChange('')}
          title="Clear search"
          aria-label="Clear search"
        >
          <X size={15} />
        </button>
      )}
    </div>
  );
}
