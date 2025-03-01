<template>
  <q-page class="q-px-md q-py-md">
    <p class="text-h6 text-weight-regular"><span class="text-bold">Bem vindo, </span> {{ auth.firstName }}!</p>
    <div class="row justify-start q-gutter-md">
      <q-btn
        v-for="link in menuDashboard"
        :key="link.name"
        :icon="link.icon"
        :label="link.title"
        :to="link.link"
        color="white"
        text-color="primary"
        class="rounded col-lg-2 col-md-3 col-sm-12 q-py-xl text-body1 text-bold"
      />
    </div>

  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'stores/auth-store';

const auth = useAuthStore()
import { menuDashboard } from 'src/utils/menu';
</script>
