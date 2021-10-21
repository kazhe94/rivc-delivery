<template>
  <app-page :page-title="'Корзина'">
    <template v-slot:controls v-if="cartList.length > 0">
      <a-button danger shape="round" @click="clearCart">Очистить корзину</a-button>
    </template>
    <a-layout-content>
      <a-row>
        <a-col :span="18" class="items-column">
          <a-list
              class="demo-loadmore-list"
              item-layout="horizontal"
              :data-source="cartList"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <template #actions>
                  <a-button type="primary" @click="deleteOne(item.id)">-</a-button>
                  <div>{{cartCount[item.id]}}</div>
                  <a-button type="primary" @click="addOne(item.id)">+</a-button>
                </template>
                <a-list-item-meta
                    :description="item.description"
                >
                  <template #title>
                    <span>{{ item.title }}</span>
                  </template>
                </a-list-item-meta>
                <div>{{currency(item.price * cartCount[item.id])}}</div>
              </a-list-item>
            </template>
          </a-list>
        </a-col>
        <a-col :span="6">
          <a-typography-title :level="4">Итого: {{currency(totalSum)}}</a-typography-title>
        </a-col>
      </a-row>
    </a-layout-content>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/UI/AppPage.vue";
import {computed} from "vue";
import {useStore} from "vuex";
import {currency} from '../utils/currency.js'
const store = useStore()
const cartList = computed(() => store.getters['getCartProducts'])
const cartCount = computed(() => store.getters['getCart'])
const totalSum = computed(() => store.getters['cartTotalSum'])

const deleteOne = (id: string) => {
  store.commit('deleteFromCart', id)
}
const addOne = (id: string) => {
  store.commit('addToCart', id)
}
const clearCart = () => {
  store.commit('clearCart')
}

</script>

<style lang="scss">
.items-column {
  padding-right: 20px;
}
</style>