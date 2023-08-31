import React, { useState } from 'react';
import CreateFilled from 'public/icons/CreateFilled';
import CreateOutline from 'public/icons/CreateOutline';
import { Box } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import ImageBox from '../createPostBox/ImageBox';
import ImageBoxWithDetails from '../createPostBox/ImageBoxWithDetails';

function CreatePostPopup() {
	const [clicked, setClicked] = useState(false);
	const [open, setOpen] = useState(false);
	const [startWritingCaption, setStartWritingCaption] = useState(false);
	const [selectedImage, setSelectedImage] = useState<string | null>(null);
	const [imgFile, setImgFile] = useState(null);

	const handleClick = () => {
		setClicked((prev) => !prev);
		setOpen((prev) => !prev);
	};

	const styles = {
		container: `w-full h-full flex justify-start items-center`,
		iconBox: `w-full h-full flex justify-start items-center`,
		popupBox: `w-[495px] h-[537.6px] absolute right-[530px] rounded-xl bottom-[80px] bg-gray cursor-default drop-shadow-2xl`,
		popupBoxTop: `h-12 w-full flex justify-center items-center border-b-2 border-grayshBlack`,
		inputFileBtn: `w-40 p-0.5 h-8 rounded-lg cursor-pointer flex justify-center items-center text-sm font-semibold bg-skyBlue hover:bg-deepBlue`,
		popupBoxMain: `w-full h-[490px] flex flex-col justify-center items-center`,
	};

	return (
		<Box className={styles.container}>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
			>
				{!startWritingCaption ? (
					<ImageBox
						open={open}
						setOpen={setOpen}
						startWritingCaption={startWritingCaption}
						setStartWritingCaption={setStartWritingCaption}
						clicked={clicked}
						setClicked={setClicked}
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						setImgFile={setImgFile}
					/>
				) : (
					<ImageBoxWithDetails
						open={open}
						setOpen={setOpen}
						startWritingCaption={startWritingCaption}
						setStartWritingCaption={setStartWritingCaption}
						clicked={clicked}
						setClicked={setClicked}
						selectedImage={selectedImage}
						setSelectedImage={setSelectedImage}
						imgFile={imgFile}
					/>
				)}
			</Backdrop>
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
		</Box>
	);
}

export default CreatePostPopup;
