<template>
  <a-layout>
    <a-layout-content style="padding: 20px;">
      <a-row justify="center">
        <a-col :span="12">
          <a-tabs v-model:activeKey="tab">
            <a-tab-pane key="signUp" tab="Регистрация">
              <login></login>
            </a-tab-pane>
            <a-tab-pane key="signIn" tab="Вход">
              <sign-in></sign-in>
            </a-tab-pane>
          </a-tabs>
        </a-col>
      </a-row>
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import Login from "../components/Login.vue";
import SignIn from "../components/SignIn.vue";
import {ref} from "vue";
const tab = ref<string>('signUp')
</script>

<style scoped>

</style>