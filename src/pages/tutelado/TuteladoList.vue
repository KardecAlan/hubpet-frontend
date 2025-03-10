<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { useCrudApi } from 'src/utils/api';
import { Paginacao } from 'components/models'
import FiltroTutelado from 'pages/tutelado/components/FiltroTutelado.vue'
import TabelaTutelados from 'pages/tutelado/components/TabelaTutelados.vue'
import { ParamsFiltroTutelado } from 'pages/tutelado/components/models'
import { useQuasar } from 'quasar';

const filtro: Ref<ParamsFiltroTutelado> = ref({})

const tutelados = ref([])
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

const listarTutelados = async ({ pagination }: any = {}) => {
  loading.value = true
  if (pagination) paginacao.value = pagination

  const filtros = {
    ...filtro.value,
  }

  const { content, totalElements } =
    (await api.list('/tutelado', filtros)) ?? {}

  tutelados.value = content
  paginacao.value.rowsNumber = totalElements
  loading.value = false
}

const deletarTutelado = async (id: number) => {
  const options = {
    title: 'Confirmar',
    message: 'Você tem certeza que deseja excluir o tutelado?',
    ok: {
      label: 'Confirmar',
      color: 'negative'
    },
    cancel: {
    }
  }

  $q.dialog(options).onOk(() => {
    api.delete('/tutelado', id)
      .then(() => {
        listarTutelados()
        $q.notify({
          color: 'positive',
          message: 'Tutelado excluído com sucesso!',
          position: 'bottom',
          icon: 'check_circle',
        })
      })
  })
}

onMounted(listarTutelados)
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" to="/" />
      <q-breadcrumbs-el label="Tutelados" />
    </q-breadcrumbs>

    <filtro-tutelado
      v-model="filtro"
      class="q-mb-md"
      @filter="listarTutelados"
    />

    <tabela-tutelados
      :rows="tutelados"
      v-model:paginacao="paginacao"
      @request="listarTutelados"
      @delete="deletarTutelado"
      :loading="loading"
    />
  </q-page>
</template>
