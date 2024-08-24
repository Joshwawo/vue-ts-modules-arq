import { ref, unref } from 'vue'
import type { AxiosResponse, AxiosRequestConfig } from 'axios'
import { useMainStore } from '@/stores/mainStore'


const cargando = ref(false);
const mainStore = useMainStore()


export default (service = null) => {
    const servicio: any = unref(service);

    type Config = {
        /**La `url` opcional a la peticion*/
        optUrl?: string | null;
        /**La `configuracion` adicional de axios*/
        axiosConfig?: AxiosRequestConfig;
    }

    /**
     * Obtiene todos los elementos
     * @param {any} [params] parametros de la peticion query params
     * @param {Config} [config] configuraciones adicionales de la peticion
     */
    const obtenerElementos = async <T>(params?: any, config?: Config): Promise<AxiosResponse<T>> => {
        console.log("🗿 ~ obtenerElementos ~ params:", params)
        let response

        try {
            cargando.value = true
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio) {
                const res = await servicio?.list(params, config);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
            // return { response, error };
        }
    };

    /**
     * Obtiene un elemento por su id
     * @param {number} id id del elemento a obtener
     * @param {any} params parametros de la peticion
     * @param {Config} config configuraciones adicionales de la peticion
     */
    const obtenerElemento = async <T>(id: number | string, params: any = null, config: Config): Promise<AxiosResponse<T>> => {
        let response

        try {
            cargando.value = true;
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio) {
                const res = await servicio?.retrieve(id, params, config);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)

        }
    };

    /**
     * Crea un elemento en la base de datos
     * @param {*} data datos del elemento a crear  
     * @param {Config} config configuraciones adicionales de la peticion
     * @returns 
     */
    const crearElemento = async <T>(data: any, config?: Config): Promise<AxiosResponse<T>> => {
        let response

        try {
            cargando.value = true;
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio) {
                const res = await servicio?.create(data, config);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
            // return { response, error };
        }
    };

    /**
     * Actualiza un elemento en la base de datos
     * @param {number} id id del elemento a editar
     * @param {*} data datos del elemento a editar
     * @param {Config} config configuraciones adicionales de la peticion
     * @deprecated usar editarElementoPUT o editarElementoPatch, procuprar no usar este metodo mas.
     * @returns 
     */
    const editarElemento = async <T>(id: number, data: any, config?: Config): Promise<AxiosResponse<T>> => {
        console.warn("Este metodo esta deprecado, usar editarElementoPUT o editarElementoPatch, procuprar no usar este metodo mas.");
        let response
        try {
            cargando.value = true;
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio) {
                const res = await servicio?.update(id, data, config);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
            // return { response, error };
        }
    }
    /**
     * Actualiza un elemento en la base de datos
     * @param {number} id id del elemento a editar
     * @param {*} data datos del elemento a editar
     * @param {Config} config configuraciones adicionales de la peticion
     * @returns 
     */
    const editarElementoPUT = async <T>(id: number, data: any, config?: Config): Promise<AxiosResponse<T>> => {
        let response

        try {
            cargando.value = true;
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio) {
                const res = await servicio?.updatePut(id, data, config);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
            // return { response, error };
        }
    }
    /**
 * Actualiza un elemento en la base de datos
 * @param {number} id id del elemento a editar
 * @param {*} data datos del elemento a editar
 * @param {Config} config configuraciones adicionales de la peticion
 * @returns 
 */
    const editarElementoPatch = async <T>(id: number | null, data: any, config?: Config): Promise<AxiosResponse<T>> => {
        let response

        try {
            cargando.value = true;
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio && id) {
                const res = await servicio?.updatePatch(id, data, config);
                response = res;
            } else if (servicio && !id) {
                const res = await servicio?.updatePatch(null, data, config);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
            // return { response, error };
        }
    }
    const eliminarElemento = async <T>(id: number | null, data: any, config?: Config): Promise<AxiosResponse<T>> => {
        let response
        try {
            mainStore.setLoadingHttp(true, 'Cargando...')

            if (servicio && id) {
                const res = await servicio?.delete(id, data, config)
                response = res
            } else if (servicio && !id) {
                const res = await servicio?.delete(null, data, config)
                response = res
            }
            return response as AxiosResponse<T>

            // eslint-disable-next-line no-useless-catch
        } catch (error) {
            throw error
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
        }
    }


    /**
     * Actualiza un elemento en la base de datos, pero solo un campo
     * @param {number} id id del elemento a editar
     * @param {*} data  datos del elemento a editar
     * @deprecated usar editarElementoPUT o editarElementoPatch, procuprar no usar este metodo mas.
     * @param {Config} config configuraciones adicionales de la peticion
     * @returns
     */
    const editarUnicoElemento = async <T>(id: number, data: Config): Promise<AxiosResponse<T>> => {
        let response

        try {
            cargando.value = true;
            mainStore.setLoadingHttp(true, 'Cargando...')
            if (servicio) {
                const res = await servicio?.patch(id, data);
                response = res;
            }
            return response as AxiosResponse<T>
            // eslint-disable-next-line no-useless-catch
        } catch (err) {
            // error = err;
            throw err;
        } finally {
            cargando.value = false;
            mainStore.setLoadingHttp(false, null)
            // return { response, error };
        }
    }
    /**
     *  * esta es usada cuando quieres modificar un elemento en un endpoint, ocupas pasarle el servicio, el id del elemento a modificar y los datos a enviar
     * @param {*} metodo  metodo del servicio a usar
     * @deprecated usar editarElementoPUT o editarElementoPatch, procuprar no usar este metodo mas.
     * @param {*} conf  configuraciones adicionales de la peticion
     */
    // const customEndpoint = async (metodo: any, conf?: Config) => {
    //     let response

    //     try {
    //         cargando.value = true;
    //         const res = await servicio[metodo](conf);
    //         response = res;
    //     } catch (err) {
    //         error = err;
    //     } finally {
    //         cargando.value = false;
    //         return { response, error };
    //     }
    // }


    return {
        cargando,

        obtenerElemento,
        obtenerElementos,
        crearElemento,
        editarElemento,
        editarUnicoElemento,
        editarElementoPUT,
        editarElementoPatch,
        eliminarElemento,
    }
}