// validate form inputs and return errors
export function validateContact(contact) {
  const errors = {};

  // name is required
  if (!contact.name || !contact.name.trim()) {
    errors.name = 'Full name is required.';
  }

  // email is required and must look valid
  if (!contact.email || !contact.email.trim()) {
    errors.email = 'Email address is required.';
  } else if (!isValidEmail(contact.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }

  // phone is required and must look valid
  if (!contact.phone || !contact.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!isValidPhone(contact.phone.trim())) {
    errors.phone = 'Please enter a valid phone number.';
  }

  // address is required
  if (!contact.address || !contact.address.trim()) {
    errors.address = 'Address is required.';
  }

  return errors;
}

// check if there are no errors in the object
export function hasNoErrors(errors) {
  return Object.keys(errors).length === 0;
}

// check if email has valid format
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}

// check if phone has at least 7 digits and valid chars
function isValidPhone(phone) {
  const digitsOnly = phone.replace(/\D/g, '');
  if (digitsOnly.length < 7 || digitsOnly.length > 15) return false;

  const pattern = /^[+]?[\d\s\-().]+$/;
  return pattern.test(phone);
}
