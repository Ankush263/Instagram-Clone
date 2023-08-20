import React from 'react';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';
import SettingsIcon from '@/components/icons/SettingsIcon';

function ProfilePage() {
	const styles = {
		page: `flex justify-center items-center`,
		leftBar: `h-screen w-2/12 mr-auto`,
		main: `w-7/12 h-80 pb-5 mb-auto mt-7 border-b-2 border-gray mr-auto flex flex-col`,
		topMain: `h-4/6 w-full flex justify-between items-center`,
		topLeft: `h-full w-3/12 flex justify-center items-center`,
		topRight: `h-full w-8/12 flex flex-col justify-between items-start`,
		bottomMain: `h-2/6 w-full flex justify-start items-center`,
		midBox: `w-full h-10 flex justify-start items-center`,
		btn: `bg-grayshBlack active:bg-gray w-[100px] h-8 rounded-lg text-sm font-semibold mr-3`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className={styles.main}>
				<Box className={styles.topMain}>
					<Box className={styles.topLeft}>
						<Box className="border-2 w-[150px] h-[150px] rounded-full"></Box>
					</Box>
					<Box className={styles.topRight}>
						<Box className="w-10/12 h-12 flex justify-start items-center">
							<p className="text-xl mr-5">an.kush3193</p>
							<button className={styles.btn}>Edit profile</button>
							<button className={styles.btn}>View Archive</button>
							<Box className="ml-10">
								<SettingsIcon />
							</Box>
						</Box>
						<Box className={styles.midBox}>
							<Box className="flex justify-center items-center">
								<p className="font-semibold">29</p>
								<p className="ml-1 text-sm">posts</p>
							</Box>
							<Box className="flex ml-12 justify-center items-center">
								<p className="font-semibold">112</p>
								<p className="ml-1 text-sm">followers</p>
							</Box>
							<Box className="flex ml-12 justify-center items-center">
								<p className="font-semibold">53</p>
								<p className="ml-1 text-sm">followings</p>
							</Box>
						</Box>
						<Box className="w-full mb-auto">
							<p className="font-semibold text-sm">Ankush Banik</p>
							<Box className="flex flex-col text-sm">
								<p>Hii I'm Ankush Banik.</p>
								<p>I'm a Full-Stack developer</p>
								<p>Also specialize at Web3.0</p>
							</Box>
						</Box>
					</Box>
				</Box>
				<Box className={styles.bottomMain}>
					<Box className="w-20 h-20 rounded-full border-2 ml-7"></Box>
					<Box className="w-20 h-20 rounded-full border-2 ml-7"></Box>
					<Box className="w-20 h-20 rounded-full border-2 ml-7"></Box>
				</Box>
			</Box>
		</Box>
	);
}

export default ProfilePage;
