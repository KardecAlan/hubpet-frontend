<script setup lang="ts">
import { getColor } from 'src/utils/color';
import { QChipProps } from 'quasar';

interface EqColorfulChipProps extends QChipProps {
  index: number
}
defineProps<EqColorfulChipProps>()
</script>

<template>
<q-chip
  :color="getColor(index)"
  :label="label"
  text-color="white"
  class="q-mx-xs q-ma-sm"
  size="md"
/>
</template>
