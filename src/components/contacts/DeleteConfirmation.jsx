import { AlertTriangle, Trash2, X } from 'lucide-react';
import './DeleteConfirmation.css';

// confirmation popup before deleting contact
export default function DeleteConfirmation({ contact, onConfirm, onCancel }) {
  return (
    <div className="delete-overlay" onClick={onCancel}>
      <div className="delete-dialog diary-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="delete-accent-tab" />

        <div className="delete-icon-wrapper">
          <div className="delete-icon-circle">
            <AlertTriangle size={28} className="delete-warning-icon" />
          </div>
        </div>

        <h3 className="delete-title">Remove from Diary</h3>
        <p className="delete-text">
          Are you sure you want to remove <strong>{contact.name}</strong>?
          This diary entry will be permanently deleted from your address book.
        </p>

        <div className="delete-actions">
          <button type="button" className="btn-cancel-delete" onClick={onCancel}>
            <X size={15} />
            <span>Keep Entry</span>
          </button>
          <button
            type="button"
            className="btn-confirm-delete"
            onClick={() => onConfirm(contact.id)}
          >
            <Trash2 size={15} />
            <span>Delete Entry</span>
          </button>
        </div>
      </div>
    </div>
  );
}
