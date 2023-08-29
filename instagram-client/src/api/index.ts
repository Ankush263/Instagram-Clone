import axios from 'axios';

const URL = `http://localhost:5000`;

const USER_URL = `${URL}/api/v1/user`;
const POST_URL = `${URL}/api/v1/post`;
const POST_LIKE_URL = `${URL}/api/v1/postLikes`;
const POST_TAG_URL = `${URL}/api/v1/postTag`;
const COMMENT_URL = `${URL}/api/v1/comment`;
const STORY_URL = `${URL}/api/v1/story`;

const USER_API = axios.create({ baseURL: USER_URL });
const POST_API = axios.create({ baseURL: POST_URL });
const POST_LIKE_API = axios.create({ baseURL: POST_LIKE_URL });
const POST_TAG_API = axios.create({ baseURL: POST_TAG_URL });
const COMMENT_API = axios.create({ baseURL: COMMENT_URL });
const STORY_API = axios.create({ baseURL: STORY_URL });

export const signup = (signupDetails: any) =>
	USER_API.post(`/signup`, signupDetails);

export const login = (loginDetails: any) =>
	USER_API.post(`/login`, loginDetails);

export const getMe = (_token: string) =>
	USER_API.get(`/me`, { headers: { Authorization: `Bearer ${_token}` } });

export const getAllUsers = (_token: string) =>
	USER_API.get(`/`, { headers: { Authorization: `Bearer ${_token}` } });

export const getSingleUser = (_token: string, id: string) =>
	USER_API.get(`/${id}`, { headers: { Authorization: `Bearer ${_token}` } });

export const updateBio = (_token: string, details: { bio: string }) =>
	USER_API.patch(`/updateMe`, details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const createPost = (_token: string, _formData: FormData) =>
	POST_API.post(`/`, _formData, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const createPostTag = (
	_token: string,
	_details: { post: string; username: string; x: number; y: number }
) =>
	POST_TAG_API.post(`/username`, _details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getAllPosts = (_token: string) =>
	POST_API.get(`/`, { headers: { Authorization: `Bearer ${_token}` } });

export const getSinglePost = (_token: string, _id: string) =>
	POST_API.get(`/${_id}`, { headers: { Authorization: `Bearer ${_token}` } });

export const createCommentOnPost = (
	_token: string,
	details: { post: string; contents: string }
) =>
	COMMENT_API.post(`/`, details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getIdAndPhotoOfPosts = (_token: string) =>
	POST_API.get(`/?fields=url,-user`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

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

export const createStory = (_token: string, details: FormData) =>
	STORY_API.post(`/`, details, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getMyStory = (_token: string) =>
	STORY_API.get(`/myStory`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getStoriesByUser = (_token: string, id: string) =>
	STORY_API.get(`/storyByUserId/${id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const getAllStories = (_token: string) =>
	STORY_API.get(`/`, {
		headers: { Authorization: `Bearer ${_token}` },
	});

export const deleteStory = (_token: string, _id: string) =>
	STORY_API.delete(`/${_id}`, {
		headers: { Authorization: `Bearer ${_token}` },
	});
