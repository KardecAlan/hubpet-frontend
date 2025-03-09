<template>
  <q-item
    clickable
    :to="link"
    active-class="active-route"
    class="text-gray item"
  >
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
defineOptions({
  name: 'EssentialLink',
})

export interface EssentialLinkProps {
  title: string
  name?: string
  link?: string
  icon?: string
  hideOnDashboard?: boolean
}

withDefaults(defineProps<EssentialLinkProps>(), {
  caption: '',
  link: '#',
  icon: '',
})
</script>

<style scoped lang="scss">
.item,
.item:focus,
.item:hover {
  border-radius: 0 25px 25px 0;
  margin-right: 2px;
}
.active-route {
  background-color: #bfe2ff;
  color: $primary;
  font-weight: bold;
  border-radius: 0 25px 25px 0;
  margin-right: 2px;
}
</style>
