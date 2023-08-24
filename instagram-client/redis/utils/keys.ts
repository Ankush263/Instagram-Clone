// user
export const userKey = (userId: string) => `InstagramUser#${userId}`;
export const allUserKey = () => `InstagramUsers`;

// post
export const postKey = (postId: string) => `InstagramPost#${postId}`;
export const allPostKey = () => `InstagramPosts`;
export const postLikesKey = (userId: string, postId: string) =>
	`InstagramPostLike#${userId}:${postId}`;
