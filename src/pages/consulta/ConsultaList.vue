<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { useReadOnlyApi } from 'src/utils/api'
import { Paginacao } from 'components/models'
import TabelaConsultas from 'pages/consulta/components/TabelaConsultas.vue'
import { ParamsFiltroConsulta } from 'pages/consulta/components/models'
import FiltroConsulta from 'pages/consulta/components/FiltroConsulta.vue'

const filtro: Ref<ParamsFiltroConsulta> = ref({})

const tutores = ref([])
const loading = ref(false)

const api = useReadOnlyApi()

const paginacao: Ref<Paginacao> = ref({
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 5,
  rowsNumber: 1,
})

const listarTutores = async ({ pagination }: any = {}) => {
  loading.value = true
  if (pagination) paginacao.value = pagination

  const filtros = {
    ...filtro.value,
    sort: 'dataConsulta,asc',
  }

  const { content, totalElements } = await api.list('/consulta', filtros) ?? {}

  tutores.value = content
  paginacao.value.rowsNumber = totalElements
  loading.value = false
}

onMounted(listarTutores)
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" to="/" />
      <q-breadcrumbs-el label="Tutor" />
    </q-breadcrumbs>

    <filtro-consulta v-model="filtro" class="q-mb-md" @filter="listarTutores" />

    <tabela-consultas
      :rows="tutores"
      v-model:paginacao="paginacao"
      @request="listarTutores"
      :loading="loading"
    />
  </q-page>
</template>
<style scoped>
.buttons-container > * {
  font-weight: bold;
  margin-left: 8px;
}
</style>
