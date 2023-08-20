import React, { useState } from 'react';
import { Box } from '@mui/material';
import NotificationOutline from '../icons/NotificationOutline';
import NotificationFilled from '../icons/NotificationFilled';

function NotificationBar() {
	const [trigger, setTrigger] = useState(false);

	const handleClick = () => {
		setTrigger((prev) => !prev);
		openSideBar();
	};

	const styles = {
		container: `w-full h-full flex justify-center items-center`,
		iconBox: `w-full h-full flex justify-start items-center`,
		searchBarBox: `w-96 h-screen flex flex-col justify-start items-start absolute top-0 left-[60px] bg-black animate__animated animate__slideInLeft border-r-2 border-gray`,
		searchBar: `w-11/12 h-9 pl-3.5 rounded-lg placeholder:text-darkGray bg-gray mt-10 ml-auto mr-auto focus:outline-0`,
	};

	const openSideBar = () => {
		if (trigger) {
			return (
				<Box className={styles.searchBarBox}>
					<p className="text-2xl font-bold mt-6 ml-8">Notifications</p>
					<span className="text-2sm font-bold mt-5 ml-8">Earlier</span>
				</Box>
			);
		}
	};
	return (
		<Box className={styles.container}>
			<Box className={styles.iconBox}>
				{trigger ? (
					<Box className="border-2 rounded-lg p-1" onClick={handleClick}>
						<NotificationFilled />
					</Box>
				) : (
					<Box onClick={handleClick}>
						<NotificationOutline />
					</Box>
				)}
				<p className="ml-3" onClick={handleClick}>
					Notifications
				</p>
				{openSideBar()}
			</Box>
		</Box>
	);
}

export default NotificationBar;
