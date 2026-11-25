import { useState, useMemo } from 'react';
import { useContacts } from '../hooks/useContacts';
import ContactSearch from '../components/contacts/ContactSearch';
import ContactList from '../components/contacts/ContactList';
import ContactForm from '../components/contacts/ContactForm';
import DeleteConfirmation from '../components/contacts/DeleteConfirmation';
import { UserPlus, CheckCircle2, AlertCircle, Bookmark, Sparkles } from 'lucide-react';
import './Contacts.css';

const ALPHABET = ['ALL', ...'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')];

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
  const [activeLetter, setActiveLetter] = useState('ALL');

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

  // Filter contacts by active alphabet tab
  const displayedContacts = useMemo(() => {
    if (activeLetter === 'ALL') {
      return contacts;
    }
    return contacts.filter((c) =>
      c.name.trim().toUpperCase().startsWith(activeLetter)
    );
  }, [contacts, activeLetter]);

  // Set of letters that have at least one contact (across all contacts)
  const availableLetters = useMemo(() => {
    const letters = new Set();
    contacts.forEach((c) => {
      if (c.name && c.name.trim().length > 0) {
        letters.add(c.name.trim()[0].toUpperCase());
      }
    });
    return letters;
  }, [contacts]);

  return (
    <div className="contacts-page">
      {/* alert banner */}
      {notification && (
        <div className={`notification notification-${notification.type}`}>
          {notification.type === 'success' ? (
            <CheckCircle2 size={18} className="notification-icon" />
          ) : (
            <AlertCircle size={18} className="notification-icon" />
          )}
          <span>{notification.message}</span>
        </div>
      )}

      {/* Diary Header Greeting */}
      <div className="diary-page-header">
        <div className="diary-greeting">
          <div className="diary-badge" aria-label="Bookmarked" title="Phone Diary">
            <Bookmark size={15} />
          </div>
          <h2 className="diary-heading">Directory Entries</h2>
          <p className="diary-subtext">
            Flip through your phone diary cards or find someone quickly.
          </p>
        </div>

        <button className="btn-add-contact" onClick={handleAddClick}>
          <UserPlus size={18} />
          <span>New Entry</span>
        </button>
      </div>

      {/* search input toolbar */}
      <div className="contacts-toolbar">
        <ContactSearch
          searchTerm={searchTerm}
          onSearchChange={(val) => {
            setSearchTerm(val);
            if (val && activeLetter !== 'ALL') {
              setActiveLetter('ALL');
            }
          }}
        />

        <div className="diary-stats-pill">
          <Sparkles size={14} className="stats-sparkle" />
          <span>
            <strong>{totalCount}</strong> {totalCount === 1 ? 'contact' : 'contacts'} in diary
          </span>
        </div>
      </div>

      {/* Phone Diary Alphabet Thumb Index Tabs */}
      <div className="alphabet-index-container">
        <span className="alphabet-label">Index:</span>
        <div className="alphabet-index-scroll">
          {ALPHABET.map((letter) => {
            const isSelected = activeLetter === letter;
            const hasContacts = letter === 'ALL' || availableLetters.has(letter);

            return (
              <button
                key={letter}
                type="button"
                className={`alphabet-tab ${isSelected ? 'active' : ''} ${!hasContacts && letter !== 'ALL' ? 'empty-letter' : ''
                  }`}
                onClick={() => setActiveLetter(letter)}
                title={letter === 'ALL' ? 'Show all entries' : `Show entries starting with ${letter}`}
              >
                {letter}
              </button>
            );
          })}
        </div>
      </div>

      {/* contacts list */}
      <ContactList
        contacts={displayedContacts}
        totalCount={totalCount}
        searchTerm={searchTerm}
        activeLetter={activeLetter}
        onResetFilter={() => {
          setActiveLetter('ALL');
          setSearchTerm('');
        }}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />

      {/* add or edit contact modal */}
      {isFormOpen && (
        <ContactForm
          key={editingContact ? editingContact.id : 'new'}
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
