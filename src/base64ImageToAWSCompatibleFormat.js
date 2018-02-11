const atob = require('atob');

module.exports = (encodedFile) => {
  const base64Image = encodedFile.split('data:image/png;base64,')[1];
  const binaryImg = atob(base64Image);
  const length = binaryImg.length;
  const ab = new ArrayBuffer(length);
  const ua = new Uint8Array(ab);
  for (let i = 0; i < length; i++) {
    ua[i] = binaryImg.charCodeAt(i);
  }
  return ab;
}