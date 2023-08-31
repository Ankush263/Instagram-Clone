import { Box } from '@mui/material';
import React from 'react';
import { time } from '@/api/calcTime';
import { GetStaticProps } from 'next';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			createdAt: '',
			content: '',
		},
	};
};

function Comment(props: any) {
	const styles = {
		component: `w-full flex items-center`,
	};
	return (
		<Box className={styles.component}>
			<Box className="flex justify-center items-center">
				<Box className="w-8 h-8 rounded-full">
					{props.avater ? (
						<img src={props.avater} className="w-full h-full rounded-full" />
					) : (
						<AccountCircleIcon className="w-full h-full" />
					)}
				</Box>
				<Box className="flex flex-col ml-4">
					<Box>
						<span className="text-sm font-semibold">{props.name}</span>
						<span className="text-xs font-semibold ml-3 text-darkGray">
							{time(props.createdAt)}
						</span>
					</Box>
					<span className="text-xs">{props.content}</span>
				</Box>
			</Box>
		</Box>
	);
}

export default Comment;
