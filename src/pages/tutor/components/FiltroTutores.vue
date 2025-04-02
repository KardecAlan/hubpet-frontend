<script setup lang="ts">
import EqFormInput from 'components/EqFormInput.vue'
import EqFormFiltro from 'components/EqFormFiltro.vue'
import { FiltroTutor } from 'pages/tutor/components/models'

const model = defineModel<FiltroTutor>({ required: true })

defineEmits(['filter'])
</script>

<template>
  <eq-form-filtro
    btn-clear-class="col-md-1 col-sm-12"
    btn-filter-class="col-md-1 col-sm-12"
    @reset="model = {}"
    @submit="$emit('filter')"
  >
    <eq-form-input
      v-model="model.nome"
      label="Nome"
      class="col-md-grow col-sm-12 q-mr-md"
    />

    <eq-form-input
      v-model="model.cpf"
      label="CPF"
      class="col-md-grow col-sm-12 q-mr-md"
    />
  </eq-form-filtro>
</template>

<style scoped>
:deep(.q-focus-helper) {
  visibility: hidden;
}
</style>
