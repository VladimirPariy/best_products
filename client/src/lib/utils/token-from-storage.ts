export const getTokenFromStorage = () => {
  return sessionStorage.getItem("token") || localStorage.getItem("token");
};

export const deleteTokenFromStorage = () => {
  sessionStorage.removeItem("token");
  localStorage.removeItem("token");
};
