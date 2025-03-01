<script setup lang="ts">
import { onMounted, Ref, ref } from 'vue';
import { useCrudApi } from 'src/utils/api';
import EqFormInput from 'components/EqFormInput.vue';
import { useRouter } from 'vue-router';
import { Notify } from 'quasar';
import { Tutor, TutorFormProps } from 'pages/tutor/components/models';
import EnderecoForm from 'components/EnderecoForm.vue';
import FormLabel from 'components/FormLabel.vue';

const props = defineProps<TutorFormProps>();

const form: Ref<Tutor> = ref({
  endereco: {
    cep: '',
    cidade: '',
    estado: '',
    bairro: '',
    complemento: '',
    numero: '',
    logradouro: ''
  }
});

const router = useRouter();
const api = useCrudApi();

const isVisualizar = props.isReadOnly;


const carregarTutor = async () => {
  if (!props.id) {
    return;
  }

  const data = await api.get(`/tutor/${props.id}`);
  if (data) Object.assign(form.value, data);
};

onMounted(carregarTutor);
const salvarTutor = async (voltar: boolean) => {
  const response = await api.save('/tutor', form.value, props.id);

  if (!response) {
    return;
  }

  Notify.create({
    icon: 'check_circle',
    color: 'positive',
    position: 'bottom',
    message: 'Tutor salvo com sucesso!',
    progress: true
  });

  if (voltar) voltarPagina();
};

const voltarPagina = () => router.back();
</script>

<template>
  <q-page class="q-px-md q-py-md">
    <q-breadcrumbs class="q-mb-md text-subtitle1">
      <q-breadcrumbs-el label="Início" :to="{ name: 'home' }" />

      <q-breadcrumbs-el label="Tutor" :to="{ name: 'tutor-listagem'}" />

      <q-breadcrumbs-el :label="modo" />

    </q-breadcrumbs>

    <q-card class="rounded">


      <q-card-section>
        <form-label label="Identificação" />

        <div class="row q-col-gutter-x-md">
          <eq-form-input
            v-model="form.nome"
            label="Nome"
            class="col-md-4 col-sm-12"
            outlined
            :readonly="isVisualizar"
          />

          <eq-form-input
            v-model="form.cpf"
            label="CPF"
            class="col-md-4 col-sm-12"
            outlined
            :readonly="isVisualizar"
            mask="###.###.###-##"
            unmasked-value
          />

          <eq-form-input
            v-model="form.dataNascimento"
            type="date"
            label="Data de nascimento"
            class="col-md-4 col-sm-12"
            outlined
            :readonly="isVisualizar"
          />

        </div>
      </q-card-section>

      <q-card-section >
        <form-label label="Dados de Contato" />

        <div class="row q-col-gutter-x-md">
          <eq-form-input
            v-model="form.celular"
            label="Celular"
            class="col-md-3 col-sm-12"
            outlined
            :readonly="isVisualizar"
            mask="(##) # ####-####"
            unmasked-value
          />

          <eq-form-input
            v-model="form.telefone"
            label="Telefone"
            class="col-md-3 col-sm-12"
            outlined
            :readonly="isVisualizar"
            mask="(##) ####-####"
            unmasked-value
          />

          <eq-form-input
            v-model="form.email"
            label="Email"
            class="col-md-6 col-sm-12"
            outlined
            :readonly="isVisualizar"
          />
        </div>
      </q-card-section>

      <q-card-section>
        <endereco-form v-model="form.endereco!" />
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
        <q-btn label="Sair" style="width: 4em" color="grey-7" no-caps @click="voltarPagina" />
        <q-btn v-if="!isVisualizar" label="Salvar e Sair" color="primary" no-caps @click="salvarTutor(true)" />
        <q-btn v-if="!isVisualizar" label="Salvar" style="width: 5em" color="positive" no-caps
               @click="salvarTutor(false)" />
      </q-card-actions>


    </q-card>
  </q-page>

</template>
