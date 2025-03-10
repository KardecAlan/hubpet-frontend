<script setup lang="ts">
import { Paginacao } from 'components/models'
import { PesosColumns } from 'pages/tutelado/components/models'
import { QTableProps } from 'quasar'

defineEmits(['request'])

defineProps<QTableProps>()

const pagination = defineModel<Paginacao>('paginacao')
</script>

<template>
  <q-table
    v-bind="$props"
    :columns="PesosColumns"
    table-header-class="bg-light"
    :rows-per-page-options="[5, 10, 15, 20, 25, 50]"
    flat
    v-model:pagination="pagination"
  >
    <template #body-cell-acoes>
      <q-td>
        <div class="acoes row justify-center q-gutter-xs">
          <q-btn
            icon="visibility"
            color="info"
            dense
          >
            <q-tooltip anchor="top middle" self="bottom middle"
              >Visualizar</q-tooltip
            >
          </q-btn>
          <q-btn
            icon="edit_document"
            color="primary"
            dense
          >
            <q-tooltip anchor="top middle" self="bottom middle"
              >Editar</q-tooltip
            >
          </q-btn>
        </div>
      </q-td>
    </template>
  </q-table>
</template>

<style scoped>
.acoes {
  visibility: hidden;
}
tr:hover .acoes {
  visibility: visible;
}
</style>
