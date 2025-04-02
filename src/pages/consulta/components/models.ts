import { Column } from 'components/models'
import { Tutelado } from 'pages/tutelado/components/models'
import { formatarData, formatarHora } from 'src/utils/string-utils'

export interface Consulta {
  id?: number
  tipoConsulta?: string
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
  tutelado?: Tutelado
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
    name: 'dataConsulta',
    label: 'Data da Consulta',
    field: (row: Consulta) => row.dataConsulta,
    format: formatarData,
    align: 'left',
  },
  {
    name: 'horaConsulta',
    label: 'Horário da Consulta',
    field: (row: Consulta) => row.dataConsulta,
    format: formatarHora,
    align: 'left',
  },
  {
    name: 'duracao',
    label: 'Duração',
    field: (row: Consulta) => row.duracao,
    align: 'left',
  },
  {
    name: 'tutelado',
    label: 'Tutelado',
    field: (row: Consulta) => row.tutelado?.nome,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]
