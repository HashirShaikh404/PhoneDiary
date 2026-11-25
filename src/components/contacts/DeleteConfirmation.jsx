import './DeleteConfirmation.css';

// confirmation popup before deleting contact
export default function DeleteConfirmation({ contact, onConfirm, onCancel }) {
  return (
    <div className="delete-overlay" onClick={onCancel}>
      <div className="delete-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="delete-icon-wrapper">
          <span className="delete-icon">⚠️</span>
        </div>
        <h3>Delete Contact</h3>
        <p>
          Are you sure you want to delete <strong>{contact.name}</strong>?
          This action cannot be undone.
        </p>
        <div className="delete-actions">
          <button className="btn-cancel-delete" onClick={onCancel}>
            Cancel
          </button>
          <button className="btn-confirm-delete" onClick={() => onConfirm(contact.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
