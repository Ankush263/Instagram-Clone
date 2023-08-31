import { Box } from '@mui/material';
import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	lazy,
	Suspense,
} from 'react';
import { getAllUsers, getMe } from '@/api';
import { fetchToken } from '../token';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { MediumAvater, SmallAvater } from '../skeleton/Skeleton';

const UsersList = lazy(() => import('./userList/UsersList'));

function RightSideComponent() {
	const [users, setUsers] = useState([]);
	const [profile, setProfile] = useState<any>({});

	const fetch = useCallback(async () => {
		try {
			console.log('right side component...', Object.keys(profile).length);
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
	}, []);

	const handleLogout = () => {
		localStorage.setItem('Token', '');
		window.location.replace(`/auth/login`);
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
			smallGrayTxt: `text-sm text-darkGray font-bold`,
		};
	}, []);

	return (
		<Box className={styles.component}>
			<Box className={styles.bar}>
				<Box className={styles.subBar}>
					{Object.keys(profile).length > 0 ? (
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
					) : (
						<MediumAvater />
					)}
					<Box className={styles.rightSubBar}>
						<p className={styles.blueTxt} onClick={handleLogout}>
							Logout
						</p>
					</Box>
				</Box>
				<Box className={styles.smallBox}>
					<p className={styles.smallGrayTxt}>Suggested for you</p>
					<p className="text-sm font-bold mr-10">See All</p>
				</Box>
				<Box className={styles.rightBar}>
					{Object.keys(profile).length > 0 ? (
						<Suspense
							fallback={
								<Box>
									<SmallAvater />
								</Box>
							}
						>
							<UsersList users={users} />
						</Suspense>
					) : (
						<SmallAvater />
					)}
				</Box>
			</Box>
		</Box>
	);
}

export default RightSideComponent;
