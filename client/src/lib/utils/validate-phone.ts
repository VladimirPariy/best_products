export const validatePhone = (phone: string) => {
  const regExp = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
  return String(phone)
  .match(regExp);
}