<template>
  <app-page page-title="Главная">
    <a-layout-content class="main-page__content">
      <a-form @submit="addCategory" style="margin-bottom: 40px" layout="vertical">
        <a-typography-title :level="3">Добавление категории</a-typography-title>
        <a-form-item label="Название категории" class="form-item">
          <a-input
              v-model:value="categoryTitle"
              placeholder="Введите название категории"
          />
        </a-form-item>
        <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
              :loading="catLoading"
          >
            Добавить категорию
          </a-button>
        </a-form-item>
      </a-form>
      <a-form @submit="addProduct" layout="vertical">
        <a-typography-title :level="3">Добавление продукта</a-typography-title>
        <a-form-item label="Название позиции" class="form-item">
          <a-input
              v-model:value="product.title"
              placeholder="Введите название позиции"
          />
        </a-form-item>
        <a-form-item label="Категория" class="form-item">
          <a-select
              v-model:value="product.category"
              placeholder="Выберите категорию"
          >
            <a-select-option
                :value="''"
            >
              Выберите категорию
            </a-select-option>
            <a-select-option
                v-for="cat in categories"
                :key="cat.id"
                :value="cat.id"
            >
              {{cat.title}}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="Состав" class="form-item">
          <a-input
              v-model:value="product.description"
              placeholder="Введите состав"
          />
        </a-form-item>
        <a-form-item label="Вес порции(грамм)" class="form-item">
          <a-input
              v-model:value="product.weight"
              type="number"
              placeholder="Введите вес"
          />
        </a-form-item>
        <a-form-item label="Цена" class="form-item">
          <a-input
              v-model:value="product.price"
              type="number"
              placeholder="Введите цену"
          />
        </a-form-item>
        <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
              :loading="prodLoading"
          >
            Добавить позицию
          </a-button>
        </a-form-item>
      </a-form>
    </a-layout-content>
  </app-page>
</template>

<script setup lang="ts">
import { ref, computed } from '@vue/reactivity'
import { useStore } from 'vuex'
import {reactive, toRefs} from "vue";
import {Product} from "../interfaces/menu.interface";
import AppPage from "../components/UI/AppPage.vue";
const store = useStore()
const categoryTitle = ref<String>('')
const catLoading = ref<Boolean>(false)
const prodLoading = ref<Boolean>(false)
const product = reactive<Product>({
  title: '',
  category: '',
  description: '',
  weight: 0,
  price: 0
})

const categories = computed(() => store.getters['getCategories'])
const addCategory = async () => {
  catLoading.value = true
  await store.dispatch('addCategory', {title: categoryTitle.value})
  categoryTitle.value = ''
  catLoading.value = false
}

const addProduct = async () => {
  prodLoading.value = true
  await store.dispatch('addProducts', product)
  prodLoading.value = false
  product.title = ''
  product.category = ''
  product.description = ''
  product.weight = 0
  product.price = 0
}
</script>

<style lang="scss">
.main-page {
  &__content {
    //display: flex;
    //flex-direction: column;
    background-color: #fff;
  }
}
.form-item {
  margin-bottom: 10px;
}
</style>