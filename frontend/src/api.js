import axios from 'axios';

const defaultApiBaseUrl = 'http://localhost:8080/api';
const apiBaseUrl = process.env.REACT_APP_API_URL || defaultApiBaseUrl;

const api = axios.create({
	baseURL: apiBaseUrl,
});

export default api;

