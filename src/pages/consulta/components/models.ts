import { Column } from 'components/models'

export interface Consulta {
  id?: number
  retorno?: boolean
  dataConsulta?: string
  duracao?: number
  consultaCancelada?: boolean
  anamnese?: string
  exameFisico?: string
  diagnostico?: string
  tratamento?: string
  proximosPassos?: string
  observacoes?: string
  tuteladoId?: number
}

export interface ParamsFiltroConsulta {
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
    field: (row: Consulta) => row.dataConsulta,
    align: 'left',
  },
  {
    name: 'cpf',
    label: 'Cpf',
    field: (row: Consulta) => row.retorno,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]
