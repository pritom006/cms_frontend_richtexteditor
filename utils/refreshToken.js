import axios from 'axios';

export const refreshToken = async () => {
    try {
        const refresh = localStorage.getItem('refresh');
        if (!refresh) {
            throw new Error('No refresh token found');
        }
        console.log('Refresh Token:', refresh); 
        const response = await axios.post('http://0.0.0.0:8000/api/auth/token/refresh/', { refresh });
        localStorage.setItem('access', response.data.access);
        return response.data.access;
    } catch (error) {
        console.error('Failed to refresh token', error);
        return null;
    }
};