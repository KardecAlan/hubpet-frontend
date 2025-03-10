<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { useCrudApi } from 'src/utils/api';
import { Paginacao } from 'components/models'
import TabelaTutores from 'pages/tutor/components/TabelaTutores.vue'
import FiltroTutores from 'pages/tutor/components/FiltroTutores.vue'
import { FiltroTutor } from 'pages/tutor/components/models'
import { useQuasar } from 'quasar';

const filtro: Ref<FiltroTutor> = ref({})

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

const listarTutores = async ({ pagination }: any = {}) => {
  loading.value = true
  if (pagination) paginacao.value = pagination

  const filtros = {
    ...filtro.value,
  }

  const { content, totalElements } = (await api.list('/tutor', filtros)) ?? {}

  tutores.value = content
  paginacao.value.rowsNumber = totalElements
  loading.value = false
}


const deletarTutor = async (id: number) => {
  const options = {
    title: 'Confirmar',
    message: 'Você tem certeza que deseja excluir o tutor?',
    ok: {
      label: 'Confirmar',
      color: 'negative'
    },
    cancel: {
    }
  }

  $q.dialog(options).onOk(() => {
    api.delete('/tutor', id)
      .then(() => {
        listarTutores()
        $q.notify({
          color: 'positive',
          message: 'Tutor excluído com sucesso!',
          position: 'bottom',
          icon: 'check_circle',
        })
      })
  })
}

onMounted(listarTutores)
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" to="/" />
      <q-breadcrumbs-el label="Tutor" />
    </q-breadcrumbs>

    <filtro-tutores v-model="filtro" class="q-mb-md" @filter="listarTutores" />

    <tabela-tutores
      :rows="tutores"
      v-model:paginacao="paginacao"
      @request="listarTutores"
      @delete="deletarTutor"
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
