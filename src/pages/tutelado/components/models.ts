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

export interface Peso {
  dataCadastro?: string,
  pesoEmKg?: number,
  condicaoCorporal: 'MUITO_MAGRO' | 'MAGRO' | 'SAUDAVEL' | 'OBESO'
  observacao: string,
  tutelado: Tutelado
}

export interface ParamsFiltroTutelado {
  nome?: string
  tutor?: string
}

export interface TuteladoFormProps {
  id: number
  isReadOnly: boolean
  modo: string
}

export const TuteladosColumns: Column[] = [
  {
    name: 'tutelado',
    label: 'Tutelado',
    field: (row: Tutelado) => row.nome,
    align: 'left',
  },
  {
    name: 'tutor',
    label: 'Tutor',
    field: (row: Tutelado) => row.tutor?.nome,
    align: 'left',
  },
  {
    name: 'raca',
    label: 'Raça',
    field: (row: Tutelado) => row.raca,
    align: 'left',
  },
  {
    name: 'sexo',
    label: 'Sexo',
    field: (row: Tutelado) => row.sexo,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]


export const PesosColumns: Column[] = [
  {
    name: 'dataCadastro',
    label: 'Data de Cadastro',
    field: (row: Peso) => row.dataCadastro,
    align: 'left',
  },
  {
    name: 'peso',
    label: 'Peso (Kg)',
    field: (row: Peso) => row.pesoEmKg,
    align: 'left',
  },
  {
    name: 'condicaoCorporal',
    label: 'Condição Corporal',
    field: (row: Peso) => row.condicaoCorporal,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]
