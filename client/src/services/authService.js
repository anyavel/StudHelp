import { apiService } from "./apiService";
import { urls } from "../configs";

const accessTokenKey = 'accessToken';
const refreshTokenKey = 'refreshToken';

export const authService = {
    login: async function (cred) {
        const response = await apiService.post(urls.auth.signIn, cred);
        if (response.status === 200) {
            this.setTokens(response.data);
        }
        return response;
    },
    register: async function (cred) {
        const response = await apiService.post(urls.auth.signUp, cred);
        if (response.status === 200) {
            this.setTokens(response.data);
        }
        return response;
    },
    refresh: async function () {
        const response = await apiService.get(urls.auth.refresh);
        if (response.status === 200) {
            this.setTokens(response.data);
        }
        return response;
    },
    me: (query = {}) => apiService.get(urls.auth.me, { params: { ...query } }),

    updatePersonalInfo: (data) => apiService.put(urls.auth.personalData, data),

    setTokens: ({accessToken, refreshToken}) => {
        localStorage.setItem(accessTokenKey, accessToken);
        localStorage.setItem(refreshTokenKey, refreshToken);
    },
    getAccessToken: () => localStorage.getItem(accessTokenKey),
    getRefreshToken: () => localStorage.getItem(refreshTokenKey),
    deleteTokens: () => {
        localStorage.removeItem(accessTokenKey);
        localStorage.removeItem(refreshTokenKey);
    },
    isAuthorized: () => !!localStorage.getItem(accessTokenKey)
}
