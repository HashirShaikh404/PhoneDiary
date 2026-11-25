import './ContactCard.css';

export default function ContactCard({ contact, onEdit, onDelete }) {
  // get first 2 letters for the avatar icon
  const initials = contact.name
    .split(' ')
    .map((word) => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="contact-card">
      <div className="card-header">
        <div className="card-avatar">{initials}</div>
        <div className="card-identity">
          <h3 className="card-name">{contact.name}</h3>
        </div>
      </div>

      {/* contact details */}
      <div className="card-details">
        <div className="card-field">
          <span className="field-icon">✉️</span>
          <span className="field-value">{contact.email}</span>
        </div>
        <div className="card-field">
          <span className="field-icon">📞</span>
          <span className="field-value">{contact.phone}</span>
        </div>
        <div className="card-field">
          <span className="field-icon">📍</span>
          <span className="field-value">{contact.address}</span>
        </div>
      </div>

      {/* edit and delete buttons */}
      <div className="card-actions">
        <button className="btn-edit" onClick={() => onEdit(contact)}>
          ✏️ Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(contact)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}
