import { useMainStore } from '@/store'
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const mainStore = useMainStore()
    setTimeout(() => {
      mainStore.updateName('SUPER')
    }, 1000)
    setTimeout(() => {
      mainStore.$patch({
        name: mainStore.name.toLocaleLowerCase(),
      })
    }, 4000)
    return () => (
      <h3>
        Hello from vue3, typescript, vite from {mainStore.name}-{mainStore.nameLength}
      </h3>
    )
  },
})
