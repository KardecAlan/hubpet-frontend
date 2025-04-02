import { Column } from 'components/models'
import {formatarCelular, formatarCpf, formatarTelefone} from 'src/utils/string-utils'

export interface Tutor {
  id?: number
  versao?: number
  nome?: string
  cpf?: string
  dataNascimento?: string
  telefone?: string
  email?: string
  celular?: string
  endereco?: Endereco
  observacoes?: string
}

export interface FiltroTutor {
  nome?: string
  cpf?: string
}

export interface Endereco {
  id?: number
  versao?: number
  cep: string
  complemento: string
  estado: string
  cidade: string
  bairro: string
  logradouro: string
  numero: string
}

export interface TutorFormProps {
  id: number
  isReadOnly: boolean
  modo: string
}

export const TutoresColumns: Column[] = [
  {
    name: 'nome',
    label: 'Nome',
    field: (row: Tutor) => row.nome,
    align: 'left',
  },
  {
    name: 'cpf',
    label: 'Cpf',
    field: (row: Tutor) => row.cpf,
    format: formatarCpf,
    align: 'left',
  },
  {
    name: 'email',
    label: 'Email',
    field: (row: Tutor) => row.email,
    align: 'left',
  },
  {
    name: 'celular',
    label: 'Celular',
    field: (row: Tutor) => row.celular,
    format: formatarCelular,
    align: 'left',
  },
  {
    name: 'telefone',
    label: 'Telefone',
    field: (row: Tutor) => row.telefone,
    format: formatarTelefone,
    align: 'left',
  },
  {
    name: 'acoes',
    label: '',
    field: 'acoes',
    align: 'left',
  },
]
