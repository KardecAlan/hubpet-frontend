function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function maskNumeroProcesso(numeroProcesso) {
  const numero = numeroProcesso.slice(4)
  const ano = numeroProcesso.slice(0, 4)
  return `${numero}/${ano}`;
}

function formatarCpf(cpf) {
  return `${cpf.substring(0,3)}.${cpf.substring(3,6)}.${cpf.substring(6,9)}-${cpf.substring(9,12)}`
}

function wrapCsvValue (val, formatFn, row) {
  let formatted = formatFn !== void 0
    ? formatFn(val, row)
    : val

  formatted = String(formatted ?? '')

  formatted = formatted.split('"').join('""')

  return `"${formatted}"`
}

function exportTable(columns, rows) {
  return [columns.map(col => wrapCsvValue(col.label))].concat(
    rows.map(row => columns.map(col => wrapCsvValue(
      typeof col.field === 'function'
        ? col.field(row)
        : row[col.field === void 0 ? col.name : col.field],
      col.format,
      row
    )).join(','))
  ).join('\r\n')
}


export { capitalize, exportTable, wrapCsvValue, maskNumeroProcesso, formatarCpf }
