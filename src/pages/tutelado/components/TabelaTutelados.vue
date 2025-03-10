<script setup lang="ts">
import { Paginacao } from 'components/models'
import { useRouter } from 'vue-router'
import { TuteladosColumns } from 'pages/tutelado/components/models'
import { QTableProps } from 'quasar'

defineEmits(['request', 'delete'])

defineProps<QTableProps>()

const pagination = defineModel<Paginacao>('paginacao')

const router = useRouter()

const redirecionar = (mode: string, id: number) =>
  router.push({
    name: `tutelado-${mode}`,
    query: { id },
  })
</script>

<template>
  <q-table
    v-bind="$props"
    title="Tutelados"
    :columns="TuteladosColumns"
    table-header-class="bg-light"
    :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
    class="rounded"
    v-model:pagination="pagination"
  >
    <template #top-right>
      <q-btn
        label="Novo Tutelado"
        color="primary"
        :to="{ name: 'tutelado-novo' }"
        rounded
      />
    </template>

    <template #body-cell-sexo="{ row }">
      <q-td>
        <q-chip
          :label="row.sexo"
          :icon-right="row.sexo === 'MACHO' ? 'fas fa-mars' : 'fas fa-venus'"
          :color="row.sexo === 'MACHO' ? 'blue' : 'pink'"
          text-color="white"
        />
      </q-td>
    </template>

    <template #body-cell-acoes="{ row }">
      <q-td>
        <div class="acoes row justify-center q-gutter-xs">
          <q-btn
            icon="visibility"
            color="info"
            dense
            @click="redirecionar('visualizar', row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"
              >Visualizar</q-tooltip
            >
          </q-btn>
          <q-btn
            icon="edit_document"
            color="primary"
            dense
            @click="redirecionar('editar', row.id)"
          >
            <q-tooltip anchor="top middle" self="bottom middle"
              >Editar</q-tooltip
            >
          </q-btn>
          <q-btn icon="fa-solid fa-trash" color="negative" dense @click="$emit('delete', row.id)">
            <q-tooltip anchor="top middle" self="bottom middle">Excluir</q-tooltip>
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<style scoped>
.acoes {
  visibility: visible;
}
tr:hover .acoes {
  visibility: visible;
}
</style>
