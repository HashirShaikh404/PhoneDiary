import { BookOpen, SearchX, RotateCcw } from 'lucide-react';
import ContactCard from './ContactCard';
import './ContactList.css';

// component that renders list of contacts or empty message
export default function ContactList({
  contacts,
  totalCount,
  searchTerm,
  activeLetter = 'ALL',
  onResetFilter,
  onEdit,
  onDelete,
}) {
  // if no contacts added yet in the diary
  if (totalCount === 0) {
    return (
      <div className="contact-list-empty">
        <div className="empty-icon-bubble">
          <BookOpen size={36} className="empty-icon" />
        </div>
        <h3 className="empty-title">Your Phone Diary is Empty</h3>
        <p className="empty-desc">
          Add your friends, family, or colleagues by clicking the "New Entry" button above.
        </p>
      </div>
    );
  }

  // if search term or letter filter has no results
  if (contacts.length === 0) {
    return (
      <div className="contact-list-empty">
        <div className="empty-icon-bubble">
          <SearchX size={36} className="empty-icon" />
        </div>
        <h3 className="empty-title">No matching contacts</h3>
        <p className="empty-desc">
          {searchTerm
            ? `No diary entries matched "${searchTerm}".`
            : `No contacts starting with "${activeLetter}".`}
        </p>
        {onResetFilter && (
          <button type="button" className="btn-reset-filter" onClick={onResetFilter}>
            <RotateCcw size={14} />
            <span>Show all entries</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="contact-list">
      {/* Diary counter status */}
      <div className="contact-list-header">
        <p className="contact-count">
          Showing <strong>{contacts.length}</strong> of <strong>{totalCount}</strong> {totalCount === 1 ? 'entry' : 'entries'}
          {activeLetter !== 'ALL' && <span className="filter-pill">Letter: {activeLetter}</span>}
          {searchTerm && <span className="filter-pill">"{searchTerm}"</span>}
        </p>
      </div>

      {/* cards grid */}
      <div className="contact-grid">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
