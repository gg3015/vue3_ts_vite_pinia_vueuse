import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'main',
  state: () => ({
    name: 'super',
  }),
  getters: {
    nameLength: (state) => state.name.length,
  },
  actions: {
    async updateName(value: string) {
      setTimeout(() => {
        this.name = value
      })
    },
  },
})
