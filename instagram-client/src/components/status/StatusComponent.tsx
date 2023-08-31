import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { deleteStory } from '@/api';
import { fetchToken } from '../token';
import { GetStaticProps } from 'next/types';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			handleStatusClose: function () {},
			setProgress: function () {},
			id: '',
			progress: '',
			url: '',
		},
	};
};

function StatusComponent(props: any) {
	const handleDelete = async (id: string) => {
		const token = fetchToken();
		await deleteStory(token, id);
		props.handleStatusClose();
	};

	useEffect(() => {
		const timer = setInterval(() => {
			props.setProgress((oldProgress: any) => {
				if (oldProgress === 100) {
					return 0;
				}
				const diff = Math.random() * 10;
				return Math.min(oldProgress + diff, 100);
			});
		}, 500);

		return () => {
			clearInterval(timer);
			props.setProgress(0);
		};
	}, []);

	return (
		<Box className="w-[400px] h-[650px] bg-black flex flex-col justify-center items-center">
			<Box className="w-full">
				<LinearProgress
					variant="determinate"
					value={props.progress}
					sx={{ backgroundColor: 'white' }}
				/>
			</Box>
			<img src={props.url} className="max-w-full max-h-full" />
			<Box className="absolute mb-[600px] ml-[300px]">
				<DeleteOutlineOutlinedIcon onClick={() => handleDelete(props.id)} />
			</Box>
		</Box>
	);
}

export default StatusComponent;
