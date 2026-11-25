import { Mail, Phone, MapPin, Pencil, Trash2, PhoneCall, Send } from 'lucide-react';
import './ContactCard.css';

// Solid colors for contact pictures (no gradients)
const AVATAR_PALETTES = [
  { bg: '#c85a44', text: '#ffffff' }, // Terracotta
  { bg: '#4f6d63', text: '#ffffff' }, // Sage Green
  { bg: '#44586d', text: '#ffffff' }, // Slate Blue
  { bg: '#8c6832', text: '#ffffff' }, // Vintage Ochre
  { bg: '#7c5869', text: '#ffffff' }, // Muted Plum
  { bg: '#54585c', text: '#ffffff' }, // Charcoal
];

function getPalette(name) {
  if (!name) return AVATAR_PALETTES[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_PALETTES.length;
  return AVATAR_PALETTES[index];
}

export default function ContactCard({ contact, onEdit, onDelete }) {
  const initials = (contact.name || '')
    .trim()
    .split(/\s+/)
    .map((word) => word[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?';

  const palette = getPalette(contact.name);

  return (
    <article className="contact-card">
      <div className="card-header">
        <div
          className="card-avatar"
          style={{ backgroundColor: palette.bg, color: palette.text }}
          aria-hidden="true"
        >
          {initials}
        </div>
        <div className="card-identity">
          <h3 className="card-name" title={contact.name}>{contact.name}</h3>
          <span className="card-entry-tag">Diary Entry</span>
        </div>
      </div>

      {/* Contact details with Lucide icons */}
      <div className="card-details">
        <div className="card-field">
          <div className="field-icon-box field-icon-mail">
            <Mail size={14} />
          </div>
          <div className="field-content">
            <span className="field-label">Email</span>
            <a
              href={`mailto:${contact.email}`}
              className="field-value field-link"
              title={`Send email to ${contact.email}`}
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="card-field">
          <div className="field-icon-box field-icon-phone">
            <Phone size={14} />
          </div>
          <div className="field-content">
            <span className="field-label">Phone</span>
            <a
              href={`tel:${contact.phone}`}
              className="field-value field-link"
              title={`Call ${contact.phone}`}
            >
              {contact.phone}
            </a>
          </div>
        </div>

        <div className="card-field">
          <div className="field-icon-box field-icon-address">
            <MapPin size={14} />
          </div>
          <div className="field-content">
            <span className="field-label">Address</span>
            <span className="field-value">{contact.address}</span>
          </div>
        </div>
      </div>

      {/* Quick call/email actions */}
      <div className="card-quick-actions">
        {contact.phone && (
          <a
            href={`tel:${contact.phone}`}
            className="quick-action-pill pill-call"
            title="Call number"
          >
            <PhoneCall size={13} />
            <span>Call</span>
          </a>
        )}
        {contact.email && (
          <a
            href={`mailto:${contact.email}`}
            className="quick-action-pill pill-email"
            title="Send email"
          >
            <Send size={13} />
            <span>Email</span>
          </a>
        )}
      </div>

      {/* Card action controls: edit & delete with Lucide icons */}
      <div className="card-actions">
        <button
          type="button"
          className="btn-card-action btn-edit"
          onClick={() => onEdit(contact)}
          aria-label={`Edit ${contact.name}`}
        >
          <Pencil size={14} />
          <span>Edit</span>
        </button>
        <button
          type="button"
          className="btn-card-action btn-delete"
          onClick={() => onDelete(contact)}
          aria-label={`Delete ${contact.name}`}
        >
          <Trash2 size={14} />
          <span>Delete</span>
        </button>
      </div>
    </article>
  );
}
