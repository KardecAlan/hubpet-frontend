<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { useCrudApi } from 'src/utils/api'
import EqFormInput from 'components/EqFormInput.vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import FormLabel from 'components/FormLabel.vue'
import { Consulta, ConsultaFormProps } from 'pages/consulta/components/models'
import { Tutelado } from 'pages/tutelado/components/models'

const props = defineProps<ConsultaFormProps>()

const form: Ref<Consulta> = ref({ retorno: false })
const tutelados: Ref<Tutelado[]> = ref([])

const consultaDetalhada = ref(false)

const router = useRouter()
const api = useCrudApi()

const isVisualizar = props.isReadOnly

const carregarTutelados = async () => {
  const { content } = await api.list('/tutelado', {}) ?? {}

  tutelados.value = content
}

const carregarConsulta = async () => {
  if (!props.id) {
    return
  }

  const data = await api.get(`/consulta/${props.id}`)
  if (data) Object.assign(form.value, data)
}


const salvarConsulta = async () => {
  const response = await api.save('/consulta', form.value, props.id)

  if (!response) {
    return
  }

  Notify.create({
    icon: 'check_circle',
    color: 'positive',
    position: 'bottom',
    message: 'Tutor salvo com sucesso!',
    progress: true,
  })

  voltarPagina()
}

const voltarPagina = () => router.back()


onMounted(async () => {
  await carregarConsulta()
  await carregarTutelados()
})
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" :to="{ name: 'home' }" />

      <q-breadcrumbs-el label="Consulta" :to="{ name: 'consulta-listagem' }" />

      <q-breadcrumbs-el :label="modo" />
    </q-breadcrumbs>

    <q-card class="rounded">
      <q-card-section>
        <form-label label="Consulta" />

        <div class="row q-col-gutter-x-md">

          <eq-form-input
            model-value=""
            label="Tutelado"
            class="col-md-3 col-12"
            outlined
            :readonly="isVisualizar"
          >
            <q-select
              v-model="form.tuteladoId"
              outlined
              class="bg-grey-1"
              input-debounce="400"
              use-input
              emit-value
              map-options
              option-value="id"
              option-label="nome"
              :options="tutelados"
            />
          </eq-form-input>


          <eq-form-input
            v-model="form.dataConsulta"
            type="date"
            label="Data da consulta"
            class="col-md-3 col-sm-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.duracao"
            type="number"
            label="Duração"
            class="col-md-3 col-sm-12"
            outlined
            :readonly="isVisualizar"
          />

          <q-toggle
            v-model="form.retorno"
            label="Retorno?"
            left-label
            class="col-md-1 col-sm-6"
            :readonly="isVisualizar"
          />

          <q-toggle
            v-model="consultaDetalhada"
            label="Consulta detalhada?"
            left-label
            class="col-md-1 col-sm-6"
            :readonly="isVisualizar"

          />

          <eq-form-input
            v-model="form.anamnese"
            label="Anamnese"
            class="col-12"
            autogrow
            outlined
            :readonly="isVisualizar"

          />

          <eq-form-input
            v-show="consultaDetalhada"
            v-model="form.exameFisico"
            label="Exame Físico"
            class="col-12"
            autogrow
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-show="consultaDetalhada"
            v-model="form.diagnostico"
            label="Diagnóstico"
            autogrow
            class="col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-show="consultaDetalhada"
            v-model="form.tratamento"
            label="Tratamento"
            autogrow
            class="col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-show="consultaDetalhada"
            v-model="form.proximosPassos"
            label="Próximos Passos"
            autogrow
            class="col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.observacoes"
            label="Observações"
            class="col-12"
            autogrow
            outlined
            :readonly="isVisualizar"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-mr-sm q-mt-sm">
        <q-btn
          label="Sair"
          style="width: 4em"
          color="grey-7"
          no-caps
          @click="voltarPagina"
        />

        <q-btn
          v-if="!isVisualizar"
          label="Salvar"
          style="width: 5em"
          color="primary"
          no-caps
          @click="salvarConsulta"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>
