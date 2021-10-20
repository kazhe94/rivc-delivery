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
          <a-menu-item key="/login" class="nav-btn__item" @click="visible = true">
            <a-button type="text" class="nav-btn">Вход / Регистрация</a-button>
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
  <teleport to="body">
    <a-modal v-model:visible="visible" title="Регистрация" :footer="null">
      <login/>
    </a-modal>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ShoppingCartOutlined } from '@ant-design/icons-vue'
import Login from "../components/Login.vue";
const store = useStore()
const route = useRoute()
const visible = ref<boolean>(false)
const current = ref<Array<String>>([route.path])
const cartCount = computed(() => Object.keys(store.getters['getCart']).length)
watch(route, (newVal, oldVal) => {
  current.value = [newVal.path]
})
</script>

<style lang="scss">
.content-wrapper {
 flex: 1 1 auto;
}
.page {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.nav-btn__item {
  &:hover {
    button {
      color: #fff;
    }
  }
  button {
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>
