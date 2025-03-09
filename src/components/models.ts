export interface Column {
  name: string
  label: string
  field: string | ((row: any) => any)
  required?: boolean
  align?: 'left' | 'right' | 'center'
  sortable?: boolean
  sort?: (a: any, b: any, rowA: any, rowB: any) => number
  rawSort?: (a: any, b: any, rowA: any, rowB: any) => number
  sortOrder?: 'ad' | 'da'
  format?: (val: any, row: any) => any
  style?: string | ((row: any) => string)
  classes?: string | ((row: any) => string)
  headerStyle?: string
  headerClasses?: string
}

export interface Paginacao {
  sortBy: 'desc' | 'asc'
  descending: boolean
  page: number
  rowsPerPage: number
  rowsNumber: number
}

export interface Combo {
  label?: string,
  value?: string | number
}

export interface FormLabelProps {
  label: string
  labelClass?: string
}

export interface FileUploadProps {
  readonly: boolean
  dataTypes?: string[]
  accept?: string
}
