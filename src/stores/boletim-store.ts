import { defineStore } from 'pinia';
import { Processo } from 'components/models';

export const useBoletimStore = defineStore('boletim', {
  state: () => ({
    processosSelecionados: [] as Processo[],
  }),
  actions: {
    limparProcessos() {
      this.processosSelecionados = []
    }
  }
});
