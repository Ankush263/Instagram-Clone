import axios from 'axios';

const URL = `http://localhost:5000`;

const AUTH_URL = `${URL}/api/v1/user`;

const AUTH_API = axios.create({ baseURL: AUTH_URL });

export const signup = (signupDetails: any) =>
	AUTH_API.post(`/signup`, signupDetails);
