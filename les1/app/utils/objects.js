
export const isObjectEmpty = (obj) => {
  for (var key in obj) {
    return false;
  }
  return true;
}