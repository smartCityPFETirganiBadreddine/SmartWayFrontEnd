import { instance } from 'config/api';
import { setAuthToken } from 'helpers/setAuthToken';

export async function login(loginPayload) {
    try {
        const response = await instance.post(`/auth/signin`, loginPayload);
        const accessToken = response.data.accessToken;
        const refreshToken = response.data.refreshToken;
        // set JWT tokens to local storage
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        // set tokens to axios common header
        setAuthToken(accessToken);
        return { accessToken, refreshToken, errorMessage: null };
    } catch (error) {
        const errorMessage = error.response ? error.response.data.errorMessage : 'An error occurred && No Internet Connection';
        return { accessToken: null, refreshToken: null, errorMessage };
    }
}
export async function forgetPassword(email) {
    const url = `http://localhost:8080/api/auth/forgot-password?email=${email}`;
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}
export async function resetPassword(password, token) {
    //http://localhost:8080/api/auth/reset-password?token=4b149ff1-4c00-4325-a58d-d144291a297b
    const url = `http://localhost:8080/api/auth/reset-password?token=${token}`;
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password })
    });
    const data = await response.json();
    return data;
}
