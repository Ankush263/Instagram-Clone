import axios from 'axios';

const URL = `http://localhost:5000`;

const USER_URL = `${URL}/api/v1/user`;
const POST_URL = `${URL}/api/v1/post`;
const POST_LIKE_URL = `${URL}/api/v1/postLikes`;

const USER_API = axios.create({ baseURL: USER_URL });
const POST_API = axios.create({ baseURL: POST_URL });
const POST_LIKE_API = axios.create({ baseURL: POST_LIKE_URL });

export const signup = (signupDetails: any) =>
	USER_API.post(`/signup`, signupDetails);

export const login = (loginDetails: any) =>
	USER_API.post(`/login`, loginDetails);

export const getMe = (_token: string) =>
	USER_API.get(`/me`, { headers: { Authorization: `Bearer ${_token}` } });

export const createPost = (_token: string, _formData: FormData) =>
	POST_API.post(`/`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});

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

export const deleteLikeFromPost = (likeId: string, _token: string) =>
	POST_LIKE_API.delete(`/${likeId}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
