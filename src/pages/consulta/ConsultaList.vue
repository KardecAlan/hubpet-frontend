<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useCrudApi } from 'src/utils/api';
import { Paginacao } from 'components/models';
import TabelaConsultas from 'pages/consulta/components/TabelaConsultas.vue';
import { ParamsFiltroConsulta } from 'pages/consulta/components/models';
import FiltroConsulta from 'pages/consulta/components/FiltroConsulta.vue';
import { useQuasar } from 'quasar';

const filtro: Ref<ParamsFiltroConsulta> = ref({})

const tutores = ref([])
const loading = ref(false)

const api = useCrudApi()
const $q = useQuasar()

const paginacao: Ref<Paginacao> = ref({
  sortBy: 'desc',
  descending: false,
  page: 0,
  rowsPerPage: 5,
  rowsNumber: 1,
})

const listarConsultas = async ({ pagination }: any = {}) => {
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

const deletarConsulta = async (id: number) => {
  const options = {
    title: 'Confirmar',
    message: 'Você tem certeza que deseja cancelar a consulta?',
    ok: {
      label: 'Confirmar',
      color: 'negative'
    },
    cancel: {
    }
  }

  $q.dialog(options).onOk(() => {
    api.delete('/consulta', id)
      .then(() => {
        listarConsultas()
        $q.notify({
          color: 'positive',
          message: 'Consulta cancelada com sucesso!',
          position: 'bottom',
          icon: 'check_circle',
        })
      })
  })
}

onMounted(listarConsultas)
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" to="/" />
      <q-breadcrumbs-el label="Tutor" />
    </q-breadcrumbs>

    <filtro-consulta v-model="filtro" class="q-mb-md" @filter="listarConsultas" />

    <tabela-consultas
      @delete="deletarConsulta"
      :rows="tutores"
      v-model:paginacao="paginacao"
      @request="listarConsultas"
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
