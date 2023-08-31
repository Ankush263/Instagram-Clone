import { Box } from '@mui/material';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { AiFillRightCircle } from 'react-icons/ai';
import { BiSolidChevronLeftCircle } from 'react-icons/bi';
import { fetchToken } from '../token';
import { getAllStories } from '@/api';
import Backdrop from '@mui/material/Backdrop';
import StatusComponent from '../status/StatusComponent';
import Skeleton from '@mui/material/Skeleton';

function Story() {
	const [allStories, setAllStories] = useState([]);
	const [statusOpen, setStatusOpen] = useState(false);
	const [statusUrl, setStatusUrl] = useState('');
	const [progress, setProgress] = useState(0);

	const handleStatusClose = () => {
		setStatusOpen(false);
		setStatusUrl('');
		setProgress(0);
	};

	const handleStatusOpen = (url: string) => {
		setStatusOpen(true);
		setStatusUrl(url);
		setTimeout(() => {
			handleStatusClose();
		}, 5000);
	};

	const fetch = useCallback(async () => {
		try {
			console.log('story is loading...');
			const token = fetchToken();
			const story = await getAllStories(token);
			setAllStories(story.data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

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

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetch();
		}
		return () => {
			isMounted = false;
		};
	}, [fetch]);

	const styles = useMemo(() => {
		return {
			bar: `w-full h-full flex justify-center items-center`,
			component: `w-full h-full flex justify-start items-start space-x-6 overflow-x-scroll scroll whitespace-nowrap scroll-smooth no-scrollbar`,
			storyBox: `flex flex-col justify-center items-center cursor-pointer`,
			round: `rounded-full w-16 h-16 bg-white`,
			smallTxt: `text-xs`,
			ring: `flex justify-center items-center bg-gradient-to-tr from-yellow to-fuchsia-600 rounded-full`,
		};
	}, []);

	return (
		<Box className={styles.bar}>
			<BiSolidChevronLeftCircle
				size={30}
				onClick={slideLeft}
				className="cursor-pointer"
			/>
			<Box className={styles.component} id="slider">
				{allStories.length > 0 ? (
					allStories.map((story: any) => {
						return (
							<Box className={styles.storyBox}>
								<Box
									className={styles.ring}
									sx={{ width: '73px', height: '73px' }}
								>
									<Box className={styles.round}>
										<img
											src={story.url}
											className="w-full h-full rounded-full"
											onClick={() => handleStatusOpen(story?.url)}
											loading="lazy"
										/>
									</Box>
								</Box>
								<p className={styles.smallTxt}>{story.user.username}</p>
							</Box>
						);
					})
				) : (
					<Box className="w-full flex">
						<Skeleton
							variant="circular"
							width={80}
							height={80}
							sx={{ bgcolor: 'grey.900' }}
						/>
						<Skeleton
							variant="circular"
							width={80}
							height={80}
							sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
						/>
					</Box>
				)}
			</Box>
			<Backdrop
				sx={{
					color: '#fff',
					zIndex: (theme) => theme.zIndex.drawer + 1,
				}}
				open={statusOpen}
				onClick={handleStatusClose}
			>
				<StatusComponent
					url={statusUrl}
					progress={progress}
					setProgress={setProgress}
				/>
			</Backdrop>
			<AiFillRightCircle
				size={30}
				onClick={sliderRight}
				className="cursor-pointer"
			/>
		</Box>
	);
}

export default Story;
