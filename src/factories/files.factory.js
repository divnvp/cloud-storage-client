export function getFileExtension(fileName) {
  let fileNameDropDot = fileName.split(".");
  return fileNameDropDot[fileNameDropDot.length - 1];
}
