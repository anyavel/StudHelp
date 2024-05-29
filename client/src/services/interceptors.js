import { authService } from "./authService";

export const setupInterceptors = (axiosInstance, navigate, logout) => {
    axiosInstance.interceptors.request.use((config) => {
        if (authService.isAuthorized()) {
            const token = config.url.includes('refresh') ? authService.getRefreshToken() : authService.getAccessToken();
            config.headers.Authorization = token;
        }
        return config;
    });

    let isRefreshing = false;
    axiosInstance.interceptors.response.use((config) => {
        return config;
    }, async (error) => {
        const refresh = authService.getRefreshToken();
        if (error.code === 'ERR_NETWORK') {
            logout();
            navigate('/sign-in');
        }
        if (error.response?.status === 401 && !isRefreshing && !!refresh) {
            isRefreshing = true;
            try {
                await authService.refresh();
            } catch (e) {
                authService.deleteTokens();
                navigate('/sign-in');
            }
            isRefreshing = false;
            return axiosInstance(error.config);
        }
        return Promise.reject(error);
    })
}