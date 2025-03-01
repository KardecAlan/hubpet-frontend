<template>
  <q-page class="flex flex-center text-dark text-center q-pa-md">
      <div>
        <div style="font-size: 10vh">
          Página não encontrada
        </div>

        <div class="text-body1" style="opacity:.6">
          Esta página não está disponível ou não existe
        </div>

        <q-btn
          class="q-mt-xl"
          color="white"
          text-color="primary"
          icon="home"
          to="/"
          label="Voltar para o início"
          no-caps
        />
      </div>
  </q-page>
</template>

<script setup lang="ts">
defineOptions({
  name: 'ErrorNotFound'
});
</script>
