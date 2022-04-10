<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
import { useCommonFetch } from './api/actions'
import { ref, reactive } from 'vue'
import { computed } from '@vue/reactivity'
const text = ref()
useCommonFetch('/api/test', {
  afterFetch(ctx) {
    return ctx
  },

  onFetchError(ctx) {
    console.log('ctx', ctx)
    if (ctx.data === null) {
      ctx.data = { fetcherror: 'error' }
      ctx.error = new Error('hah some')
    }
    return ctx
  },
}).then((res) => {
  text.value = res.data.value

  // console.log(res.response, res.data.value, res.error)
})
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
  <div>{{ text }}</div>
  <router-view> </router-view>
</template>

<style lang="styl" src="./assets/common.module.styl"></style>
