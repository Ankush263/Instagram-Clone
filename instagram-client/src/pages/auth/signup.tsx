import React from 'react';
import { Box } from '@mui/material';
import SignupComponent from '@/auth/SignupComponent';

function signup() {
	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		container: `border-2 border-lightGray flex flex-col justify-start items-center mt-5 mb-10`,
		inputContainer: `w-9/12 flex flex-col justify-center items-center`,
		input: `w-full h-8 text-sm border-2 border-lightGray placeholder:text-xs p-1 mb-3`,
		link: `text-sm text-lightBlack`,
		smallText: `text-xs text-darkGray`,
		darkBlueBtnBox: `mt-3 w-9/12 bg-deepBlue rounded-lg flex justify-center p-0.5 items-center cursor-pointer`,
		lightBlueBtnBox: `mt-3 w-9/12 bg-lightBlue rounded-lg flex justify-center p-1 items-center cursor-pointer mb-10`,
		lowerContainer: `w-7/12 h-10 mt-5 mb-3 flex justify-between items-center`,
		termsTxt: `text-xs text-center text-darkGray`,
		termTxtBox: `w-9/12 flex flex-col justify-center items-center mt-2`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.container} sx={{ width: '350px' }}>
				<Box className="border-black mt-10">
					<img
						src="/image/instagram-txt-white.png"
						className="w-48 mb-3"
						alt="#"
					/>
				</Box>
				<Box
					sx={{
						color: 'rgb(115, 115, 115)',
						fontSize: '17px',
						fontWeight: '600',
						lineHeight: '20px',
						margin: '0px 40px 10px',
						textAlign: 'center',
					}}
				>
					<p>Sign up to see photos and </p>
					<p>videos from your friends.</p>
				</Box>
				<Box className={styles.darkBlueBtnBox}>
					<img src="/image/facebook-white.png" className="w-7 mr-1" alt="#" />
					<p className="text-white font-semibold">Log in with Facebook</p>
				</Box>
				<Box className="w-9/12 mt-5 mb-5 flex justify-between items-center">
					<Box className="border-b-2 border-black w-4/12 text-lightGray"></Box>
					<Box className="text-sm ">OR</Box>
					<Box className="border-b-2 border-black w-4/12 text-lightGray"></Box>
				</Box>
				<SignupComponent />
			</Box>
			<Box className={styles.lowerContainer}>
				<p className={styles.smallText}>Meta</p>
				<p className={styles.smallText}>About</p>
				<p className={styles.smallText}>Blog</p>
				<p className={styles.smallText}>Jobs</p>
				<p className={styles.smallText}>Help</p>
				<p className={styles.smallText}>Api</p>
				<p className={styles.smallText}>Privecy</p>
				<p className={styles.smallText}>Terms</p>
				<p className={styles.smallText}>Top Accounts</p>
				<p className={styles.smallText}>Locations</p>
				<p className={styles.smallText}>Instagram Light</p>
				<p className={styles.smallText}>Threads</p>
				<p className={styles.smallText}>Contact Uploading & Non Users</p>
				<p className={styles.smallText}>Meta Verified</p>
			</Box>
			<Box className="flex justify-between items-center w-2/12 mb-10">
				<p className={styles.smallText}>Meta Verified</p>
				<p className={styles.smallText}>{`© 2023 Instagram from Meta`}</p>
			</Box>
		</Box>
	);
}

export default signup;
