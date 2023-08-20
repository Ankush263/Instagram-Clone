import React from 'react';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';

function ReelsPage() {
	const styles = {
		page: `flex justify-center items-center h-screen`,
		leftBar: `h-screen w-2/12 mr-auto`,
		reelsRollSpace: `mr-auto w-[450px] h-screen flex justify-center items-center`,
		reelSpace: `mr-auto w-[400px] h-5/6 flex`,
		reelBox: `h-full w-10/12 border-2 rounded-lg`,
		sideBox: `h-full w-2/12 rounded-lg flex flex-col justify-center items-end`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className={styles.reelsRollSpace}>
				<Box className={styles.reelSpace}>
					<Box className={styles.reelBox}></Box>
					<Box className={styles.sideBox}>
						<Box className="w-full h-3/6 flex mt-40 flex-col justify-center items-center">
							<p>x</p>
							<p>x</p>
						</Box>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default ReelsPage;
