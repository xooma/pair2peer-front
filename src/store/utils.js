/* eslint-disable import/prefer-default-export */
// == URI from server
export const API_URI = 'http://localhost:3000';

// == Utils function to capitalize first letter
export const firstLetterToUppercase = (string) => {
  const splitStr = string.toLowerCase().split(' ');
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(' ');
};

export const cutStringToNCharacter = (string, length) => {
  if (string) {
    return string.substring(0, length);
  }
};
