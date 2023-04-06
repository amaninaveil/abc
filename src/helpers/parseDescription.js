const parseDescription = (descriptionString) => {
  if (descriptionString) {
    var arr = descriptionString.replace(/'/g, '"');
    return JSON.parse(arr);
  }
  return [];
};
export default parseDescription;
