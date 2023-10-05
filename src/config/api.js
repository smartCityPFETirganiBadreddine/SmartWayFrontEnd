import axios from 'axios';

const instance = axios.create({
    //baseURL: 'http://itroad2.ddns.net:9090/api/',
    baseURL: 'http://localhost:8080/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to refresh the access token if necessary
instance.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken) {
        const tokenExpiration = JSON.parse(atob(accessToken.split('.')[1])).exp * 1000;
        if (Date.now() > tokenExpiration) {
            if (refreshToken) {
                try {
                    const response = await axios.post('/auth/refreshToken', null, {
                        baseURL: instance.defaults.baseURL,
                        headers: { Authorization: `Bearer ${refreshToken}` }
                    });
                    const newAccessToken = response.data.accessToken;
                    localStorage.setItem('accessToken', newAccessToken);
                    config.headers.Authorization = `Bearer ${newAccessToken}`;
                } catch (error) {
                    console.log('Error refreshing token:', error);
                    // Remove tokens and redirect to login page
                    localStorage.removeItem('accessToken');
                    localStorage.removeItem('refreshToken');
                    window.location.href = '/login';
                }
            } else {
                // Remove tokens and redirect to login page
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
            }
        } else {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
    }
    return config;
});

export { instance };
