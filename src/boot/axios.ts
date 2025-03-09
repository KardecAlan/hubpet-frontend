import { boot } from 'quasar/wrappers'
import axios, { AxiosError, AxiosInstance } from 'axios'
import { useAuthStore } from 'stores/auth-store'
import { Router } from '../router'

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance
    $api: AxiosInstance
  }
}

// Be careful when using SSR for cross-request state pollution
// due to creating a Singleton instance here;
// If any client changes this (global) instance, it might be a
// good idea to move this instance creation inside of the
// "export default () => {}" function below (which runs individually
// for each client)
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL })

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    const auth = useAuthStore()

    if (auth.bearerToken) {
      config.withCredentials = true
      config.headers.Authorization = auth.bearerToken
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

api.interceptors.response.use(

  function (response) {
    // Do something before request is sent

    return response
  },
  async function (error: AxiosError) {

    if (error.status === 403) {
      const auth = useAuthStore()

      if (auth.shouldTryAgain) return await auth.refresh()

      auth.logout()
      await Router.push({ name: 'login' })

    }

    if (error.status === 401) {
      const auth = useAuthStore()
      await Router.push({ name: 'login' })
      auth.logout()
    }

    return Promise.reject(error)
  }
)

export default boot(({ app }) => {
  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
})

export { api }
