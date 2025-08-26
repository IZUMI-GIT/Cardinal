import axios from 'axios'

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,   //3000 port => backend
    withCredentials: true
})

apiClient.interceptors.response.use(
    response => response.data,
    (error) => {
        const {status, data} = error.response;
        return Promise.reject({status, ...data})
    }
)

export default apiClient