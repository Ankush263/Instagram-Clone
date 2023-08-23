import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Story from '@/components/Stories/Story';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import RightSideComponent from '@/components/SideComponents/RightSideComponent';
import { getAllPosts, createLikeInPost } from '@/api';
import { fetchToken } from '../token';
import CommentOutline from '../icons/CommentOutline';
import NotificationOutline from '../icons/NotificationOutline';
import LikedIcon from '../icons/LikedIcon';

function HomePage() {
	const [posts, setPosts] = useState([]);
	const [liked, setLiked] = useState(false);

	const fetchPosts = async () => {
		try {
			const token = fetchToken();
			const post = await getAllPosts(token);
			setPosts(post.data.data.data);
			console.log('post: ', post.data.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async (postId: any) => {
		// setLiked((prev) => !prev);
		try {
			const token = fetchToken();
			console.log(postId);
			const res = await createLikeInPost(postId as string, token);
			console.log('res: ', res);
		} catch (error) {
			console.log(error);
		}
	};

	const timeAgo = (timestamp: string): string => {
		const postDate = new Date(timestamp);
		const currentDate = new Date();
		const timeDifferenceInSeconds =
			(currentDate.getTime() - postDate.getTime()) / 1000;

		if (timeDifferenceInSeconds < 60) {
			return `${Math.floor(timeDifferenceInSeconds)} sec`;
		} else if (timeDifferenceInSeconds < 60 * 60) {
			return `${Math.floor(timeDifferenceInSeconds / 60)} m`;
		} else if (timeDifferenceInSeconds < 60 * 60 * 24) {
			return `${Math.floor(timeDifferenceInSeconds / 60 / 60)} h`;
		} else if (timeDifferenceInSeconds < 60 * 60 * 24 * 7) {
			return `${Math.floor(timeDifferenceInSeconds / 60 / 60 / 24)} d`;
		} else if (timeDifferenceInSeconds < 60 * 60 * 24 * 30) {
			return `${Math.floor(timeDifferenceInSeconds / 60 / 60 / 24 / 7)} W`;
		} else {
			return `${Math.floor(timeDifferenceInSeconds / 60 / 60 / 24 / 30)} month`;
		}
	};

	useEffect(() => {
		fetchPosts();
	}, []);

	const styles = {
		page: `flex justify-center items-center`,
		leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
		main: `w-6/12 flex flex-col justify-start items-center mb-auto ml-[300px]`,
		rightBar: `h-screen w-4/12 mb-auto`,
		rightBarHidden: `hidden`,
		navBar: `w-10/12 h-[95px] ml-auto mt-10`,
		scrollBox: `w-full mt-10 flex flex-col justify-center items-center`,
		postBox: `w-[450px] ml-[100px] mb-20 flex flex-col justify-center items-center`,
		postAvaterBox: `w-full h-[40px] flex justify-start items-center mb-auto`,
		postMain: `w-full h-[550px] border-2 border-gray flex justify-between items-center`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className={styles.main}>
				<Box className={styles.navBar}>
					<Story />
				</Box>
				<Box className={styles.scrollBox}>
					{posts.map((post: any) => {
						return (
							<Box className={styles.postBox} key={post._id}>
								<Box className={styles.postAvaterBox}>
									<Box className="w-[35px] h-[35px] rounded-full border-2"></Box>
									<p className="text-xs font-bold ml-2">{post.user.username}</p>
									<span className="w-1 h-1 border-2 border-darkGray rounded-full ml-3"></span>
									<p className="text-sm text-darkGray ml-1">
										{timeAgo(post.createdAt)}
									</p>
								</Box>
								<Box className={styles.postMain}>
									<img src={post.url} alt="#" />
								</Box>
								<Box className="w-full h-[40px] flex justify-start items-start mt-3">
									<Box
										className="cursor-pointer"
										onClick={() => handleLike(post._id)}
									>
										{/* {liked ? <LikedIcon /> : <NotificationOutline />} */}
										<NotificationOutline />
									</Box>
									<Box className="ml-3">
										<CommentOutline />
									</Box>
								</Box>
								<Box className="w-full flex justify-start items-start">
									<span className="text-sm">
										{post.likesNum}
										{` likes`}
									</span>
								</Box>
								<Box className="w-11/12 border-b-2 mt-8 border-gray"></Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Box className={styles.rightBar}>
				{/* 1220 */}
				<RightSideComponent />
			</Box>
		</Box>
	);
}

export default HomePage;
