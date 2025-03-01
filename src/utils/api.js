import { api } from 'boot/axios';
import { notify } from 'src/utils/notify-utils';


const useReadOnlyApi = () => {

  return {

    async list(resource, params) {
      try {
        const { data } = await api.get(resource, { params })
        if(!data) {
          notify.info('Nenhum registro encontrado')
        }
        return data
      } catch (e) {
        notify.error(e?.response?.data?.message)
      }
      return null
    },

    async get(resource, config) {
      try {
        const { data } = await api.get(`${resource}`, config)
        return data
      } catch (e) {
        notify.error(e?.response?.data?.message)
      }
      return null
    }

  }
}

const useCrudApi = () => {
  return {
    ...useReadOnlyApi(),

    async save(resource, data, id, config) {
      try {
        if(!id) {
          return await api.post(resource, data, config)
        }

        if(data instanceof FormData) {
          data.append('_method', 'PUT')
          return await api.post(`${resource}/${id}`, data, config)
        }

        return await api.put(`${resource}/${id}`, data, config)



      } catch (e) {
        e?.response?.data?.errors.forEach(error => notify.error(error))
      }
      return null
    },

    async post(resource, data, config) {
      try {
        return await api.post(`${resource}`, data, config)
      } catch (e) {
        notify.error(e?.response?.data?.message)
      }
      return null
    },

    async delete(resource, id) {
      try {
        await api.delete(`${resource}/${id}`)
      } catch (e) {
        notify.error(e?.response?.data?.message)
      }
    }
  }
}

export {
  useReadOnlyApi,
  useCrudApi,
}
