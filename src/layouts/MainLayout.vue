<template>
  <div class="page">
    <a-layout-header>
      <a-row>
        <a-menu
            theme="dark"
            mode="horizontal"
            v-model:selectedKeys="current"
            :style="{ lineHeight: '64px' }"
        >
            <a-menu-item key="/">
                <router-link to="/">Главная</router-link>
            </a-menu-item>
            <a-menu-item key="/menu">
                <router-link to="/menu">Меню</router-link>
            </a-menu-item>
            <a-menu-item key="/cart">
              <router-link to="/cart">
                <a-badge :count="cartCount">
                  <ShoppingCartOutlined style="font-size: 24px; color: #fff"/>
                </a-badge>
              </router-link>
            </a-menu-item>
        </a-menu>
      </a-row>
    </a-layout-header>
    <a-layout-content class="content-wrapper">
      <router-view></router-view>
    </a-layout-content>
    <a-layout-footer :style="{ textAlign: 'center' }">
      rivc-delivery 2021
    </a-layout-footer>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ShoppingCartOutlined } from '@ant-design/icons-vue'
const store = useStore()
const route = useRoute()
const current = ref<Array<String>>([route.path])
const cartCount = computed(() => Object.keys(store.getters['getCart']).length)
watch(route, (newVal, oldVal) => {
  current.value = [newVal.path]
})
</script>

<style>
.content-wrapper {
 flex: 1 1 auto;
}
.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
</style>
