import React, {
	useState,
	useEffect,
	useCallback,
	Suspense,
	lazy,
	useMemo,
} from 'react';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box, Skeleton } from '@mui/material';
import { getMe, getSingleUser, getMyStory, getStoriesByUser } from '@/api';
import { fetchToken } from '@/components/token';
import Backdrop from '@mui/material/Backdrop';
import PostComponent from '@/components/post/PostComponent';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import Add from '@/components/icons/Add';
import StoryBox from '@/components/Stories/StoryBox';
import StatusComponent from '@/components/status/StatusComponent';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FollowBtnComponent from '@/components/profile/FollowBtnComponent';
import { MyAllPosts, Details } from '@/components/skeleton/Skeleton';
import SelfDetails from '@/components/profile/SelfDetails';

const MyPosts = lazy(() => import('@/components/profile/MyPosts'));

function ProfilePage() {
	const router = useRouter();
	const data = router.query;
	const [self, setSelf] = useState<any>({});
	const [open, setOpen] = useState(false);
	const [details, setDetails] = useState({});
	const [load, setLoad] = useState(false);
	const [openStory, setOpenStory] = useState(false);
	const [stories, setStories] = useState<any>([]);
	const [statusOpen, setStatusOpen] = useState(false);
	const [statusUrl, setStatusUrl] = useState('');
	const [statusId, setStatusId] = useState('');
	const [progress, setProgress] = useState(0);
	const [myProfile, setMyProfile] = useState(false);
	const [follow, setFollow] = useState(false);
	const [followId, setFollowId] = useState('');

	const handleClose = () => {
		setOpen(false);
		setOpenStory(false);
	};

	const handleStatusClose = () => {
		setStatusOpen(false);
		setStatusUrl('');
		setProgress(0);
	};

	const handleStatusOpen = (url: string, id: string) => {
		setStatusOpen(true);
		setStatusUrl(url);
		setStatusId(id);
		setTimeout(() => {
			handleStatusClose();
		}, 5000);
	};

	const handleClick = (url: string, id: string) => {
		setOpen((prev) => !prev);
		setOpen(true);
		setDetails({ url, id });
		setLoad((prev) => !prev);
	};

	const fetch = useCallback(async () => {
		try {
			const token = fetchToken();
			let res: AxiosResponse;
			let story;
			const me = await getMe(token);

			if (Object.keys(data).length === 0) {
				res = me;
				story = await getMyStory(token);
				setMyProfile(true);
			} else {
				res = await getSingleUser(token, data.id as string);
				story = await getStoriesByUser(token, data.id as string);
				setMyProfile(false);
			}
			if (res.data) {
				setSelf(res?.data.data.data);
			}

			for (let i = 0; i < me.data.data.data.followings.length; i++) {
				if (me.data.data.data.followings[i].to.id === data.id) {
					setFollow(true);
					setFollowId(me.data.data.data.followings[i].id);
					break;
				} else {
					setFollow(false);
				}
			}
			setStories(story.data.data.data);
		} catch (error) {
			console.log(error);
		}
	}, []);

	const handleOpenStory = async () => {
		try {
			setOpenStory(true);
		} catch (error) {
			console.log(error);
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
			page: `flex justify-center items-center`,
			leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
			main: `w-9/12 pb-5 mb-auto mt-7 border-gray flex flex-col ml-20 `,
			topMain: `h-4/6 w-full flex justify-between items-center`,
			topLeft: `h-full w-3/12 flex justify-center items-center`,
			topRight: `h-full w-8/12 flex flex-col justify-between items-start`,
			bottomMain: `h-2/6 w-full flex justify-start items-center mt-7`,
			midBox: `w-full h-10 flex justify-start items-center`,
			btn: `bg-grayshBlack active:bg-gray w-[100px] h-8 rounded-lg flex justify-center items-center text-sm font-semibold mr-3`,
			btn2: `bg-red active:bg-gray w-[100px] h-8 rounded-lg flex justify-center items-center text-sm font-semibold mr-3`,
		};
	}, []);

	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={openStory}
			>
				<StoryBox handleClose={handleClose} fetch={fetch} />
			</Backdrop>
			<Box className="w-10/12 flex justify-center items-center ml-auto">
				<Box className={styles.main}>
					<Box className={styles.topMain}>
						<Box className={styles.topLeft}>
							<Box className="w-[150px] h-[150px] rounded-full">
								{!myProfile ? (
									<Skeleton
										variant="circular"
										width={160}
										height={160}
										sx={{ bgcolor: 'grey.900' }}
									/>
								) : self?.avater ? (
									<img
										src={self?.avater}
										className="w-full h-full rounded-full"
									/>
								) : (
									<AccountCircleIcon className="w-full h-full" />
								)}
							</Box>
						</Box>
						<Box className={styles.topRight}>
							{myProfile ? (
								<Suspense
									fallback={
										<Box>
											<Details />
										</Box>
									}
								>
									<SelfDetails fetch={fetch} self={self} />
								</Suspense>
							) : (
								<Box className="w-6/12 h-12 flex justify-start items-center">
									<Suspense
										fallback={
											<Box>
												<Details />
											</Box>
										}
									>
										<FollowBtnComponent
											name={self?.username}
											fetch={fetch}
											follow={follow}
											id={followId}
											userId={self?.id}
										/>
									</Suspense>
								</Box>
							)}

							{myProfile ? (
								<Box className={styles.midBox}>
									<Box className="flex justify-center items-center">
										<p className="font-semibold">{self?.postNum}</p>
										<p className="ml-1 text-sm">posts</p>
									</Box>
									<Box className="flex ml-12 justify-center items-center">
										<p className="font-semibold">{self?.followersNum}</p>
										<p className="ml-1 text-sm">followers</p>
									</Box>
									<Box className="flex ml-12 justify-center items-center">
										<p className="font-semibold">{self?.followingNum}</p>
										<p className="ml-1 text-sm">followings</p>
									</Box>
								</Box>
							) : (
								<Skeleton
									variant="text"
									sx={{
										fontSize: '1rem',
										bgcolor: 'grey.900',
										width: '350px',
									}}
								/>
							)}

							{myProfile ? (
								<Box className="w-full mb-auto">
									<p className="font-semibold text-sm">{self?.fullname}</p>
									<Box className="flex flex-col text-sm">
										<span>{self?.bio}</span>
									</Box>
								</Box>
							) : (
								<Box className="flex flex-col">
									<Skeleton
										variant="text"
										sx={{
											fontSize: '1rem',
											bgcolor: 'grey.900',
											width: '150px',
										}}
									/>
									<Skeleton
										variant="text"
										sx={{
											fontSize: '1rem',
											bgcolor: 'grey.900',
											width: '150px',
										}}
									/>
								</Box>
							)}
						</Box>
					</Box>
					<Box className={styles.bottomMain}>
						<Box className="w-20 h-20 rounded-full border-2 border-gray ml-7 flex justify-center items-center">
							<Box
								className="w-[70px] h-[70px] rounded-full bg-gray flex justify-center items-center cursor-pointer"
								onClick={handleOpenStory}
							>
								<Add />
							</Box>
						</Box>
						{stories?.map((story: any) => {
							return (
								<Box
									className="w-20 h-20 rounded-full border-2 border-gray ml-7 cursor-pointer"
									key={story?._id}
								>
									<img
										src={story?.url}
										className="w-full h-full rounded-full"
										onClick={() => handleStatusOpen(story?.url, story?._id)}
									/>

									<Backdrop
										sx={{
											color: '#fff',
											zIndex: (theme) => theme.zIndex.drawer + 1,
										}}
										open={statusOpen}
									>
										<StatusComponent
											url={statusUrl}
											id={statusId}
											progress={progress}
											setProgress={setProgress}
											handleStatusClose={handleStatusClose}
										/>
									</Backdrop>
								</Box>
							);
						})}
					</Box>

					<Box className="border-b-2 w-full mt-10 border-gray"></Box>

					<Suspense
						fallback={
							<Box>
								<MyAllPosts />
							</Box>
						}
					>
						<MyPosts self={self} handleClick={handleClick} />
					</Suspense>
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
		</Box>
	);
}

export default ProfilePage;
