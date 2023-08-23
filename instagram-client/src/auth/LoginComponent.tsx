import { Box } from '@mui/material';
import React, { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { login } from '@/api';

function LoginComponent() {
	const [open, setOpen] = useState(false);
	const [loginForm, setLoginForm] = useState<any>({
		email: '',
		password: '',
	});
	const expireTime = process.env.NEXT_PUBLIC_TOKEN_EXPIRE_TIME || 0;

	const handleClick = async () => {
		setOpen(true);
		try {
			const res = await login(loginForm);
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
		inputContainer: `w-9/12 flex flex-col justify-center items-center`,
		input: `w-full h-8 text-sm border-2 border-lightGray placeholder:text-xs p-1 mb-3 text-black`,
		darkBlueBtnBox: `mt-3 w-9/12 bg-deepBlue rounded-lg flex justify-center p-0.5 items-center cursor-pointer`,
	};
	return (
		<Box className="w-full h-full flex flex-col justify-center items-center">
			<Box className={styles.inputContainer}>
				<input
					type="email"
					className={styles.input}
					placeholder="Email"
					value={loginForm.email}
					onChange={(e) =>
						setLoginForm({ ...loginForm, email: e.target.value })
					}
				/>
				<input
					type="password"
					className={styles.input}
					placeholder="Password"
					value={loginForm.password}
					onChange={(e) =>
						setLoginForm({ ...loginForm, password: e.target.value })
					}
				/>
			</Box>

			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={open}
				onClick={handleClose}
			>
				<CircularProgress color="inherit" />
			</Backdrop>

			<Box className={styles.darkBlueBtnBox}>
				<p className="text-white font-semibold" onClick={handleClick}>
					Log in
				</p>
			</Box>
		</Box>
	);
}

export default LoginComponent;
