import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import Story from '@/components/Stories/Story';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import RightSideComponent from '@/components/SideComponents/RightSideComponent';
import { getAllPosts } from '@/api';
import { fetchToken } from '../token';
import CommentOutline from '../icons/CommentOutline';
import LikeComponent from './LikeComponent';
import { time } from '@/api/calcTime';
import PostComponent from '../post/PostComponent';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function HomePage() {
	const [posts, setPosts] = useState([]);
	const [reloadComponent, setReloadComponent] = useState(false);
	const [details, setDetails] = useState({});
	const [load, setLoad] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const fetch = async () => {
		try {
			const token = fetchToken();
			const post = await getAllPosts(token);
			setPosts(post.data.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleOpenPost = async (id: string, url: string, avater: string) => {
		try {
			setOpen(true);
			setDetails({ id, url, avater });
			setLoad((prev) => !prev);
		} catch (error) {
			console.log(error);
		}
	};

	const handleReload = () => {
		setReloadComponent((prevState) => !prevState);
	};

	useEffect(() => {
		setTimeout(() => {
			fetch();
		}, 1000);
	}, [reloadComponent]);

	const styles = {
		page: `flex justify-center items-center`,
		leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
		main: `w-6/12 flex flex-col justify-start items-center mb-auto ml-[300px]`,
		rightBar: `h-screen w-4/12 mb-auto`,
		rightBarHidden: `hidden`,
		navBar: `w-10/12 h-[95px] ml-auto mt-10 flex justify-between items-center`,
		scrollBox: `w-full mt-10 flex flex-col justify-center items-center`,
		postBox: `w-[450px] ml-[100px] mb-20 flex flex-col justify-center items-center`,
		postAvaterBox: `w-full h-[40px] flex justify-start items-center mb-5`,
		postMain: `w-full h-[550px] border-2 border-gray flex justify-center items-center`,
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
									<Link
										href={{
											pathname: `/main/ProfilePage`,
											query: { id: post.user._id },
										}}
									>
										<Box className="w-[35px] h-[35px] rounded-full cursor-pointer">
											{post?.user?.avater ? (
												<img
													src={post?.user?.avater}
													className="w-full h-full rounded-full"
												/>
											) : (
												<AccountCircleIcon className="w-full h-full" />
											)}
										</Box>
									</Link>
									<Link
										href={{
											pathname: `/main/ProfilePage`,
											query: { id: post.user._id },
										}}
									>
										<p className="text-xs font-bold ml-2 cursor-pointer">
											{post.user.username}
										</p>
									</Link>
									<span className="w-1 h-1 border-2 border-darkGray rounded-full ml-3"></span>
									<p className="text-sm text-darkGray ml-1">
										{time(post.createdAt)}
									</p>
								</Box>
								<Box className={styles.postMain}>
									<img
										src={post.url}
										className="max-w-full max-h-full"
										alt="#"
									/>
								</Box>
								<Box className="w-full h-[40px] flex justify-start items-start mt-3">
									<Box className="cursor-pointer">
										<LikeComponent _id={post._id} reload={handleReload} />
									</Box>
									<Box
										className="ml-3"
										onClick={() =>
											handleOpenPost(post?._id, post?.url, post?.user.avater)
										}
									>
										<CommentOutline />
									</Box>
								</Box>
								<Box className="w-full flex justify-start items-start">
									<span className="text-sm">
										{post.likesNum}
										{` likes`}
									</span>
								</Box>
								<Box className="w-full">
									<span className="font-semibold text-sm">
										{post.user.username}
										{'    '}
									</span>
									<span className="text-sm text-left">{post.caption}</span>
								</Box>
								<Box className="w-full cursor-pointer">
									<span
										className="text-sm text-darkGray"
										onClick={() =>
											handleOpenPost(post?._id, post?.url, post?.user?.avater)
										}
									>
										View all comments...
									</span>
								</Box>
								<Box className="w-11/12 border-b-2 mt-5 border-gray"></Box>
							</Box>
						);
					})}
				</Box>
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				<Box className="ml-10">
					<PostComponent details={details} load={load} />
				</Box>
				<Box
					className="absolute top-3 right-6 cursor-pointer"
					onClick={handleClose}
				>
					<CloseIcon fontSize="large" />
				</Box>
			</Backdrop>
			<Box className={styles.rightBar}>
				{/* 1220 */}
				<RightSideComponent />
			</Box>
		</Box>
	);
}

export default HomePage;
