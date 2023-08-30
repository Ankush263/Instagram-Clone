import { Box, Skeleton } from '@mui/material';
import React, {
	useState,
	useEffect,
	lazy,
	Suspense,
	useCallback,
	useMemo,
} from 'react';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import RightSideComponent from '@/components/SideComponents/RightSideComponent';
import { getAllPosts } from '@/api';
import { fetchToken } from '../token';
import PostComponent from '../post/PostComponent';
import CloseIcon from '@mui/icons-material/Close';
import Backdrop from '@mui/material/Backdrop';
import { PostSkeleton } from '../skeleton/Skeleton';

const Story = lazy(() => import('@/components/Stories/Story'));

const AllPostRender = lazy(() => import('./posts/AllPostRender'));

function HomePage() {
	const [posts, setPosts] = useState([]);
	const [reloadComponent, setReloadComponent] = useState(false);
	const [details, setDetails] = useState({});
	const [load, setLoad] = useState(false);
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};

	const fetch = useCallback(async () => {
		try {
			const token = fetchToken();
			const post = await getAllPosts(token);
			setPosts(post.data.data.data);
			console.log('fetch the home page....');
		} catch (error) {
			console.log(error);
		}
	}, []);

	useEffect(() => {
		let isMounted = true;

		setTimeout(() => {
			if (isMounted) {
				fetch();
			}
		}, 1000);

		return () => {
			isMounted = false;
		};
	}, [reloadComponent]);

	const styles = useMemo(() => {
		return {
			page: `flex justify-center items-center`,
			leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
			main: `w-6/12 flex flex-col justify-start items-center mb-auto ml-[300px]`,
			rightBar: `h-screen w-4/12 mb-auto`,
			navBar: `w-10/12 h-[95px] ml-auto mt-10 flex justify-between items-center`,
			scrollBox: `w-full mt-10 flex flex-col justify-center items-center`,
		};
	}, []);

	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className={styles.main}>
				<Box className={styles.navBar}>
					<Suspense
						fallback={
							<Box>
								<Skeleton
									variant="circular"
									width={40}
									height={40}
									sx={{ bgcolor: 'grey.900' }}
								/>
							</Box>
						}
					>
						<Story />
					</Suspense>
				</Box>

				<Box className={styles.scrollBox}>
					{posts.length > 0 ? (
						<Suspense
							fallback={
								<Box>
									<PostSkeleton />
								</Box>
							}
						>
							<AllPostRender
								posts={posts}
								setOpen={setOpen}
								setLoad={setLoad}
								setDetails={setDetails}
								setReloadComponent={setReloadComponent}
							/>
						</Suspense>
					) : (
						<PostSkeleton />
					)}
				</Box>
			</Box>
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
			<Box className={styles.rightBar}>
				{/* 1220 */}
				<RightSideComponent />
			</Box>
		</Box>
	);
}

export default HomePage;
