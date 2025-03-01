export interface BoletimMinisterial {
  id?: number,
  numero?: number,
  trimestre?: number,
  ano?: number,
  tags?: string[],
  status?: string,
  capa?: File,
  cabecalho?: File,
  processos?: Processo[]
}

export interface Processo {
  id?: number,
  numero_processo?: string,
  procuradoria?: string,
  tipo?: string,
  tema?: string,
  data_envio?: string,
  destaque?: string,
  informacao_inteiro_teor?: string ,
  tags?: string[],
  status?: 'Novo' | 'Visualizado' | `Publicado Nº ${number}`,
  boletinId?: number
}

export interface Column {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  required?: boolean;
  align?: 'left' | 'right' | 'center';
  sortable?: boolean;
  sort?: (a: any, b: any, rowA: any, rowB: any) => number;
  rawSort?: (a: any, b: any, rowA: any, rowB: any) => number;
  sortOrder?: 'ad' | 'da';
  format?: (val: any, row: any) => any;
  style?: string | ((row: any) => string);
  classes?: string | ((row: any) => string);
  headerStyle?: string;
  headerClasses?: string;
}

export interface Paginacao {
  sortBy: 'desc' | 'asc',
  descending: boolean,
  page: number,
  rowsPerPage: number,
  rowsNumber: number
}

export const trimestres = [
  { label: '1º Trimestre (Jan/Fev/Mar)', value: 1 },
  { label: '2º Trimestre (Abr/Mai/Jun)', value: 2 },
  { label: '3º Trimestre (Jul/Ago/Set)', value: 3 },
  { label: '4º Trimestre (Out/Nov/Dez)', value: 4 }
]

export interface FormLabelProps {
  label: string,
  labelClass?: string
}
