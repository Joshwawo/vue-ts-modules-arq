import axios, { type AxiosInstance } from 'axios'

const BASE_URL = import.meta.env.VITE_API_BASEURL

const createAxiosInstance = (): AxiosInstance => {
    let httpURL;
    if (import.meta.env.PROD) {
        httpURL = null
    } else {
        httpURL = BASE_URL
    }
    const instance: AxiosInstance = axios.create({
        baseURL: httpURL,

    })
    return instance
}

const instance = createAxiosInstance()
instance.interceptors.request.use(
    (config) => {
        // const token = import.meta.env.VITE_TOKEN
        // const lhToken = localStorage.getItem('token')
        // // console.log("TOKEN", token)
        // // console.log("CONFIG", config)
        // if (token) {
        //     config.headers['Authorization'] = `Bearer ${lhToken}`
        // }
        return config; // Add this line to return the modified config object
    },
    (error) => {
        return Promise.reject(error);
    }
)

export default instance