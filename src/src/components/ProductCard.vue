<template>
  <a-col>
      <a-card :title="product.title">
        <template #extra><a-button type="primary" @click="addToCart">В корзину</a-button></template>
        <a-typography-title :level="5">Состав:</a-typography-title>
        <p>{{ product.description }}</p>
        <a-typography-title :level="5">Вес:</a-typography-title>
        <p>{{ product.weight }} гр.</p>
        <a-typography-title :level="5">Цена:</a-typography-title>
        <p>{{currency(product.price)}}</p>
      </a-card>
  </a-col>
</template>
<script setup lang="ts">
import { currency } from "../utils/currency";
import { useStore } from "vuex";

const props = defineProps({
  product: Object
})
const store = useStore()
const addToCart = () => {
  store.commit('addToCart', props.product.id)
}
</script>

<style>

</style>