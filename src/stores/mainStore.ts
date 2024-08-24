import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', () => {
    const loadingHttp = ref({
        loading: false,
        title: null as string | null,
    })

    function setLoadingHttp(loading: boolean, title: string | null) {
        validBool(loading)
        loadingHttp.value = { loading, title }
    }

    const validBool = (value: boolean) => {
        if (value !== Boolean(value)) {
            console.error('El valor no es booleano')
        }
    }
    const getLoadingHttp = computed(() => loadingHttp.value)

    return {
        setLoadingHttp,
        getLoadingHttp
    }
})