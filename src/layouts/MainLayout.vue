<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="bg-light">
        <q-btn
          flat
          dense
          round
          color="dark"
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> </q-toolbar-title>

        <q-separator class="q-mr-sm" color="gray" size="1px" vertical inset />

        <div class="gray">
          <q-avatar icon="account_circle" size="4em" class="text-dark" />
          <span class="q-mx-sm dark-text text-bold text-body1">{{
            auth.displayName
          }}</span>
          <q-fab
            v-model="fabState"
            label-position="left"
            external-label
            text-color="dark"
            icon="keyboard_arrow_down"
            active-icon="keyboard_arrow_up"
            direction="down"
            padding="sm"
            hide-label
            flat
          >
            <q-fab-action
              anchor="start"
              flat
              class="q-mr-sm"
              color="negative"
              icon="logout"
              label="Sair"
              @click="logout"
            />
          </q-fab>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label
          header
          class="row justify-between text-dark text-bold text-body2"
          style="height: 100px"
        >
          <q-avatar class="full-width full-height" square>
            <q-img src="/logo/HubPet.svg" class="full-width full-height" />
          </q-avatar>
        </q-item-label>

        <EssentialLink v-for="link in menu" :key="link.name" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-light items-center">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EssentialLink from 'components/MenuItem.vue'
import { menu } from 'src/utils/menu'
import { useAuthStore } from 'stores/auth-store'
import { useRouter } from 'vue-router'

const fabState = ref()

defineOptions({
  name: 'MainLayout',
})

const leftDrawerOpen = ref(false)
const auth = useAuthStore()
const router = useRouter()

const logout = () => {
  auth.logout()
  router.push({ name: 'login' })
}
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}
</script>
