import React, { useState, useEffect } from 'react';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';
import SettingsIcon from '@/components/icons/SettingsIcon';
import {
	getMe,
	getSingleUser,
	getMyStory,
	getStoriesByUser,
	updateBio,
} from '@/api';
import { fetchToken } from '@/components/token';
import Backdrop from '@mui/material/Backdrop';
import PostComponent from '@/components/post/PostComponent';
import CloseIcon from '@mui/icons-material/Close';
import { useRouter } from 'next/router';
import { AxiosResponse } from 'axios';
import Add from '@/components/icons/Add';
import StoryBox from '@/components/Stories/StoryBox';
import StatusComponent from '@/components/status/StatusComponent';
import CircularProgress from '@mui/material/CircularProgress';

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
	const [openEditProfile, setOpeEditProfile] = useState(false);
	const [openLoad, setOpenLoad] = useState(false);
	const [bio, setBio] = useState('');

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

	const handleEdit = async () => {
		setOpeEditProfile(true);
	};

	const handleCloseEditBio = () => {
		setOpeEditProfile(false);
		setOpenLoad(false);
	};

	const fetch = async () => {
		try {
			const token = fetchToken();
			let res: AxiosResponse;
			if (Object.keys(data).length === 0) {
				res = await getMe(token);
			} else {
				res = await getSingleUser(token, data.id as string);
			}
			if (res.data) {
				setSelf(res?.data.data.data);
			}
			let story;
			if (Object.keys(data).length === 0) {
				story = await getMyStory(token);
			} else {
				story = await getStoriesByUser(token, data.id as string);
			}
			// console.log(story.data.data.data);
			setStories(story.data.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleUpdateBio = async () => {
		setOpenLoad(true);
		try {
			const token = fetchToken();
			console.log(bio);
			await updateBio(token, { bio });
			setOpeEditProfile(false);
			setBio('');
			fetch();
			setOpenLoad(false);
		} catch (error) {
			console.log(error);
			setOpenLoad(false);
		}
	};

	const handleOpenStory = async () => {
		try {
			setOpenStory(true);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	const styles = {
		page: `flex justify-center items-center`,
		leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
		main: `w-9/12 pb-5 mb-auto mt-7 border-gray flex flex-col ml-20 `,
		topMain: `h-4/6 w-full flex justify-between items-center`,
		topLeft: `h-full w-3/12 flex justify-center items-center`,
		topRight: `h-full w-8/12 flex flex-col justify-between items-start`,
		bottomMain: `h-2/6 w-full flex justify-start items-center mt-7`,
		midBox: `w-full h-10 flex justify-start items-center`,
		btn: `bg-grayshBlack active:bg-gray w-[100px] h-8 rounded-lg text-sm font-semibold mr-3`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={openStory}
			>
				<StoryBox handleClose={handleClose} />
			</Backdrop>
			<Box className="w-10/12 flex justify-center items-center ml-auto">
				<Box className={styles.main}>
					<Box className={styles.topMain}>
						<Box className={styles.topLeft}>
							<Box className="border-2 w-[150px] h-[150px] rounded-full"></Box>
						</Box>
						<Box className={styles.topRight}>
							<Box className="w-10/12 h-12 flex justify-start items-center">
								<p className="text-xl mr-5">{self?.username}</p>
								<button className={styles.btn} onClick={handleEdit}>
									Edit bio
								</button>

								{/* Edit Bio backdrop */}

								<Backdrop
									sx={{
										color: '#fff',
										zIndex: (theme) => theme.zIndex.drawer + 1,
									}}
									open={openEditProfile}
								>
									<Box className="w-[230px] h-[250px] bg-gray rounded-md flex flex-col justify-center items-center">
										<span className="mr-auto ml-7 mb-5">Bio:</span>
										<Box
											className="absolute top-4 right-4 cursor-pointer"
											onClick={handleCloseEditBio}
										>
											<CloseIcon fontSize="large" />
										</Box>
										<textarea
											className="mb-4 font-xs text-black"
											value={bio}
											onChange={(e) => setBio(e.target.value)}
										/>
										<button
											className="w-20 h-8 rounded-md bg-skyBlue"
											// onClick={() => setOpeEditProfile(false)}
											onClick={handleUpdateBio}
										>
											update
										</button>
									</Box>
								</Backdrop>

								{/* ------------------- */}

								{/* Loading backdrop */}

								<Backdrop
									sx={{
										color: '#fff',
										zIndex: (theme) => theme.zIndex.drawer + 1,
									}}
									open={openLoad}
									onClick={() => setOpenLoad(false)}
								>
									<CircularProgress color="inherit" />
								</Backdrop>

								{/* ------------------- */}

								<button className={styles.btn}>Upload photo</button>
								<Box className="ml-10">
									<SettingsIcon />
								</Box>
							</Box>
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
							<Box className="w-full mb-auto">
								<p className="font-semibold text-sm">{self?.fullname}</p>
								<Box className="flex flex-col text-sm">
									<span>{self?.bio}</span>
								</Box>
							</Box>
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
					<Box className="w-full mt-10 grid grid-cols-3 gap-1">
						{self?.posts?.map((post: any) => {
							return (
								<Box
									className="cursor-pointer"
									key={post._id}
									onClick={() => handleClick(post.url, post._id)}
								>
									<img src={post.url} className="w-full h-full" alt="#" />
								</Box>
							);
						})}
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
				</Box>
			</Box>
		</Box>
	);
}

export default ProfilePage;
