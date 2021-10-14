import {createStore} from 'vuex'
import {transformData} from '../utils/transfromData'
import http from '../http'

const store = createStore({
    state() {
        return {
            categories: [],
            products: [],
            cart: {}
        }
    },
    mutations: {
        setCategories(state, payload) {
            state.categories = payload
        },
        setProducts(state, payload) {
            state.products = payload
        },
        addToCart(state, payload) {
            state.cart[payload] = 1
            console.log(state.cart)
        }
    },
    actions: {
        async getCategories({commit}) {
            const {data} = await http.get('categories.json')
            commit('setCategories', transformData(data))
        },
        async getProducts({commit}) {
            const {data} = await http.get('products.json')
            commit('setProducts', transformData(data))
        },
        async addCategory({commit}, payload) {
            const {data} = await http.post('categories.json', payload)
            console.log(data);
        },
        async addProducts({commit}, payload) {
            const {data} = await http.post('products.json', payload)
            console.log(data);
        }
    },
    getters: {
        getCategories(state) {
            return state.categories
        },
        getProducts(state) {
            return state.products
        },
        getCart(state) {
            return state.cart
        }
    }
})

export default store