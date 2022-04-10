import { createFetch, UseFetchOptions } from '@vueuse/core'

export default function createCommonFetch(
  baseUrl?: any,
  options?: UseFetchOptions,
  fetchOptions?: RequestInit
) {
  return createFetch({
    baseUrl: baseUrl || 'https://my-api.com',
    options,
    fetchOptions,
  })
}
