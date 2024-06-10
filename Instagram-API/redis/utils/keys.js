// user
exports.userKey = (userId) => `InstagramUser#${userId}`;
exports.allUserKey = () => `InstagramUsers`;

// post
exports.postKey = (postId) => `InstagramPost#${postId}`;
exports.allPostKey = () => `InstagramPosts`;
exports.postLikesKey = (postId) => `InstagramPostLike#${postId}`;
