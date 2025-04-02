<script setup lang="ts">
defineProps(['btnFilterClass', 'btnClearClass'])
defineEmits(['reset', 'submit'])
</script>

<template>
  <q-card
    class="rounded"
    tag="form"
    @reset="$emit('reset')"
    @submit.prevent="$emit('submit')"
  >
    <q-expansion-item
      expand-separator
      label="Filtros"
      default-opened
      class="expansion-item text-h6 text-weight-regular"
    >
      <q-card-section class="row justify-between items-center">
        <slot />
      </q-card-section>

      <q-card-actions class="q-px-md q-pb-md">
        <slot name="buttons">
          <div class="row full-width justify-end q-gutter-sm">
            <q-btn
              color="grey-4"
              text-color="dark"
              label="limpar"
              type="reset"
              :class="$props.btnFilterClass"
            />
            <q-btn
              color="primary"
              label="filtrar"
              type="submit"
              :class="$props.btnClearClass"
            />
          </div>
        </slot>
      </q-card-actions>
    </q-expansion-item>
  </q-card>
</template>

<style scoped>
:deep(.q-focus-helper) {
  visibility: hidden;
}
</style>
