import { Column } from 'components/models'
import { formatarCpf } from 'src/utils/string-utils'

export interface Consulta {
  id?: number
  versao?: number
  nome?: string
  cpf?: string
  dataNascimento?: string
  telefone?: string
  email?: string
  celular?: string
  observacoes?: string
}

export interface FiltroConsulta {
  dataInicio?: string
  dataFim?: string
}


export interface ConsultaFormProps {
  id: number
  isReadOnly: boolean
  modo: string
}

export const ConsultasColumns: Column[] = [
  {
    name: 'nome',
    label: 'Nome',
    field: (row: Consulta) => row.nome,
    align: 'left',
  },
  {
    name: 'cpf',
    label: 'Cpf',
    field: (row: Consulta) => row.cpf,
    format: formatarCpf,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]
