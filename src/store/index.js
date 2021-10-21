import {createStore} from 'vuex'
import {message} from "ant-design-vue";
import {transformData} from '../utils/transfromData'
import http from '../http'

const store = createStore({
    state() {
        return {
            categories: [],
            products: [],
            cart: {},
            token: localStorage.getItem('idToken'),
            user: null
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
            if(!state.cart[payload]) {
                state.cart[payload] = 1
            } else state.cart[payload]++
        },
        deleteFromCart(state, payload) {
            if(state.cart[payload] > 1) {
                state.cart[payload]--
            } else delete state.cart[payload]
        },
        clearCart(state) {
            state.cart = {}
        },
        setToken(state, payload) {
            state.token = payload
            localStorage.setItem('idToken', payload)
        },
        setUser(state, payload) {
            state.user = payload
            console.log(state.user)
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
        },
        async signUp({commit, dispatch}, payload) {
            commit('setToken', payload.token)
            await dispatch('createUser', {
                name: payload.user,
                email: payload.email,
                id: payload.id
            })
        },
        async signIn({commit, dispatch}, payload) {
            commit('setToken', payload.token)
            dispatch('getUser', payload.id)
        },
        async createUser({commit}, payload) {
            const {data} = await http.post(`users/${payload.id}.json`, {
                name: payload.user,
                email: payload.email,
            })
            console.log(data)
        },
        async getUser({commit}, payload) {
            const {data} = await http.get(`users/${payload}.json`)
            message.success(`Привет ${data.name}`)
            commit('setUser', data)
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
        },
        getCartProducts(state) {
            const cart = []
            state.products.forEach(item => {
                if(Object.keys(state.cart).includes(item.id)) {
                    cart.push(item)
                }
            })
            return cart
        },
        cartTotalSum(state, getters) {
            return getters.getCartProducts.reduce((total, cur) => {
                return total += cur.price * state.cart[cur.id]
            }, 0)
        },
        isAuthenticated(state) {
            return !!state.token
        }
    }
})

export default store