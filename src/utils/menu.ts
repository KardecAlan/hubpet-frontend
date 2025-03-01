import { EssentialLinkProps } from 'components/MenuItem.vue';
import routes from '../router/routes'
import { useAuthStore } from 'stores/auth-store';
import { computed } from 'vue';

const auth = useAuthStore()

const menu = computed(() => routes
  .filter(e => e.meta?.menu)
  .filter(e => !e.meta?.allowedRoles || auth.hasRoles(e.meta?.allowedRoles as string[]))
  .map(e => {
    const menu: any = e.meta?.menu
    return { link: e.path, name: e.name, icon: menu.icon, title: menu.title, hideOnDashboard: menu.hideOnDashboard } as EssentialLinkProps
  }))

const menuDashboard = computed(() => menu.value.filter(e => !e.hideOnDashboard))

export { menu, menuDashboard }
