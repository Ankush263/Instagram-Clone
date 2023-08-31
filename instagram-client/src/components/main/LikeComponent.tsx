import { Box } from '@mui/material';
import React, { useState, useEffect, useMemo } from 'react';
import NotificationOutline from 'public/icons/NotificationOutline';
import LikedIcon from 'public/icons/LikedIcon';
import { fetchToken } from '../token';
import { createLikeInPost, getMe, deleteLikeFromPost } from '@/api';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			reload: function () {},
			_id: '',
		},
	};
};

function LikeComponent(props: any) {
	const [likedPosts, setLikedPosts] = useState<any[]>([]);
	const [shouldFetchLikedPosts, setShouldFetchLikedPosts] =
		useState<boolean>(true);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const likedPostIds = useMemo(
		() => likedPosts.map((i) => i.post),
		[likedPosts]
	);

	const fetch = async () => {
		try {
			if (shouldFetchLikedPosts) {
				const token = fetchToken();
				const self = await getMe(token);
				setLikedPosts(self.data.data.data.likedPosts);
				setShouldFetchLikedPosts(false);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleLike = async (postId: string) => {
		setOpen(true);
		try {
			const token = fetchToken();
			await Promise.all([
				createLikeInPost(postId as string, token),
				props.reload(),
			]);
			setShouldFetchLikedPosts(true);
			setOpen(false);
		} catch (error) {
			console.log(error);
			setOpen(false);
		}
	};

	const foundLike = (postId: string) => {
		try {
			const foundItem: any = likedPosts.find((i: any) => i.post === postId);
			if (foundItem) {
				return foundItem._id;
			}
		} catch (error) {
			console.log(error);
			return '';
		}
	};

	const handleDislike = async (likeId: string) => {
		setOpen(true);
		try {
			const token = fetchToken();
			await deleteLikeFromPost(likeId, token);
			setShouldFetchLikedPosts(true);
			props.reload();
			setOpen(false);
		} catch (error) {
			console.log(error);
			setOpen(false);
		}
	};

	const likeComponent = likedPostIds.includes(props._id) ? (
		<Box onClick={() => handleDislike(foundLike(props._id))}>
			<LikedIcon />
		</Box>
	) : (
		<Box onClick={() => handleLike(props._id)}>
			<NotificationOutline />
		</Box>
	);

	useEffect(() => {
		fetch();
	}, [shouldFetchLikedPosts, props.reload]);

	return (
		<Box className="w-full h-full">
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{likeComponent}
		</Box>
	);
}

export default LikeComponent;
