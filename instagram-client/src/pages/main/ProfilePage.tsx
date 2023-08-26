import React, { useState, useEffect } from 'react';
import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';
import SettingsIcon from '@/components/icons/SettingsIcon';
import { getMe } from '@/api';
import { fetchToken } from '@/components/token';

function ProfilePage() {
	const [self, setSelf] = useState<any>({});

	const fetch = async () => {
		try {
			const token = fetchToken();
			const res = await getMe(token);
			console.log(res.data.data.data);
			setSelf(res.data.data.data);
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
			<Box className="w-10/12 flex justify-center items-center ml-auto">
				<Box className={styles.main}>
					<Box className={styles.topMain}>
						<Box className={styles.topLeft}>
							<Box className="border-2 w-[150px] h-[150px] rounded-full"></Box>
						</Box>
						<Box className={styles.topRight}>
							<Box className="w-10/12 h-12 flex justify-start items-center">
								<p className="text-xl mr-5">{self.username}</p>
								<button className={styles.btn}>Edit profile</button>
								<button className={styles.btn}>View Archive</button>
								<Box className="ml-10">
									<SettingsIcon />
								</Box>
							</Box>
							<Box className={styles.midBox}>
								<Box className="flex justify-center items-center">
									<p className="font-semibold">{self.postNum}</p>
									<p className="ml-1 text-sm">posts</p>
								</Box>
								<Box className="flex ml-12 justify-center items-center">
									<p className="font-semibold">{self.followersNum}</p>
									<p className="ml-1 text-sm">followers</p>
								</Box>
								<Box className="flex ml-12 justify-center items-center">
									<p className="font-semibold">{self.followingNum}</p>
									<p className="ml-1 text-sm">followings</p>
								</Box>
							</Box>
							<Box className="w-full mb-auto">
								<p className="font-semibold text-sm">{self.fullname}</p>
								<Box className="flex flex-col text-sm">
									<span>{self.bio}</span>
								</Box>
							</Box>
						</Box>
					</Box>
					<Box className={styles.bottomMain}>
						<Box className="w-20 h-20 rounded-full border-2 ml-7"></Box>
						<Box className="w-20 h-20 rounded-full border-2 ml-7"></Box>
						<Box className="w-20 h-20 rounded-full border-2 ml-7"></Box>
					</Box>
					<Box className="border-b-2 w-full mt-10 border-gray"></Box>
					<Box className="w-full mt-10 grid grid-cols-3 gap-1">
						{self?.posts?.map((post: any) => {
							return (
								<Box>
									<img src={post.url} className="w-full h-full" alt="#" />
								</Box>
							);
						})}
					</Box>
				</Box>
			</Box>
		</Box>
	);
}

export default ProfilePage;
