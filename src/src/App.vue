<template>
  <MainLayout />
</template>

<script setup lang="ts">
import MainLayout from './layouts/MainLayout.vue'
import {useStore} from 'vuex'
import {ref, onMounted} from 'vue'

const store = useStore()
onMounted(async () => {    
    await store.dispatch('getCategories')
})
</script>

<style lang="scss">

</style>
