export const capitalize = (str) => {
  str = str.split("-").join(" ").split("_").join(" ");
  return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
};
