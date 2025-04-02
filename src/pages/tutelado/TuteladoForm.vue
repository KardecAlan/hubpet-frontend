<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue'
import { useCrudApi } from 'src/utils/api'
import EqFormInput from 'components/EqFormInput.vue'
import { useRouter } from 'vue-router'
import { Notify } from 'quasar'
import { TutorFormProps } from 'pages/tutor/components/models'
import FormLabel from 'components/FormLabel.vue'
import { Tutelado } from 'pages/tutelado/components/models'
import { Combo } from 'components/models'
import HistoricoPeso from 'pages/tutelado/components/HistoricoPeso.vue'

const props = defineProps<TutorFormProps>()

const form: Ref<Tutelado> = ref({
  vivo: true,
})

const tutorCombo: Ref<Combo> = ref({ label: undefined, value: undefined })
const dialogHistoricoPeso = ref(false)

const router = useRouter()
const api = useCrudApi()

const isVisualizar = props.isReadOnly

const tutorOptions = ref([])

const sexoOptions = [
  { label: 'Macho', value: 'MACHO' },
  { label: 'Fêmea', value: 'FEMEA' },
]

const porteOptions = [
  { label: 'Pequeno', value: 'PEQUENO' },
  { label: 'Médio', value: 'MEDIO' },
  { label: 'Grande', value: 'GRANDE' },
]

const simNaoOptions = [
  { label: 'Sim', value: 'SIM' },
  { label: 'Não', value: 'NAO' },
  { label: 'Indefinido', value: 'INDEFINIDO' },
]

const carregarTutelado = async () => {
  if (!props.id) {
    return
  }

  const data = await api.get(`/tutelado/${props.id}`)
  if (data) Object.assign(form.value, data)

  tutorCombo.value = { label: data.tutor?.nome, value: data.tutor?.id }
}

const salvarTutelado = async () => {
  const dto = {
    ...form.value,
    tutor: { id: tutorCombo.value.value },
  }
  const response = await api.save('/tutelado', dto, props.id)

  if (!response) {
    return
  }

  Notify.create({
    icon: 'check_circle',
    color: 'positive',
    position: 'bottom',
    message: 'Tutelado salvo com sucesso!',
    progress: true,
  })

  voltarPagina()
}

const carregarTutor = async (nome: string) => {
  tutorOptions.value = await api.list('/tutor/combo', { nome })
}
const voltarPagina = () => router.back()

const onMountedHook = async () => {
  await carregarTutelado()
  await carregarTutor(form.value.tutor?.nome ?? '')
}

onMounted(onMountedHook)
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" :to="{ name: 'home' }" />

      <q-breadcrumbs-el label="Tutelados" :to="{ name: 'tutelado-listagem' }" />

      <q-breadcrumbs-el :label="modo" />
    </q-breadcrumbs>

    <q-card class="rounded">
      <q-card-section>
        <form-label label="Identificação" />

        <div class="row q-col-gutter-x-md">
          <eq-form-input
            v-model="form.nome"
            label="Nome do pet"
            class="col-md-4 col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.microchip"
            label="Microchip"
            class="col-md-4 col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.especie"
            label="Espécie"
            class="col-md-4 col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.raca"
            label="Raça"
            class="col-md-4 col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.dataNascimento"
            type="date"
            label="Data de nascimento"
            class="col-md-4 col-sm-12"
            outlined
            :readonly="isVisualizar"
          />

          <q-space />

          <eq-form-input
            model-value=""
            label="Sexo"
            class="col-md-4 col-12"
            outlined
            :readonly="isVisualizar"
          >
            <q-option-group v-model="form.sexo" :options="sexoOptions" inline />
          </eq-form-input>

          <q-checkbox v-model="form.vivo" label="Animal está vivo?" />
        </div>
      </q-card-section>

      <q-card-section>
        <form-label label="Dados Complementares" />

        <div class="row q-col-gutter-x-md">
          <eq-form-input
            v-model="form.temperamento"
            label="Temperamento"
            class="col-md-3 col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            model-value=""
            label="Porte"
            class="col-md-3 col-12"
            :readonly="isVisualizar"
          >
            <q-select
              v-model="form.porte"
              :options="porteOptions"
              outlined
              emit-value
              map-options
              class="bg-grey-1"
            />
          </eq-form-input>

          <eq-form-input
            v-model="form.pelagem"
            label="Pelagem"
            class="col-md-3 col-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            model-value=""
            label="Castrado"
            class="col-md-3 col-12"
            :readonly="isVisualizar"
          >
            <q-select
              v-model="form.castrado"
              :options="simNaoOptions"
              outlined
              emit-value
              map-options
              class="bg-grey-1"
            />
          </eq-form-input>
        </div>
      </q-card-section>

      <q-card-section>
        <form-label label="Tutor" />

        <eq-form-input model-value="">
          <q-select
            v-model="tutorCombo"
            outlined
            class="bg-grey-1"
            input-debounce="400"
            map-options
            :options="tutorOptions"
          />
        </eq-form-input>
      </q-card-section>

      <q-card-section>
        <form-label label="Observações Internas" />

        <div class="row q-col-gutter-x-md">
          <q-input
            v-model="form.observacoes"
            type="textarea"
            class="col-12 rounded dark-border"
            bg-color="grey-1"
            outlined
            :readonly="isVisualizar"
          />
        </div>
      </q-card-section>

      <q-card-actions align="right" class="q-mr-sm q-mt-sm">
        <q-btn
          v-if="form.id"
          label="Histórico de pesos"
          @click="dialogHistoricoPeso = !dialogHistoricoPeso"
          no-caps
          icon="fas fa-weight-scale"
          color="secondary"
        />

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
          @click="salvarTutelado"
        />
      </q-card-actions>
    </q-card>

    <q-dialog v-model="dialogHistoricoPeso" v-if="form.id">
      <historico-peso :id-tutelado="form.id" />
    </q-dialog>
  </q-page>
</template>
