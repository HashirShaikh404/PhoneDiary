import { useState, useEffect } from 'react';
import { getContacts, saveContacts, generateId } from '../services/contactService';

// custom hook to manage all contacts state and actions
export function useContacts() {
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  // load saved contacts from local storage on page load
  useEffect(() => {
    const stored = getContacts();
    setContacts(stored);
  }, []);

  // show notification and hide it after 3 seconds
  function showNotification(message, type = 'success') {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }

  // add a new contact to the list
  function addContact(contactData) {
    const newContact = {
      ...contactData,
      id: generateId(),
      name: contactData.name.trim(),
      email: contactData.email.trim(),
      phone: contactData.phone.trim(),
      address: contactData.address.trim(),
    };

    const updated = [...contacts, newContact];

    // save to storage and update list
    try {
      saveContacts(updated);
      setContacts(updated);
      showNotification('Contact added successfully!');
      return true;
    } catch (error) {
      showNotification(error.message, 'error');
      return false;
    }
  }

  // find contact by id and update it
  function updateContact(id, contactData) {
    const updated = contacts.map((contact) => {
      if (contact.id === id) {
        return {
          ...contact,
          name: contactData.name.trim(),
          email: contactData.email.trim(),
          phone: contactData.phone.trim(),
          address: contactData.address.trim(),
        };
      }
      return contact;
    });

    // save changes to storage
    try {
      saveContacts(updated);
      setContacts(updated);
      showNotification('Contact updated successfully!');
      return true;
    } catch (error) {
      showNotification(error.message, 'error');
      return false;
    }
  }

  // remove contact from list by id
  function deleteContact(id) {
    const updated = contacts.filter((contact) => contact.id !== id);

    // save remaining contacts to storage
    try {
      saveContacts(updated);
      setContacts(updated);
      showNotification('Contact deleted successfully!');
      return true;
    } catch (error) {
      showNotification(error.message, 'error');
      return false;
    }
  }

  // filter contacts by name, email, or phone
  const filteredContacts = contacts.filter((contact) => {
    if (!searchTerm.trim()) return true;

    const term = searchTerm.toLowerCase();
    return (
      contact.name.toLowerCase().includes(term) ||
      contact.email.toLowerCase().includes(term) ||
      contact.phone.toLowerCase().includes(term)
    );
  });

  return {
    contacts: filteredContacts,
    totalCount: contacts.length,
    searchTerm,
    setSearchTerm,
    addContact,
    updateContact,
    deleteContact,
    notification,
  };
}
