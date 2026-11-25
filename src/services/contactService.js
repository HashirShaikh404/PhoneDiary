const STORAGE_KEY = 'contact-manager-contacts';

// get contacts list from local storage
export function getContacts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];

    const parsed = JSON.parse(raw);

    // make sure it is actually an array
    if (!Array.isArray(parsed)) return [];

    return parsed;
  } catch {
    return [];
  }
}

// save contacts to local storage
export function saveContacts(contacts) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
  } catch (error) {
    throw new Error('Failed to save contacts. Your browser storage may be full.');
  }
}

// make a random unique id for new contact
export function generateId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9);
}
