import { Box } from '@mui/material';
import React from 'react';
import Story from '@/components/Stories/Story';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import RightSideComponent from '@/components/SideComponents/RightSideComponent';

function HomePage() {
	const styles = {
		page: `flex justify-center items-center`,
		leftBar: `h-screen w-2/12`,
		main: `h-screen w-6/12 flex flex-col justify-start items-center`,
		rightBar: `h-screen w-4/12`,
		navBar: `w-10/12 h-[95px] ml-auto mt-10`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className={styles.main}>
				<Box className={styles.navBar}>
					<Story />
				</Box>
			</Box>
			<Box className={styles.rightBar}>
				<RightSideComponent />
			</Box>
		</Box>
	);
}

export default HomePage;
