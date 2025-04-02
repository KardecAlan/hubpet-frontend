<script setup lang="ts">
import { FormLabelProps } from 'components/models'

withDefaults(defineProps<FormLabelProps>(), {
  labelClass: 'text-dark text-h6',
})
</script>

<template>
  <span :class="labelClass" v-text="label"></span>
  <q-separator class="q-mb-md" />
</template>

<style scoped></style>
