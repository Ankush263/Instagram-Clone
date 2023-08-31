import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';
import React, { useState, useEffect, useCallback, Suspense } from 'react';
import { getIdAndPhotoOfPosts } from '@/api';
import { fetchToken } from '@/components/token';
import PostComponent from '@/components/post/PostComponent';
import Backdrop from '@mui/material/Backdrop';
import CloseIcon from '@mui/icons-material/Close';
import CircularProgress from '@mui/material/CircularProgress';
import ImageGrid from '@/components/main/explorer/ImageGrid';

function ExplorePage() {
	const [images, setImages] = useState<any>([]);
	const [open, setOpen] = useState(false);
	const [details, setDetails] = useState({});
	const [load, setLoad] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const fetchImgs = useCallback(async () => {
		try {
			const token = fetchToken();
			const res = await getIdAndPhotoOfPosts(token);
			const imgs = res.data.data.data;
			setImages(imgs);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleClick = async (url: string, id: string) => {
		try {
			setOpen((prev) => !prev);
			console.log(url);
			console.log(id);
			setDetails({ url, id });
			setLoad((prev) => !prev);
		} catch (error) {
			console.log(error);
		}
	};

	const breakpoints = {
		default: 3,
		1100: 2,
		700: 1,
	};

	useEffect(() => {
		let isMounted = true;
		if (isMounted) {
			fetchImgs();
		}
		return () => {
			isMounted = false;
		};
	}, [fetchImgs]);

	const styles = {
		page: `flex justify-center items-start`,
		leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
		coverBox: `w-8/12 ml-auto mr-40 flex justify-center items-center`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className={styles.coverBox}>
				{images.length > 0 ? (
					<Suspense
						fallback={
							<Box>
								<CircularProgress />
							</Box>
						}
					>
						<ImageGrid
							breakpoints={breakpoints}
							images={images}
							handleClick={handleClick}
						/>
					</Suspense>
				) : (
					<Box className="w-full h-96 flex justify-center items-center">
						<CircularProgress />
					</Box>
				)}
				<Backdrop
					sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
					open={open}
				>
					<Box className="ml-10">
						<PostComponent details={details} load={load} />
					</Box>
					<Box
						className="absolute top-3 right-6 cursor-pointer"
						onClick={handleClose}
					>
						<CloseIcon fontSize="large" />
					</Box>
				</Backdrop>
			</Box>
		</Box>
	);
}

export default ExplorePage;
