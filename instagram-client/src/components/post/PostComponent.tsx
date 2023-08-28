import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { getSinglePost, createCommentOnPost, createLikeInPost } from '@/api';
import { fetchToken } from '../token';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { time } from '@/api/calcTime';
import LikedIcon from '../icons/LikedIcon';
import NotificationOutline from '../icons/NotificationOutline';
import CommentOutline from '../icons/CommentOutline';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Comment from '../comment/Comment';
import { GetStaticProps } from 'next';
import LikeComponent from '../main/LikeComponent';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			load: function () {},
			details: {
				id: '',
				url: '',
			},
		},
	};
};

function PostComponent(props: any) {
	const [post, setPost] = useState<any>({});
	const [comment, setComment] = useState('');
	const [open, setOpen] = React.useState(false);
	const [reloadComponent, setReloadComponent] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const handleComment = async (id: string) => {
		setOpen(true);
		try {
			const token = fetchToken();
			const res = await createCommentOnPost(token, {
				post: id,
				contents: comment,
			});
			console.log(res.data.data.data);
			setComment('');
			fetch();
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async () => {
		setOpen(true);
		try {
			const token = fetchToken();
			await createLikeInPost(props.details.id, token);
			fetch();
			setOpen(false);
		} catch (error) {
			console.log(error);
		}
	};

	const handleReload = () => {
		setReloadComponent((prevState) => !prevState);
	};

	const fetch = async () => {
		try {
			console.log('fetch');
			const token = fetchToken();
			const res = await getSinglePost(token, props.details.id);
			console.log(res.data.data.data);
			setPost(res.data.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, [props.load, reloadComponent]);

	const styles = {
		component: `w-[1200px] h-[600px] flex justify-center items-center bg-black`,
		left: `w-7/12 h-full flex justify-center items-center border-r-2 border-gray`,
		right: `w-5/12 h-full flex flex-col justify-start items-center`,
		tagBtn: `absolute bottom-[80px] left-[200px] cursor-pointer bg-white w-5 h-5 rounded-full flex justify-center items-center`,
		commentBox: `w-full h-[285px] mt-3 flex flex-col justify-start items-center overflow-auto scroll-smooth`,
	};
	return (
		<Box className={styles.component}>
			<Box className={styles.left} onClick={() => console.log(props)}>
				<img
					src={props.details.url}
					alt="#"
					className="max-w-full max-h-full ml-auto"
				/>
				{post?.tags?.length > 0 && (
					<Box className={styles.tagBtn}>
						<AccountCircleIcon fontSize="large" htmlColor="black" />
					</Box>
				)}
			</Box>
			<Box className={styles.right}>
				<Box className="h-[90px] w-full border-b-2 border-gray flex justify-between items-center">
					<Box className="ml-4 flex">
						<Box className="border-2 h-10 w-10 rounded-full"></Box>
						<Box className="h-10 flex flex-col ml-4">
							<span className="text-sm font-semibold">
								{post?.user?.username}
							</span>
							<span className="text-sm ">{post?.location}</span>
						</Box>
					</Box>
					<Box className="mr-4">
						<MoreHorizIcon />
					</Box>
				</Box>
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
					onClick={handleClose}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
				<Box className="h-[400px] w-full border-b-2 border-gray">
					<Box className="flex ml-4 mt-2">
						<Box className="border-2 h-9 w-9 rounded-full"></Box>
						<Box className="h-10 ml-4 flex flex-col">
							<span className="text-sm font-semibold">
								{post?.user?.username}
							</span>
							<span className="text-sm">{time(post?.createdAt)}</span>
						</Box>
					</Box>
					<p className="text-xs ml-4 w-11/12 mt-4">{post?.caption}</p>
					<Box className={styles.commentBox}>
						{post?.comments?.map((i: any) => {
							return (
								<Box className="w-10/12 mb-4" key={i._id}>
									<Comment
										content={i.contents}
										createdAt={i.createdAt}
										name={i.user.username}
									/>
								</Box>
							);
						})}
					</Box>
				</Box>
				<Box className="h-[80px] w-full border-b-2 border-gray flex flex-col">
					<Box className="flex">
						<Box className="mt-3 ml-3 cursor-pointer">
							{/* <NotificationOutline /> */}
							<LikeComponent _id={props.details.id} reload={handleReload} />
						</Box>
						<Box className="mt-3 ml-3 cursor-pointer">
							<CommentOutline />
						</Box>
					</Box>
					<span className="ml-5 text-darkGray">{post?.likesNum}</span>
				</Box>
				<Box className="h-[55px] w-full flex justify-between items-center">
					<Box className="border-2 h-8 w-8 rounded-full ml-4"></Box>
					<textarea
						className="text-white w-[350px] bg-black outline-none"
						placeholder="Add a comment..."
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>

					<button
						className="text-sm font-semibold text-skyBlue"
						onClick={() => handleComment(props.details.id)}
					>
						post
					</button>
					<Box className="mr-4 cursor-pointer">
						<InsertEmoticonIcon fontSize="medium" />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default PostComponent;
