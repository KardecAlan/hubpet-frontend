export function base64ToBlob(base64, mimeType = '') {
  if(!base64) return new Blob

  const byteCharacters = atob(base64);

  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);


  return new Blob([byteArray], { type: mimeType });
}

export function base64ToFile(base64String, fileName, mimeType) {
  const blob = base64ToBlob(base64String)
  return new File([blob], fileName, { type: mimeType });
}

export function generateFileUrl(url) {
  if(!url) return
  return window.URL.createObjectURL(url)
}

export function downloadFile(blob, fileName) {
  const downloadLink = document.createElement('a')
  downloadLink.href = generateFileUrl(blob)
  downloadLink.download = fileName
  downloadLink.click()
}
