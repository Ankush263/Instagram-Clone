import React, { useState } from 'react';
import CreateFilled from '../icons/CreateFilled';
import CreateOutline from '../icons/CreateOutline';
import { RxCross1 } from 'react-icons/rx';
import { Box } from '@mui/material';
import PhotoAndVideoIcon from '../icons/PhotoAndVideoIcon';

function CreatePostPopup() {
	const [clicked, setClicked] = useState(false);
	const handleClick = () => {
		setClicked((prev) => !prev);
	};
	const styles = {
		container: `w-full h-full flex justify-start items-center`,
		iconBox: `w-full h-full flex justify-start items-center`,
		popupBox: `w-[495px] h-[537.6px] absolute right-[530px] rounded-xl bottom-[80px] bg-gray cursor-default drop-shadow-2xl`,
		popupBoxTop: `h-12 w-full flex justify-center items-center border-b-2 border-grayshBlack`,
		inputFileBtn: `w-40 p-0.5 h-8 rounded-lg cursor-pointer flex justify-center items-center text-sm font-semibold bg-skyBlue hover:bg-deepBlue`,
		popupBoxMain: `w-full h-[490px] flex flex-col justify-center items-center`,
	};

	const openPopup = () => {
		if (clicked) {
			return (
				<Box className={styles.popupBox}>
					<Box className={styles.popupBoxTop}>
						<span className="font-semibold">Create new post</span>
					</Box>
					<Box className={styles.popupBoxMain}>
						<PhotoAndVideoIcon />
						<span className="text-xl mt-3 mb-4">
							Drag photos and videos here
						</span>
						<input type="file" id="actual-btn" hidden />
						<label htmlFor="actual-btn" className={styles.inputFileBtn}>
							Select from computer
						</label>
					</Box>
				</Box>
			);
		}
	};

	const closePopup = () => {
		if (clicked) {
			return (
				<Box className="absolute right-3 top-3">
					<RxCross1 size={28} onClick={handleClick} />
				</Box>
			);
		}
	};

	return (
		<Box className={styles.container}>
			{clicked ? (
				<Box className={styles.iconBox} onClick={handleClick}>
					<CreateFilled />
					<p className="ml-3 font-bold">Create</p>
				</Box>
			) : (
				<Box className={styles.iconBox} onClick={handleClick}>
					<CreateOutline />
					<p className="ml-3">Create</p>
				</Box>
			)}
			{openPopup()}
			{closePopup()}
		</Box>
	);
}

export default CreatePostPopup;
