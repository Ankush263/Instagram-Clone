import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getAllUsers, getMe } from '@/api';
import { fetchToken } from '../token';
import Link from 'next/link';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function RightSideComponent() {
	const [users, setUsers] = useState([]);
	const [profile, setProfile] = useState<any>({});

	const fetch = async () => {
		try {
			const token = fetchToken();
			const res = await getAllUsers(token);
			const self = await getMe(token);
			const me = self.data.data.data;
			setProfile(me);
			const otherUsers = res.data.data.data.filter(
				(data: any) => data._id !== me._id
			);
			setUsers(otherUsers);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	const styles = {
		component: `w-full h-full flex flex-col`,
		bar: `w-9/12 ml-7 mt-12 flex flex-col`,
		subBar: `w-full h-20 flex`,
		leftSubBar: `w-8/12 flex justify-start items-center`,
		rightSubBar: `w-4/12 flex justify-center items-center `,
		profilePlace: `w-[75px] h-[75px] rounded-full`,
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
						<Box className={styles.profilePlace}>
							{profile?.avater ? (
								<img
									src={profile?.avater}
									className="w-full h-full rounded-full"
								/>
							) : (
								<AccountCircleIcon className="w-full h-full" />
							)}
						</Box>
						<Box className="flex flex-col ml-3">
							<p className="font-semibold text-sm">{profile?.username}</p>
							<p className="text-sm text-darkGray">{profile?.fullname}</p>
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
					{users.map((user: any) => {
						return (
							<Box className={styles.rightUnBar}>
								<Box className="h-full flex justify-center items-center">
									<Link
										href={{
											pathname: `/main/ProfilePage`,
											query: { id: user._id },
										}}
									>
										<Box className="w-10 h-10 rounded-full">
											{user?.avater ? (
												<img
													src={user?.avater}
													className="w-full h-full rounded-full"
												/>
											) : (
												<AccountCircleIcon className="w-full h-full" />
											)}
										</Box>
									</Link>
									<Box className="h-full flex flex-col ml-3 justify-center">
										<p className="text-xs font-bold">{user?.fullname}</p>
										<p className="text-xs text-darkGray">{user?.username}</p>
									</Box>
								</Box>
								<p className={styles.blueTxt}>Follow</p>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}

export default RightSideComponent;
