import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import 'animate.css';
import Link from 'next/link';

function login() {
	const [currentImageIndex, setCurrentImageIndex] = useState(0);

	const images = [
		'/image/screenshot1.png',
		'/image/screenshot2.png',
		'/image/screenshot3.png',
		'/image/screenshot4.png',
	];

	const nextImage = () => {
		setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
	};

	useEffect(() => {
		const carouselTimer = setInterval(nextImage, 4000);
		return () => clearInterval(carouselTimer);
	}, []);

	const styles = {
		page: `w-screen flex flex-col justify-center items-center`,
		container: `mt-10 flex justify-center items-center`,
		animateFadein: `visible block absolute top-0 ml-40 mt-8 animate__animated animate__fadeIn animate__slower`,
		animateFadeout: `animate__animated animate__fadeOut animate__slower hidden absolute top-0 ml-40 mt-8`,
		Box: `border-2 border-lightGray flex flex-col justify-start items-center mt-5 mb-10`,
		Box2: `border-2 border-lightGray flex flex-col justify-start items-center py-5`,
		Box3: `flex flex-col justify-center items-center mt-5`,
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
			<Box className={styles.container}>
				<Box className="h-full relative">
					<img src="/image/home-phones.png" className="" alt="#" />
					{images.map((imageUrl, index) => (
						<img
							key={index}
							src={imageUrl}
							alt={`Image ${index + 1}`}
							className={
								index === currentImageIndex
									? `${styles.animateFadein}`
									: `${styles.animateFadeout}`
							}
						/>
					))}
				</Box>
				<Box className="flex flex-col">
					<Box className={styles.Box} sx={{ width: '350px' }}>
						<Box className="border-black mt-10">
							<img
								src="/image/instagram-txt-white.png"
								className="w-48 mb-3"
								alt="#"
							/>
						</Box>

						<Box className={styles.inputContainer}>
							<input
								type="email"
								className={styles.input}
								placeholder="Email"
							/>
							<input
								type="password"
								className={styles.input}
								placeholder="Password"
							/>
						</Box>

						<Box className={styles.darkBlueBtnBox}>
							<p className="text-white font-semibold">Log in</p>
						</Box>
						<Box className="w-9/12 mt-5 flex justify-between items-center">
							<Box className="border-b-2 border-black w-4/12 text-lightGray"></Box>
							<Box className="text-sm ">OR</Box>
							<Box className="border-b-2 border-black w-4/12 text-lightGray"></Box>
						</Box>
						<Box className="w-6/12 mt-5 flex justify-center items-center cursor-pointer">
							<img
								src="/image/facebook-blue.png"
								alt="#"
								className="w-6 mr-2"
							/>
							<p className="text-sm font-semibold text-violate">
								Log in with Facebook
							</p>
						</Box>
						<Box className="mt-5 mb-3">
							<p className="text-xs text-darkGray">Forgot password?</p>
						</Box>
					</Box>
					<Box className={styles.Box2}>
						<p className="text-sm">
							{`Don't have an account,`}
							<Link
								href={`/auth/signup`}
								className="text-sm text-skyBlue font-bold"
							>
								Sign up
							</Link>
						</p>
					</Box>
					<Box className={styles.Box3}>
						<p className="text-sm mb-4">Get the app</p>
						<Box className="w-10/12 flex justify-around items-center">
							<a
								href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D1F33081F-E5F4-422E-A10D-7A7A7C7B6FFA%26utm_campaign%3DloginPage%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge"
								target="_blank"
							>
								<img src="/image/google-play.png" alt="#" className="w-32" />
							</a>
							<a
								href="ms-windows-store://pdp/?productid=9nblggh5l9xt&referrer=appbadge&source=www.instagram.com&mode=mini&pos=0%2C0%2C1920%2C1020"
								target="_blank"
							>
								<img
									src="/image/microsoft-store.png"
									alt="#"
									className="w-32"
								/>
							</a>
						</Box>
					</Box>
				</Box>
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

export default login;
