import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';
import React from 'react';

function ExplorePage() {
	const styles = {
		page: `flex justify-center items-center`,
		leftBar: `h-screen w-2/12 mr-auto`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
		</Box>
	);
}

export default ExplorePage;
