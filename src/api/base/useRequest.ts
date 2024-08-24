//Este hace un poco la url dinamica
// const recurso = 'mood/new/cloud'
// const baseUrl = '/';
// import service from '@/composables/_service';
// import useReq from '@/composables/useReq'
import service from '@/utils/_service'
import allServices from '@/utils/allServices'



/**
 *  Servicio generico para hacer peticiones a la API
 * @param {{baseUrl:string}} service  servicio de axios
 * @returns {object} objecto con los metodos del servicio
 */
const requesServices = ({ baseUrl = '/' } = {}): any => {
    if (!baseUrl) {
        throw new Error('La url base es requerida');
    }
    if (typeof baseUrl !== 'string') {
        throw new Error('La url base debe ser un string');
    }
    if (baseUrl === '/') {
        console.warn('No se paso como argumento la url base, se usara la url base en su lugar "/"')
    }
    // if(baseUrl[baseUrl.length - 1] !== '/') {
    //     baseUrl += '/'
    // }

    return {
        list(params = null, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.get(`${baseUrl}${optUrl}`, {
                params,
                ...config?.axiosConfig
            })
        },
        retrieve(id: any, params = null, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.get(`${baseUrl}${optUrl}${id}/`, {
                params,
                ...config?.axiosConfig
            })
        },
        create(data: any, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.post(`${baseUrl}${optUrl}`, data, config?.axiosConfig)
        },
        //Este ni se usa en el proyecto, pero lo dejo por si acaso
        delete(id: any, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.delete(`${baseUrl}${optUrl}${id}/`, config?.axiosConfig)
        },
        //Esta es la version deprecada, pero modulos antiguos la usan
        /**
         * @deprecated use updatePatch or updatePut instead
         */
        update(id: any, data: any, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.patch(`${baseUrl}${optUrl}${id}/`, data, config?.axiosConfig)
        },
        updatePatch(id: any, data: any, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.patch(`${baseUrl}${optUrl}${id}/`, data, config?.axiosConfig)
        },
        updatePut(id: any, data: any, config: any = null) {
            const optUrl = config?.optUrl ? config.optUrl : ''
            return service.put(`${baseUrl}${optUrl}${id}/`, data, config?.axiosConfig)
        }
    };

};

const requestReq = (baseUrl: string = '/') => {
    if (typeof baseUrl !== 'string') {
        console.error('La url base debe ser un string');
        throw new Error('La url base debe ser un string');
    }
    return allServices(requesServices({ baseUrl }))
}

export default requestReq