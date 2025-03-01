import { defineStore } from 'pinia';
import { api } from 'boot/axios';
import { useStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', {
  state: () => (useStorage('auth', {
    token: '',
    refreshToken: '',
    name: '',
    roles: [] as string[]
  })),
  getters: {
    isLoggedIn: (state) => !!state.token,
    displayName: (state) => {
      const parts = state.name.split(' ')
      if(parts.length === 1) return parts.at(0)
      return `${parts.at(0) ?? ''} ${parts.at(-1) ?? ''}`
    },
    firstName: (state) => state.name.split(' ').at(0) ?? '',
    bearerToken: state => state.token ? `Bearer ${state.token}` : null
  },
  actions: {
    async login(email: string, password: string) {
        const { data } =  await api.post('/autenticacao/login', { email, senha: password })
        this.token = data.token
        this.refreshToken = data.refreshToken
        this.name = data.nome
        this.roles = data.cargos
    },
    logout() {
      this.token = ''
      this.name = ''
      this.roles = []
    },
    hasRoles(allowedRoles: string[]) {
      return this.roles.some(role => allowedRoles?.includes(role))
    }
  },
});
