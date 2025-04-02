<script setup lang="ts">
import FormLabel from 'components/FormLabel.vue'
import TabelaPesos from 'pages/tutelado/components/TabelaPesos.vue'
import { onMounted, ref, Ref } from 'vue'
import { useCrudApi } from 'src/utils/api'
import { Peso } from 'pages/tutelado/components/models'

interface HistoricoPesoProps {
  idTutelado: number
}

const props = defineProps<HistoricoPesoProps>()

const api = useCrudApi()

const pesos: Ref<Peso[]> = ref([])

const carregarPesos = async () => {
  const { content } = await api.list(`/tutelado/${props.idTutelado}/peso`)

  pesos.value = content
}

onMounted(carregarPesos)
</script>

<template>
  <q-card class="q-pa-md">
    <form-label label="Históricos de Peso" />

    <q-card-section class="q-pa-none">
      <tabela-pesos :rows="pesos" />
    </q-card-section>

    <q-card-actions align="right">
      <q-btn flat label="OK" color="primary" v-close-popup />
    </q-card-actions>

  </q-card>
</template>

<style scoped></style>
