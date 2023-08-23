import { Box, SelectChangeEvent } from '@mui/material';
import React, { useState } from 'react';
import { signupForm } from '@/Interface';
import { signup } from '@/api';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function SignupComponent() {
	const [open, setOpen] = useState(false);
	const [signupDetails, setSignupDetails] = useState<signupForm>({
		phone: '',
		email: '',
		fullname: '',
		username: '',
		password: '',
	});
	const expireTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME || 0;

	const handleClick = async () => {
		setOpen(true);
		try {
			const res = await signup(signupDetails);
			const token = res.data.token;
			const expire = new Date().getTime() + Number(expireTime);
			localStorage.setItem(
				'Token',
				JSON.stringify({ value: `${token}`, expires: expire })
			);
			window.location.replace('/');
		} catch (error) {
			setOpen(false);
			console.log(error);
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const styles = {
		main: `w-full h-full flex flex-col justify-center items-center`,
		input: `w-full h-8 text-sm border-2 text-black border-lightGray placeholder:text-xs p-1 mb-3`,
		inputContainer: `w-9/12 flex flex-col justify-center items-center`,
		termsTxt: `text-xs text-center text-darkGray`,
		termTxtBox: `w-9/12 flex flex-col justify-center items-center mt-2`,
		link: `text-sm text-lightBlack`,
		lightBlueBtnBox: `mt-3 w-9/12 bg-lightBlue rounded-lg flex justify-center p-1 items-center cursor-pointer mb-10`,
	};

	return (
		<Box className={styles.main}>
			<Box className={styles.inputContainer}>
				<input
					type="tel"
					className={styles.input}
					placeholder="Mobile Number"
					value={signupDetails.phone}
					onChange={(e) =>
						setSignupDetails({ ...signupDetails, phone: e.target.value })
					}
				/>
				<input
					type="email"
					className={styles.input}
					placeholder="Email"
					value={signupDetails.email}
					onChange={(e) =>
						setSignupDetails({ ...signupDetails, email: e.target.value })
					}
				/>
				<input
					type="text"
					className={styles.input}
					placeholder="Full Name"
					value={signupDetails.fullname}
					onChange={(e) =>
						setSignupDetails({ ...signupDetails, fullname: e.target.value })
					}
				/>
				<input
					type="text"
					className={styles.input}
					placeholder="Username"
					value={signupDetails.username}
					onChange={(e) =>
						setSignupDetails({ ...signupDetails, username: e.target.value })
					}
				/>
				<input
					type="password"
					className={styles.input}
					placeholder="Password"
					value={signupDetails.password}
					onChange={(e) =>
						setSignupDetails({ ...signupDetails, password: e.target.value })
					}
				/>
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
					onClick={handleClose}
				>
					<CircularProgress color="inherit" />
				</Backdrop>
			</Box>
			<Box className={styles.termTxtBox}>
				<p className={styles.termsTxt}>
					People who use our service may have uploaded your contact information
					to Instagram.
					<a
						href="https://www.facebook.com/help/instagram/261704639352628"
						target="_blank"
						className={styles.link}
					>
						{` Learn More`}
					</a>
				</p>
			</Box>
			<Box className={styles.termTxtBox}>
				<p className={styles.termsTxt}>
					By signing up, you agree to our{' '}
					<a
						href="https://help.instagram.com/581066165581870/?locale=en_US"
						target="_blank"
						className={styles.link}
					>
						Terms
					</a>
					,{' '}
					<a
						href="https://www.facebook.com/privacy/policy"
						target="_blank"
						className={styles.link}
					>
						Privacy Policy
					</a>{' '}
					and{' '}
					<a
						href="https://help.instagram.com/1896641480634370/"
						target="_blank"
						className={styles.link}
					>
						Cookies Policy
					</a>
					.
				</p>
			</Box>
			<Box className={styles.lightBlueBtnBox} onClick={handleClick}>
				<p className="text-white font-semibold">Sign up</p>
			</Box>
		</Box>
	);
}

export default SignupComponent;
