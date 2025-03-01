<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useAuthStore } from 'stores/auth-store';
import { notify } from 'src/utils/notify-utils';
import { useRoute, useRouter } from 'vue-router';

const form = reactive({ email: '', senha: '' });
const showPassword = ref(false);

const auth = useAuthStore();
const router = useRouter();
const route = useRoute();

const login = async () => {
  try {
    await auth.login(form.email, form.senha);
    await router.push(route.query.redirect?.toString() ?? '/');
  } catch (e: any) {
    notify.error(e.response?.data?.message);
  }
};
</script>

<template>
  <q-page class="flex flex-center bg-primary">
    <div class="corner-detail top-left"></div>


    <q-card class="q-pa-lg shadow-2 rounded" style="width: 350px; max-width: 90vw;">
      <q-card-section class="text-center">
        <q-avatar class="full-width full-height" square>
          <q-img src="/logo/HubPet.svg" class="full-width full-height" />
        </q-avatar>

        <div class="text-h5 text-weight-bold q-mt-md text-dark">Login</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="login" class="q-gutter-y-sm">
          <q-input v-model="form.email" label="Email" type="email" outlined
                   :rules="[(val: string) => !!val || 'Email is required']" bg-color="grey-1" />
          <q-input v-model="form.senha" label="Senha" :type="showPassword ? 'text' : 'password'" outlined
                   :rules="[(val: string) => !!val || 'Password is required']" bg-color="grey-1">
            <template v-slot:append>
              <q-icon
                :name="showPassword ? 'visibility' : 'visibility_off'"
                class="cursor-pointer"
                @click="showPassword = !showPassword"
              />
            </template>
          </q-input>


          <q-btn label="Login" type="submit" color="primary" class="full-width" />
        </q-form>
      </q-card-section>

      <q-card-section class="text-center">
        <span class="text-dark text-body2">Ainda não possui uma conta?</span>
        <q-btn flat dense label="Cadastrar-se" color="primary" />
      </q-card-section>
    </q-card>
  </q-page>
</template>
