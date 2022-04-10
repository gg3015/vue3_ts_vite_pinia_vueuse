import { useFetch, UseFetchOptions } from '@vueuse/core'
import createCommonFetch from './fetch'
import { getToken } from './url'

export function getMyToken() {
  return useFetch(getToken, {
    afterFetch(ctx) {
      if (ctx.data === null) {
        ctx.data = { token: 'tokenNo' }
      }
      return ctx
    },
  })
}

const instance = createCommonFetch(location.origin, {
  async beforeFetch({ options }: any) {
    const token = await getMyToken()
    options.headers = {
      ...options.headers,
      Authorization: token,
    }
    return { options }
  },
})

export function useCommonFetch(url: string, options?: UseFetchOptions) {
  return options ? instance(url, options) : instance(url)
}
// Request will be sent with GET method and data will be parsed as JSON
// const { data } = useFetch(url).get().json()

// // Request will be sent with POST method and data will be parsed as text
// const { data } = useFetch(url).post().text()

// // Or set the method using the options

// // Request will be sent with GET method and data will be parsed as blob
// const { data } = useFetch(url, { method: 'GET' }, { refetch: true }).blob()
// // Request will be sent with GET method and data will be parsed as JSON
// const { data } = useFetch(url).get().json()

// // Request will be sent with POST method and data will be parsed as text
// const { data } = useFetch(url).post().text()

// // Or set the method using the options

// // Request will be sent with GET method and data will be parsed as blob
// const { data } = useFetch(url, { method: 'GET' }, { refetch: true }).blob()
