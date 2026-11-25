import ContactCard from './ContactCard';
import './ContactList.css';

// component that renders list of contacts or empty message
export default function ContactList({
  contacts,
  totalCount,
  searchTerm,
  onEdit,
  onDelete,
}) {
  // if no contacts added yet
  if (totalCount === 0) {
    return (
      <div className="contact-list-empty">
        <span className="empty-icon">📋</span>
        <h3>No contacts yet</h3>
        <p>Add your first contact to get started.</p>
      </div>
    );
  }

  // if search term has no results
  if (contacts.length === 0 && searchTerm) {
    return (
      <div className="contact-list-empty">
        <span className="empty-icon">🔍</span>
        <h3>No matching contacts</h3>
        <p>No contacts match "{searchTerm}". Try a different search.</p>
      </div>
    );
  }

  return (
    <div className="contact-list">
      {/* counter text */}
      <p className="contact-count">
        Showing {contacts.length} of {totalCount} contact{totalCount !== 1 ? 's' : ''}
      </p>

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
