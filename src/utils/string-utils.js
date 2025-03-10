function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

function formatarDataHora(dataStr) {
  const data = new Date(dataStr)
  return `${data.toLocaleDateString()} ${data.toLocaleTimeString()}`
}

function formatarHora(dataStr) {
  const data = new Date(dataStr)
  return data.toLocaleTimeString()
}

function formatarData(dataStr) {
  const data = new Date(dataStr)
  return data.toLocaleDateString()
}
function formatarCelular(number) {
  return number?.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
}

function formatarTelefone(number) {
  return number?.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
}

function formatarCpf(cpf) {
  return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(
    6,
    9
  )}-${cpf.substring(9, 12)}`
}

function normalizeString(str) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export {
  capitalize,
  formatarHora,
  formatarData,
  formatarDataHora,
  formatarCelular,
  formatarTelefone,
  formatarCpf,
  normalizeString
}
