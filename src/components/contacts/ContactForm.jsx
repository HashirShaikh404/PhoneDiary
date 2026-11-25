import { useState, useEffect } from 'react';
import { validateContact, hasNoErrors } from '../../utils/validation';
import './ContactForm.css';

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

export default function ContactForm({ contactToEdit, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  const isEditing = contactToEdit !== null;

  // fill form if we are editing an existing contact
  useEffect(() => {
    if (contactToEdit) {
      setFormData({
        name: contactToEdit.name,
        email: contactToEdit.email,
        phone: contactToEdit.phone,
        address: contactToEdit.address,
      });
    } else {
      setFormData(EMPTY_FORM);
    }
    setErrors({});
  }, [contactToEdit]);

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
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{isEditing ? 'Edit Contact' : 'Add Contact'}</h2>
          <button className="modal-close" onClick={onCancel} title="Close">
            ✕
          </button>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={errors.name ? 'input-error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={errors.email ? 'input-error' : ''}
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+1 (555) 123-4567"
              className={errors.phone ? 'input-error' : ''}
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="123 Main St, City, Country"
              className={errors.address ? 'input-error' : ''}
            />
            {errors.address && <span className="error-message">{errors.address}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              {isEditing ? 'Save Changes' : 'Add Contact'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
