<script setup lang="ts">
const model = defineModel<boolean>()
defineProps<{ message: string }>()
const emits = defineEmits(['confirm', 'cancel'])

const confirm = () => {
  emits('confirm')
  model.value = false
}
</script>

<template>
  <q-dialog v-model="model" @cancel="$emit('cancel')">
    <q-card>
      <q-card-section class="row items-center q-pa-lg">
        <q-icon name="warning" size="lg" color="warning"/>
        <span class="q-ml-sm text-body1 text-dark">{{ message }}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Cancelar" color="grey" v-close-popup />
        <q-btn flat label="Confirmar" color="negative" @click="confirm" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
