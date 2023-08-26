import { Box } from '@mui/material';
import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { GetStaticProps } from 'next';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import { createPost } from '@/api';
import { fetchToken } from '../token';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			open: false,
			setOpen: function () {},
			startWritingCaption: false,
			setStartWritingCaption: function () {},
			clicked: false,
			setClicked: function () {},
		},
	};
};

function ImageBoxWithDetails(props: any) {
	const [postDetails, setPostDetails] = useState<any>({
		url: props.imgFile,
		location: '',
		caption: '',
	});
	const [open, setOpen] = useState(false);
	const [tagNum, setTagNum] = useState<any>([]);
	const [createTag, setCreateTag] = useState<boolean>(true);

	const handleClosed = () => {
		setOpen(false);
	};

	const handleCLickOnImage = async (event: any) => {
		setCreateTag(false);
		try {
			const x = event.clientX;
			const y = event.clientY;
			setTagNum([...tagNum, { x, y }]);
		} catch (error) {
			console.log(error);
		}
	};

	const handleClick = async () => {
		setOpen(true);
		try {
			const token = fetchToken();
			const formData = new FormData();
			formData.append('url', postDetails.url);
			formData.append('location', postDetails.location);
			formData.append('caption', postDetails.caption);
			await createPost(token, formData);
			window.location.replace(`/`);
			handleClosed();
		} catch (error) {
			console.log(error);
			handleClosed();
		}
	};

	const tagBox = () => {
		return (
			<Box
				className="w-56 h-9 rounded-md bg-black absolute flex justify-center items-center"
				sx={{ left: `130px`, top: `80px` }}
			>
				<span className="text-sm font-semibold">click photo to tag people</span>
			</Box>
		);
	};

	const inputTag = (x: number, y: number) => {
		return (
			<Box
				className="w-56 h-9 rounded-md bg-black absolute flex justify-center items-center"
				sx={{
					left: `${x < 351 ? x - 47 : 340}px`,
					top: `${y < 590 ? y - 89 : 490}px`,
				}}
				onClick={() => console.log(x, y)}
			>
				<input
					type="text"
					className="w-11/12 h-full bg-black outline-none"
					placeholder="people..."
				/>
			</Box>
		);
	};

	const handleClose = () => {
		props.setOpen(false);
		props.setClicked(false);
		props.setSelectedImage(null);
		props.setStartWritingCaption(false);
		setTagNum([]);
		setCreateTag(false);
	};

	const handleBack = () => {
		props.setSelectedImage(null);
		setTagNum([]);
		setCreateTag(false);
	};

	const styles = {
		popupBox: `w-[795px] h-[537.6px] absolute right-[330px] rounded-xl bottom-[80px] bg-gray cursor-default drop-shadow-2xl`,
		popupBoxTop: `h-12 w-full flex justify-center items-center border-b-2 border-grayshBlack`,
		inputFileBtn: `w-40 p-0.5 h-8 rounded-lg cursor-pointer flex justify-center items-center text-sm font-semibold bg-skyBlue hover:bg-deepBlue`,
		popupBoxMain: `w-full h-[490px] flex justify-center items-center`,
		boxLeft: `w-7/12 h-full flex justify-center items-center`,
		boxRight: `w-5/12 h-full flex flex-col justify-start items-center`,
	};
	return (
		<Box className={styles.popupBox}>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClosed}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
			<Box className={styles.popupBoxTop}>
				<Box className="w-7/12 h-full flex justify-end items-center">
					{props.selectedImage && (
						<Box className="mr-auto cursor-pointer" onClick={handleBack}>
							<KeyboardBackspaceOutlinedIcon
								fontSize="medium"
								className="ml-2"
							/>
						</Box>
					)}
					<span className="font-semibold">Create new post</span>
				</Box>
				<Box className="w-4/12 h-full flex justify-end items-center ml-auto">
					{props.selectedImage ? (
						<span
							className="cursor-pointer font-bold text-skyBlue mr-4"
							onClick={handleClick}
						>
							Share
						</span>
					) : (
						<RxCross1
							size={20}
							onClick={handleClose}
							className="cursor-pointer"
						/>
					)}
				</Box>
			</Box>
			<Box className={styles.popupBoxMain}>
				<Box className={styles.boxLeft}>
					<img
						src={props.selectedImage}
						alt="Selected"
						className="full h-full cursor-crosshair"
						onClick={handleCLickOnImage}
					/>
					{createTag && tagBox()}
					{!createTag &&
						tagNum.map((i: any) => {
							return inputTag(i.x, i.y);
						})}
				</Box>
				<Box className={styles.boxRight}>
					<Box className="w-full h-12 mt-2">
						<Box className="h-full ml-3 flex justify-start items-center">
							<Box className="w-8 h-8 rounded-full border-2"></Box>
							<span className="ml-2 text-sm font-semibold">an.kush3293</span>
						</Box>
					</Box>
					<Box className="w-11/12 h-52 mt-3 flex">
						<textarea
							className="w-full h-full bg-gray focus:outline-none"
							placeholder="Write a caption..."
							value={postDetails.caption}
							onChange={(e: any) =>
								setPostDetails({ ...postDetails, caption: e.target.value })
							}
						/>
					</Box>
					<Box className="w-11/12 flex h-10 mt-3 justify-center items-center">
						<input
							type="text"
							className="w-11/12 h-full bg-gray focus:outline-none"
							placeholder="Add location"
							value={postDetails.location}
							onChange={(e: any) =>
								setPostDetails({ ...postDetails, location: e.target.value })
							}
						/>
						<FmdGoodOutlinedIcon fontSize="small" />
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default ImageBoxWithDetails;
