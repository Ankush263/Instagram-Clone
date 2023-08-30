import { Box } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

function UsersList(props: any) {
	const styles = {
		rightBar: `w-11/12 h-80 flex flex-col justify-start items-center mt-3`,
		blueTxt: `text-xs text-skyBlue cursor-pointer`,
		rightUnBar: `w-11/12 h-12 flex justify-between items-center`,
	};
	return (
		<Box className="w-full h-full">
			{props?.users.map((user: any) => (
				<Box className={styles.rightUnBar} key={user._id}>
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
			))}
		</Box>
	);
}

export default UsersList;
