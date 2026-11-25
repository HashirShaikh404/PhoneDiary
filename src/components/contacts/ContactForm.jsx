import { useState } from 'react';
import { validateContact, hasNoErrors } from '../../utils/validation';
import {
  X,
  User,
  Mail,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  NotebookPen,
  BookUser,
} from 'lucide-react';
import './ContactForm.css';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

export default function ContactForm({ contactToEdit, onSubmit, onCancel }) {
  const isEditing = contactToEdit !== null;

  const [formData, setFormData] = useState(() =>
    contactToEdit
      ? {
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      }
      : EMPTY_FORM
  );
  const [errors, setErrors] = useState({});

  // update state when inputs change and clear error for that field
  function handleChange(e) {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // clear the error message while user is typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  }

  // validate form inputs and call submit
  function handleSubmit(e) {
    e.preventDefault();

    const validationErrors = validateContact(formData);

    // stop here if there are errors
    if (!hasNoErrors(validationErrors)) {
      setErrors(validationErrors);
      return;
    }

    const success = onSubmit(formData);

    // clear form if submitted successfully
    if (success) {
      setFormData(EMPTY_FORM);
      setErrors({});
    }
  }

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal diary-modal" onClick={(e) => e.stopPropagation()}>
        {/* Top decorative bookmark strip */}
        <div className="modal-accent-bar" />

        <div className="modal-header">
          <div className="modal-title-group">
            <div className="modal-title-icon">
              {isEditing ? <NotebookPen size={20} /> : <BookUser size={20} />}
            </div>
            <div>
              <h2 className="modal-title">
                {isEditing ? 'Edit Diary Entry' : 'New Contact Entry'}
              </h2>
              <p className="modal-subtitle">
                {isEditing
                  ? 'Update contact details in your phone diary'
                  : 'Add a new contact to your personal directory'}
              </p>
            </div>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onCancel}
            title="Close dialog"
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          {/* Full Name */}
          <div className="form-group">
            <label htmlFor="name">
              <User size={14} className="label-icon" />
              <span>Full Name</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Eleanor Vance"
              className={errors.name ? 'input-error' : ''}
              autoFocus
            />
            {errors.name && (
              <span className="error-message">
                <AlertCircle size={13} />
                <span>{errors.name}</span>
              </span>
            )}
          </div>

          {/* Email Address */}
          <div className="form-group">
            <label htmlFor="email">
              <Mail size={14} className="label-icon" />
              <span>Email Address</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="e.g. eleanor@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && (
              <span className="error-message">
                <AlertCircle size={13} />
                <span>{errors.email}</span>
              </span>
            )}
          </div>

          {/* Phone Number */}
          <div className="form-group">
            <label htmlFor="phone">
              <Phone size={14} className="label-icon" />
              <span>Phone Number</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="e.g. +1 (555) 234-5678"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && (
              <span className="error-message">
                <AlertCircle size={13} />
                <span>{errors.phone}</span>
              </span>
            )}
          </div>

          {/* Postal / Physical Address */}
          <div className="form-group">
            <label htmlFor="address">
              <MapPin size={14} className="label-icon" />
              <span>Address</span>
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="e.g. 742 Evergreen Terrace, Springfield"
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && (
              <span className="error-message">
                <AlertCircle size={13} />
                <span>{errors.address}</span>
              </span>
            )}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              <X size={15} />
              <span>Cancel</span>
            </button>
            <button type="submit" className="btn-submit">
              <Check size={16} />
              <span>{isEditing ? 'Save Changes' : 'Add to Diary'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
