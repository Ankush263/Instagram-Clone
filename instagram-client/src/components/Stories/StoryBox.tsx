import { Box } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { createStory } from '@/api';
import { fetchToken } from '../token';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function StoryBox(props: any) {
	const [selectedImage, setSelectedImage] = useState<any>('');
	const [uploaded, setUploaded] = useState(false);
	const [imgFile, setImgFile] = useState<any>('');
	const [open, setOpen] = React.useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const close = () => {
		props.handleClose();
		setSelectedImage('');
		setUploaded(false);
	};

	const handleUpload = async () => {
		handleOpen();
		try {
			const token = fetchToken();
			const formData = new FormData();
			formData.append('url', imgFile);
			await createStory(token, formData);
			handleClose();
			close();
		} catch (error) {
			console.log(error);
			handleClose();
		}
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		setImgFile(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target) {
					setSelectedImage(e.target.result as string);
					setUploaded(true);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const styles = {
		component: `w-[400px] h-[600px] rounded-md bg-gray flex justify-center items-center`,
		btn: `bg-skyBlue p-2 w-32 rounded-md flex justify-center items-center cursor-pointer`,
		postBtn: `absolute top-20 left-1/2 ml-[130px] font-bold text-skyBlue cursor-pointer`,
		closeBox: `absolute top-4 right-6 cursor-pointer`,
	};
	return (
		<Box className={styles.component}>
			<Box className={styles.closeBox} onClick={close}>
				<CloseIcon fontSize="large" />
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			{uploaded ? (
				<Box className="w-full h-full flex justify-center items-center">
					<span className={styles.postBtn} onClick={handleUpload}>
						post
					</span>

					{selectedImage && (
						<img
							src={selectedImage}
							alt="Selected"
							className="max-w-full max-h-full"
						/>
					)}
				</Box>
			) : (
				<Box>
					<input
						type="file"
						id="actual-btn"
						hidden
						onChange={handleImageChange}
					/>
					<label htmlFor="actual-btn" className={styles.btn}>
						Upload Story
					</label>
				</Box>
			)}
		</Box>
	);
}

export default StoryBox;
