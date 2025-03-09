import { Column } from 'components/models'
import { Tutor } from 'pages/tutor/components/models'

export interface Tutelado {
  tutor?: Tutor
  id?: number
  versao?: number
  nome?: string
  microchip?: string
  dataNascimento?: string
  especie?: string
  raca?: string
  sexo?: 'MACHO' | 'FEMEA'
  vivo?: boolean
  temperamento?: string
  porte?: 'PEQUENO' | 'MEDIO' | 'GRANDE'
  pelagem?: string
  castrado?: 'SIM' | 'NAO' | 'INDEFINIDO'
  observacoes?: string
}
export interface Atributo {
  id?: number
  descricao?: string
}

export interface ParamsFiltroTutelado {
  nome?: string
  cpf?: string
}

export interface TuteladoFormProps {
  id: number
  isReadOnly: boolean
  modo: string
}

export const TuteladosColumns: Column[] = [
  {
    name: 'nome',
    label: 'Nome',
    field: (row: Tutelado) => row.nome,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]
