import { Box, Skeleton } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { createFollow, deleteFollow } from '@/api';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchToken } from '../token';

function FollowBtnComponent(props: any) {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleFollow = async () => {
		handleOpen();
		try {
			const token = fetchToken();
			await createFollow(token, { to: props.userId });
			props.fetch();
			handleClose();
		} catch (error) {
			console.log(error);
			handleClose();
		}
	};

	const handleUnfollow = async () => {
		handleOpen();
		try {
			const token = fetchToken();
			await deleteFollow(token, props.id);
			props.fetch();
			handleClose();
		} catch (error) {
			console.log(error);
			handleClose();
		}
	};

	useEffect(() => {
		props.fetch();
	}, []);

	const styles = {
		component: `w-full h-full flex justify-center items-center`,
		blueBtn: `w-32 h-9 bg-skyBlue rounded-md`,
		grayBtn: `w-32 h-9 bg-darkGray rounded-md`,
	};
	return (
		<Box className={styles.component}>
			{props?.name ? (
				<span className="text-xl mr-auto">{props.name}</span>
			) : (
				<Skeleton
					variant="text"
					sx={{
						fontSize: '2rem',
						bgcolor: 'grey.900',
						width: '200px',
						marginRight: '20px',
					}}
				/>
			)}

			{props.follow ? (
				<button className={styles.grayBtn} onClick={handleUnfollow}>
					Unfollow
				</button>
			) : (
				<button className={styles.blueBtn} onClick={handleFollow}>
					Follow
				</button>
			)}
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Box>
	);
}

export default FollowBtnComponent;
