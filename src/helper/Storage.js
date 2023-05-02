// save object to the local storage
export const setAuthUser = (data) => {
  localStorage.setItem("user", JSON.stringify(data)); // stringify object to text
};

// get object from the local storage
export const getAuthUser = (data) => {
  if (localStorage.getItem("user")) {
    return JSON.parse(localStorage.getItem("user")); // parse text to object
  }
};

export const removeAuthUser = () => {
  if (localStorage.getItem("user")) {
    localStorage.removeItem("user");
  }
};
