<template>
  <app-page page-title="Меню на сегодня">
    <div style="display:flex;">
      <a-layout-sider class="menu-page__sidebar">
        <a-menu class="menu-page__sidebar-list">
          <a-menu-item @click="clearFilter">Все</a-menu-item>
          <a-menu-item
              v-for="item in categoryList"
              :key="item.id"
              @click="addRouterQuery(item.id)"
          >{{item.title}}</a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="menu-page__content" v-if="productList.length">
        <product-card
            v-for="product in productList"
            :key="product.id"
            :product="product"
        />
      </a-layout-content>
    </div>
  </app-page>
</template>

<script setup lang="ts">
import AppPage from "../components/UI/AppPage.vue";
import { ref, computed, onMounted, watch } from "vue";
import { useStore } from "vuex";
import { useRouter} from "vue-router";
import { Menu } from "../interfaces/menu.interface";
import ProductCard from "../components/ProductCard.vue";

const store = useStore()
const router = useRouter()
const loading = ref<boolean>(false)
const filter = ref<string>('')
const categoryList = computed(() => store.getters['getCategories'])
const productList = computed(() => store.getters['getProducts'].filter(item => {
  if(!filter.value) return item
  else return item.category === filter.value
}))
onMounted(async () => {    
    loading.value = true
    if(!categoryList.value.length) {
        await store.dispatch('getCategories')
    }
    await store.dispatch('getProducts')
    loading.value = false

})
const addRouterQuery = (id: string) => {
  filter.value = id
  router.replace({
    query: {
      category: id
    }
  })
}
const clearFilter = () => {
  filter.value = ''
  router.replace({
    query: {}
  })
}
// watch(categoryList, (newVal, oldVal) => {
//     current.value = newVal[0].id
// })
</script>

<style lang="scss">
.menu {
  &-page {
    &__sidebar {
      background-color: #fff;
      border-right: 1px solid #f0f0f0;
      &-list {
        border: none;
      }
    }
    &__content {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-gap: 10px;
      padding-left: 20px;
      background-color: #fff;
    }
  }
}
</style>