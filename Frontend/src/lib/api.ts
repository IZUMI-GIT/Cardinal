import apiClient from "../config/apiClient"

export const login = async (data: any) => {
    apiClient.post('/login', data);
}