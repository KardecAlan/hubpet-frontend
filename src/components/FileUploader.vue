<script setup lang="ts">
import { QFile } from 'quasar'
import { computed, ref } from 'vue'
import { generateFileUrl } from 'src/utils/file-utils'
import { useDropZone } from '@vueuse/core'
import { FileUploadProps } from 'components/models'

const props = withDefaults(defineProps<FileUploadProps>(), {
  dataTypes: () => ['image/jpeg', 'image/png'],
  accept: '.jpg, image/*',
  readonly: false,
})
const arquivo = defineModel<File>()
const arquivoUrl = computed(() => generateFileUrl(arquivo.value))

const dropZoneRef = ref<HTMLDivElement>()
const qFileRef = ref<QFile>()

if (!props.readonly) {
  useDropZone(dropZoneRef, {
    onDrop: (file: File[] | null) => {
      if (file) arquivo.value = file.at(0)
    },
    dataTypes: props.dataTypes,
    multiple: false,
    preventDefaultForUnhandled: false,
  })
}
</script>

<template>
  <div
    class="column full-width justify-between items-center dropzone q-pa-lg bg-blue-1 q-mb-md"
  >
    <div v-show="!arquivo" class="column items-center">
      <template v-if="readonly">
        <span class="q-mb-md">Nenhuma imagem disponível</span>
        <q-icon name="hide_image" size="lg" />
      </template>

      <template v-else>
        <span class="q-mb-md"
          >Arraste arquivos aqui ou clique para fazer o upload</span
        >
        <q-btn
          label="Enviar Arquivo"
          icon="cloud_upload"
          @click="qFileRef?.pickFiles()"
          color="primary"
        />
      </template>
    </div>
    <q-file
      v-model="arquivo"
      v-show="arquivo"
      ref="qFileRef"
      :accept="accept"
      class="full-width text-dark text-body1 q-mb-md"
      :clearable="!readonly"
      borderless
      :readonly="readonly"
    >
      <template v-slot:prepend>
        <q-icon name="cloud_upload" />
      </template>
    </q-file>
    <img
      v-show="arquivo"
      :src="arquivoUrl"
      class="shadow-4"
      style="max-width: 100%; max-height: 30em"
      alt=""
    />
  </div>
</template>

<style scoped lang="scss">
@import 'src/css/quasar.variables';

.dropzone {
  border-radius: 5px;
  border: 1px dashed $primary;
  border-image: none;
  margin-left: auto;
  margin-right: auto;
}
</style>
