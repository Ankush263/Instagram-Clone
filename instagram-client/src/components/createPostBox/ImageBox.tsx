import { Box } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import { RxCross1 } from 'react-icons/rx';
import PhotoAndVideoIcon from 'public/icons/PhotoAndVideoIcon';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import { GetStaticProps } from 'next';

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

function ImageBox(props: any) {
	const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		props.setImgFile(file);

		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target) {
					props.setSelectedImage(e.target.result as string);
				}
			};

			reader.readAsDataURL(file);
		}
	};

	const handleClose = () => {
		props.setOpen(false);
		props.setClicked(false);
		props.setSelectedImage(null);
		props.setStartWritingCaption(false);
	};

	const styles = {
		popupBox: `w-[495px] h-[537.6px] absolute right-[530px] rounded-xl bottom-[80px] bg-gray cursor-default drop-shadow-2xl`,
		popupBoxTop: `h-12 w-full flex justify-center items-center border-b-2 border-grayshBlack`,
		inputFileBtn: `w-40 p-0.5 h-8 rounded-lg cursor-pointer flex justify-center items-center text-sm font-semibold bg-skyBlue hover:bg-deepBlue`,
		popupBoxMain: `w-full h-[490px] flex flex-col justify-center items-center`,
	};
	return (
		<Box className={styles.popupBox}>
			<Box className={styles.popupBoxTop}>
				<Box className="w-7/12 h-full flex justify-end items-center">
					{props.selectedImage && (
						<Box
							className="mr-auto cursor-pointer"
							onClick={() => props.setSelectedImage(null)}
						>
							<KeyboardBackspaceOutlinedIcon fontSize="medium" />
						</Box>
					)}
					<span className="font-semibold">Create new post</span>
				</Box>
				<Box className="w-4/12 h-full flex justify-end items-center">
					{props.selectedImage ? (
						<span
							className="cursor-pointer font-bold text-skyBlue"
							onClick={() => props.setStartWritingCaption(true)}
						>
							next
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
				{props.selectedImage ? (
					<img
						src={props.selectedImage}
						alt="Selected"
						className="max-w-full max-h-full"
					/>
				) : (
					<Box className="w-full h-full flex flex-col justify-center items-center">
						<PhotoAndVideoIcon />
						<span className="text-xl mt-3 mb-4">
							Drag photos and videos here
						</span>
						<input
							type="file"
							id="actual-btn"
							hidden
							onChange={handleImageChange}
						/>
						<label htmlFor="actual-btn" className={styles.inputFileBtn}>
							Select from computer
						</label>
					</Box>
				)}
			</Box>
		</Box>
	);
}

export default ImageBox;
