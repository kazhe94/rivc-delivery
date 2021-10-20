import axios from "axios";

const http = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_FB_DB
})

export default http