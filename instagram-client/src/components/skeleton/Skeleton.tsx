import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

export const PostSkeleton = () => {
	return (
		<Box>
			<Box className="flex justify-between items-center mb-4">
				<Skeleton
					variant="circular"
					width={60}
					height={60}
					sx={{ bgcolor: 'grey.900' }}
				/>
				<Skeleton
					variant="text"
					width={320}
					sx={{ fontSize: '1.5rem', bgcolor: 'grey.900' }}
				/>
			</Box>
			<Skeleton
				sx={{ bgcolor: 'grey.900', borderRadius: '10px', marginBottom: '90px' }}
				variant="rectangular"
				width={410}
				height={418}
			/>
			<Box className="flex justify-between items-center mb-4">
				<Skeleton
					variant="circular"
					width={60}
					height={60}
					sx={{ bgcolor: 'grey.900' }}
				/>
				<Skeleton
					variant="text"
					width={320}
					sx={{ fontSize: '1.5rem', bgcolor: 'grey.900' }}
				/>
			</Box>
			<Skeleton
				sx={{ bgcolor: 'grey.900', borderRadius: '10px', marginBottom: '90px' }}
				variant="rectangular"
				width={410}
				height={418}
			/>
		</Box>
	);
};

export const MediumAvater = () => {
	return (
		<Box className="flex justify-center items-center">
			<Skeleton
				variant="circular"
				width={80}
				height={80}
				sx={{ bgcolor: 'grey.900' }}
			/>
			<Box className="flex flex-col justify-center items-start ml-3">
				<Skeleton
					variant="text"
					sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '100px' }}
				/>
				<Skeleton
					variant="text"
					sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '150px' }}
				/>
			</Box>
		</Box>
	);
};

export const SmallAvater = () => {
	return (
		<Box className="flex flex-col justify-center items-center">
			<Box className="flex justify-center items-center mb-5">
				<Skeleton
					variant="circular"
					width={40}
					height={40}
					sx={{ bgcolor: 'grey.900' }}
				/>
				<Box className="flex flex-col justify-center items-start ml-5">
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '100px' }}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '150px' }}
					/>
				</Box>
			</Box>

			<Box className="flex justify-center items-center">
				<Skeleton
					variant="circular"
					width={40}
					height={40}
					sx={{ bgcolor: 'grey.900' }}
				/>
				<Box className="flex flex-col justify-center items-start ml-5">
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '100px' }}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '150px' }}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export const MyAllPosts = () => {
	return (
		<Box className="w-full mt-10 grid grid-cols-3 gap-1">
			<Box>
				<Skeleton
					sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
					variant="rectangular"
					width={310}
					height={310}
				/>
			</Box>
			<Box>
				<Skeleton
					sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
					variant="rectangular"
					width={310}
					height={310}
				/>
			</Box>
			<Box>
				<Skeleton
					sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
					variant="rectangular"
					width={310}
					height={310}
				/>
			</Box>
			<Box>
				<Skeleton
					sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
					variant="rectangular"
					width={310}
					height={310}
				/>
			</Box>
			<Box>
				<Skeleton
					sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
					variant="rectangular"
					width={310}
					height={310}
				/>
			</Box>
			<Box>
				<Skeleton
					sx={{ bgcolor: 'grey.900', marginLeft: '10px' }}
					variant="rectangular"
					width={310}
					height={310}
				/>
			</Box>
		</Box>
	);
};

export const Details = () => {
	return (
		<Box className="flex flex-col">
			<Skeleton
				variant="text"
				sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '270px' }}
			/>
			<Skeleton
				variant="text"
				sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '270px' }}
			/>
		</Box>
	);
};

export const CommentSkeleton = () => {
	return (
		<Box className="flex flex-col">
			<Box className="flex mb-4">
				<Skeleton
					variant="circular"
					width={50}
					height={50}
					sx={{ bgcolor: 'grey.900' }}
				/>
				<Box className="flex flex-col justify-center items-start ml-3">
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '50px' }}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '100px' }}
					/>
				</Box>
			</Box>
			<Box className="flex">
				<Skeleton
					variant="circular"
					width={50}
					height={50}
					sx={{ bgcolor: 'grey.900' }}
				/>
				<Box className="flex flex-col justify-center items-start ml-3">
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '50px' }}
					/>
					<Skeleton
						variant="text"
						sx={{ fontSize: '1rem', bgcolor: 'grey.900', width: '100px' }}
					/>
				</Box>
			</Box>
		</Box>
	);
};
