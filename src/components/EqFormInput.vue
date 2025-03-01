<script setup lang="ts">
import { QInputProps } from 'quasar';

interface EqFormInputProps extends QInputProps {
  labelClass?: string | undefined,
  spaceClass?: string | undefined
}

withDefaults(defineProps<EqFormInputProps>(), {
  labelClass: 'text-dark text-subtitle2',
  spaceClass: 'q-pb-sm',
  bgColor: 'grey-1'
})
</script>

<template>
<div>
  <slot name="label">
    <span v-if="label" :class="labelClass">{{ label }}</span>
    <q-space :class="spaceClass"></q-space>
  </slot>
  <slot :props="$props">
    <q-input v-bind="$props" outlined class="rounded dark-border" :label="void 0" />
  </slot>
</div>
</template>
