import { Box } from '@mui/material';
import React, { ChangeEvent, useState, useEffect } from 'react';
import CloseIcon from '@mui/icons-material/Close';

function StoryBox(props: any) {
	const [selectedImage, setSelectedImage] = useState<any>('');
	const [uploaded, setUploaded] = useState(false);

	const close = () => {
		props.handleClose();
		setSelectedImage('');
		setUploaded(false);
	};

	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target) {
					setSelectedImage(e.target.result as string);
				}
			};
			reader.readAsDataURL(file);
			setUploaded(true);
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
			{uploaded ? (
				<Box>
					<span className={styles.postBtn}>post</span>
					<img
						src={selectedImage}
						alt="Selected"
						className="max-w-full max-h-full"
					/>
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
