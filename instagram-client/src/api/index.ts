import axios from 'axios';

const URL = `http://localhost:5000`;

const AUTH_URL = `${URL}/api/v1/user`;
const POST_URL = `${URL}/api/v1/post`;
const POST_LIKE_URL = `${URL}/api/v1/postLikes`;

const AUTH_API = axios.create({ baseURL: AUTH_URL });
const POST_API = axios.create({ baseURL: POST_URL });
const POST_LIKE_API = axios.create({ baseURL: POST_LIKE_URL });

export const signup = (signupDetails: any) =>
	AUTH_API.post(`/signup`, signupDetails);

export const login = (loginDetails: any) =>
	AUTH_API.post(`/login`, loginDetails);

export const getAllPosts = (_token: string) =>
	POST_API.get(`/`, { headers: { Authorization: `Bearer ${_token}` } });

export const createLikeInPost = (postId: string, _token: string) =>
	POST_LIKE_API.post(
		`/`,
		{ post: postId },
		{
			headers: { Authorization: `Bearer ${_token}` },
		}
	);
