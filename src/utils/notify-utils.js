import { Notify } from 'quasar'

const DEFAULT_ERROR_MESSAGE =
  'Ocorreu um erro inesperado. Tente novamente mais tarde'
const DEFAULT_SUCESS_MESSAGE = 'Operação realizada com sucesso'

export const notify = {
  success: (message) =>
    Notify.create({
      icon: 'check_circle',
      color: 'positive',
      position: 'bottom',
      message: message ?? DEFAULT_SUCESS_MESSAGE,
      progress: true,
    }),
  error: (message) =>
    Notify.create({
      icon: 'error',
      color: 'negative',
      position: 'bottom',
      message: message ?? DEFAULT_ERROR_MESSAGE,
      progress: true,
    }),
  warn: (message) =>
    Notify.create({
      icon: 'warning',
      color: 'warning',
      position: 'bottom',
      textColor: 'dark',
      message: message,
      progress: true,
    }),
  info: (message) =>
    Notify.create({
      icon: 'info',
      color: 'info',
      position: 'bottom',
      message: message,
      progress: true,
    }),
}
