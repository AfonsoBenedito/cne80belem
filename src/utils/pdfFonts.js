import nunitoRegularUrl from '../assets/fonts/Nunito-Regular.ttf';
import nunitoExtraBoldUrl from '../assets/fonts/Nunito-ExtraBold.ttf';
import nunitoItalicUrl from '../assets/fonts/Nunito-Italic.ttf';

let fontLoaded = false;

function arrayBufferToBase64(buffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// Nunito Italic, for titles of works in a prova's text (`*…*`): only fetched and embedded when
// a PDF has some
export async function registerNunitoItalic(doc) {
  if (doc.getFontList()['Nunito']?.includes('italic')) return;
  const buf = await (await fetch(nunitoItalicUrl)).arrayBuffer();
  doc.addFileToVFS('Nunito-Italic.ttf', arrayBufferToBase64(buf));
  doc.addFont('Nunito-Italic.ttf', 'Nunito', 'italic');
}

export async function registerNunito(doc) {
  if (fontLoaded && doc.getFontList()['Nunito']) return;

  const [regularRes, boldRes] = await Promise.all([
    fetch(nunitoRegularUrl),
    fetch(nunitoExtraBoldUrl),
  ]);
  const [regularBuf, boldBuf] = await Promise.all([
    regularRes.arrayBuffer(),
    boldRes.arrayBuffer(),
  ]);

  doc.addFileToVFS('Nunito-Regular.ttf', arrayBufferToBase64(regularBuf));
  doc.addFileToVFS('Nunito-ExtraBold.ttf', arrayBufferToBase64(boldBuf));
  doc.addFont('Nunito-Regular.ttf', 'Nunito', 'normal');
  doc.addFont('Nunito-ExtraBold.ttf', 'Nunito', 'bold');
  fontLoaded = true;
}
