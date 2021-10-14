<template>
  <div style="padding: 20px;">
    <a-typography-title :level="3" class="page-title">{{ pageTitle }}</a-typography-title>
    <slot></slot>
  </div>
</template>

<script lang="ts">
export default {
  name: 'AppPage'
}
</script>
<script setup lang="ts">
const props = defineProps({
  pageTitle: String
})
</script>

<style lang="scss">
  .page-title {
    margin-bottom: 20px!important;
  }
</style>