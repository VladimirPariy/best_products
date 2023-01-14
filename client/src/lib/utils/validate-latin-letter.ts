export const validateLatinLetter = (str: string) => {
  return String(str)
    .toLowerCase()
    .match(/^([A-Za-z0-9]*)$/gi);
};
