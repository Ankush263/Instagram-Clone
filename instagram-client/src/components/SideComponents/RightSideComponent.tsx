import { Box } from '@mui/material';
import React from 'react';

function RightSideComponent() {
	const styles = {
		component: `w-full h-full flex flex-col`,
		bar: `w-9/12 ml-7 mt-12 flex flex-col`,
		subBar: `w-full h-20 flex`,
		leftSubBar: `w-8/12 flex justify-start items-center`,
		rightSubBar: `w-4/12 flex justify-center items-center `,
		profilePlace: `border-2 w-[75px] h-[75px] rounded-full`,
		blueTxt: `text-xs text-skyBlue cursor-pointer`,
		smallBox: `w-full h-6 flex justify-between items-center mt-3`,
		rightBar: `w-11/12 h-80 flex flex-col justify-start items-center mt-3`,
		rightUnBar: `w-11/12 h-12 flex justify-between items-center`,
	};
	return (
		<Box className={styles.component}>
			<Box className={styles.bar}>
				<Box className={styles.subBar}>
					<Box className={styles.leftSubBar}>
						<Box className={styles.profilePlace}></Box>
						<Box className="flex flex-col ml-3">
							<p className="font-semibold text-sm">an.kush263</p>
							<p className="text-sm text-darkGray">Ankush Banik</p>
						</Box>
					</Box>
					<Box className={styles.rightSubBar}>
						<p className={styles.blueTxt}>Switch</p>
					</Box>
				</Box>
				<Box className={styles.smallBox}>
					<p className="text-sm text-darkGray font-bold">Suggested for you</p>
					<p className="text-sm font-bold mr-10">See All</p>
				</Box>
				<Box className={styles.rightBar}>
					<Box className={styles.rightUnBar}>
						<Box className="h-full flex justify-center items-center">
							<Box className="border-2 w-10 h-10 rounded-full"></Box>
							<Box className="h-full flex flex-col ml-3 justify-center">
								<p className="text-xs font-bold">Ankush Banik</p>
								<p className="text-xs text-darkGray">an.kush1234</p>
							</Box>
						</Box>
						<p className={styles.blueTxt}>Follow</p>
					</Box>

					<Box className={styles.rightUnBar}>
						<Box className="h-full flex justify-center items-center">
							<Box className="border-2 w-10 h-10 rounded-full"></Box>
							<Box className="h-full flex flex-col ml-3 justify-center">
								<p className="text-xs font-bold">Ankush Banik</p>
								<p className="text-xs text-darkGray">an.kush1234</p>
							</Box>
						</Box>
						<p className={styles.blueTxt}>Follow</p>
					</Box>

					<Box className={styles.rightUnBar}>
						<Box className="h-full flex justify-center items-center">
							<Box className="border-2 w-10 h-10 rounded-full"></Box>
							<Box className="h-full flex flex-col ml-3 justify-center">
								<p className="text-xs font-bold">Ankush Banik</p>
								<p className="text-xs text-darkGray">an.kush1234</p>
							</Box>
						</Box>
						<p className={styles.blueTxt}>Follow</p>
					</Box>

					<Box className={styles.rightUnBar}>
						<Box className="h-full flex justify-center items-center">
							<Box className="border-2 w-10 h-10 rounded-full"></Box>
							<Box className="h-full flex flex-col ml-3 justify-center">
								<p className="text-xs font-bold">Ankush Banik</p>
								<p className="text-xs text-darkGray">an.kush1234</p>
							</Box>
						</Box>
						<p className={styles.blueTxt}>Follow</p>
					</Box>

					<Box className={styles.rightUnBar}>
						<Box className="h-full flex justify-center items-center">
							<Box className="border-2 w-10 h-10 rounded-full"></Box>
							<Box className="h-full flex flex-col ml-3 justify-center">
								<p className="text-xs font-bold">Ankush Banik</p>
								<p className="text-xs text-darkGray">an.kush1234</p>
							</Box>
						</Box>
						<p className={styles.blueTxt}>Follow</p>
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default RightSideComponent;
