<script setup lang="ts">
import { Endereco } from 'pages/tutor/components/models';
import EqFormInput from 'components/EqFormInput.vue';
import FormLabel from 'components/FormLabel.vue';
import axios from 'axios';
import { notify } from 'src/utils/notify-utils';


const endereco = defineModel<Endereco>({ required: true })


const buscarCep = async () => {

  if (endereco.value.cep.length !== 8) {
    return;
  }

  const response = await axios.get(`https://viacep.com.br/ws/${endereco.value.cep}/json/`,)

  if (!response.data || response.data.erro) {
    notify.warn('CEP não encontrado')
    return;
  }


  endereco.value = {
    ...response.data,
    cidade: response.data?.localidade,
    complemento: ''

  }
}

</script>

<template>
  <form-label label="Endereço" />
  <div class="row q-col-gutter-x-md">
    <eq-form-input v-model="endereco.cep" label="CEP" class="col-md-3 col-sm-12" mask="#####-###" unmasked-value outlined @change="buscarCep" />

    <eq-form-input v-model="endereco.logradouro"  label="Logradouro" class="col-md-6 col-sm-12" outlined readonly />

    <eq-form-input v-model="endereco.numero" label="Número" class="col-md-3 col-sm-12" outlined />
  </div>
  <div class="row q-col-gutter-x-md">
    <eq-form-input v-model="endereco.complemento" label="Complemento" class="col-md-4 col-sm-12" outlined  />

    <eq-form-input v-model="endereco.estado"  label="Estado" class="col-md-2 col-sm-12" outlined readonly />

    <eq-form-input v-model="endereco.cidade" label="Cidade" class="col-md-3 col-sm-12" outlined readonly />

    <eq-form-input v-model="endereco.bairro" label="Bairro" class="col-md-3 col-sm-12" outlined readonly />
  </div>
</template>

<style scoped>

</style>
