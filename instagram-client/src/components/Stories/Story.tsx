import { Box } from '@mui/material';
import React from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import { BiSolidChevronLeftCircle } from 'react-icons/bi';

function Story() {
	const slideLeft = () => {
		let slider = document.getElementById('slider');
		if (slider) {
			slider.scrollLeft = slider.scrollLeft - 500;
		}
	};

	const sliderRight = () => {
		let slider = document.getElementById('slider');
		if (slider) {
			slider.scrollLeft = slider.scrollLeft + 500;
		}
	};

	const styles = {
		bar: `w-full h-full flex justify-center items-center `,
		component: `w-full h-full flex justify-start items-start space-x-6 overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar`,
		storyBox: `flex flex-col justify-center items-center`,
		round: `rounded-full w-16 h-16 bg-white`,
		smallTxt: `text-xs`,
		ring: `flex justify-center items-center bg-gradient-to-tr from-yellow to-fuchsia-600 rounded-full`,
	};
	return (
		<Box className={styles.bar}>
			<BiSolidChevronLeftCircle
				size={30}
				onClick={slideLeft}
				className="cursor-pointer"
			/>
			<Box className={styles.component} id="slider">
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>

				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>

				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
				<Box className={styles.storyBox}>
					<Box className={styles.ring} sx={{ width: '73px', height: '73px' }}>
						<Box className={styles.round}></Box>
					</Box>
					<p className={styles.smallTxt}>Ankush</p>
				</Box>
			</Box>
			<AiFillRightCircle
				size={30}
				onClick={sliderRight}
				className="cursor-pointer"
			/>
		</Box>
	);
}

export default Story;
