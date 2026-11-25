import { useState } from 'react';
import { useContacts } from '../hooks/useContacts';
import ContactSearch from '../components/contacts/ContactSearch';
import ContactList from '../components/contacts/ContactList';
import ContactForm from '../components/contacts/ContactForm';
import DeleteConfirmation from '../components/contacts/DeleteConfirmation';
import './Contacts.css';

export default function Contacts() {
  const {
    contacts,
    totalCount,
    searchTerm,
    setSearchTerm,
    addContact,
    updateContact,
    deleteContact,
    notification,
  } = useContacts();

  // state for modals and active contact
  const [editingContact, setEditingContact] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingContact, setDeletingContact] = useState(null);

  // open form modal to add new contact
  function handleAddClick() {
    setEditingContact(null);
    setIsFormOpen(true);
  }

  // open form modal to edit existing contact
  function handleEditClick(contact) {
    setEditingContact(contact);
    setIsFormOpen(true);
  }

  // handle submit for both add and edit
  function handleFormSubmit(formData) {
    let success;

    if (editingContact) {
      success = updateContact(editingContact.id, formData);
    } else {
      success = addContact(formData);
    }

    if (success) {
      setIsFormOpen(false);
      setEditingContact(null);
    }

    return success;
  }

  // close form modal
  function handleFormCancel() {
    setIsFormOpen(false);
    setEditingContact(null);
  }

  // open delete confirmation modal
  function handleDeleteClick(contact) {
    setDeletingContact(contact);
  }

  // confirm delete and close modal
  function handleDeleteConfirm(id) {
    deleteContact(id);
    setDeletingContact(null);
  }

  // cancel delete modal
  function handleDeleteCancel() {
    setDeletingContact(null);
  }

  return (
    <div className="contacts-page">
      {/* alert banner */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* search input and add button */}
      <div className="contacts-toolbar">
        <ContactSearch
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        <button className="btn-add" onClick={handleAddClick}>
          <span>+</span> Add Contact
        </button>
      </div>

      {/* contacts list */}
      <ContactList
        contacts={contacts}
        totalCount={totalCount}
        searchTerm={searchTerm}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* add or edit contact modal */}
      {isFormOpen && (
        <ContactForm
          contactToEdit={editingContact}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      )}

      {/* delete confirmation modal */}
      {deletingContact && (
        <DeleteConfirmation
          contact={deletingContact}
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}
    </div>
  );
}
