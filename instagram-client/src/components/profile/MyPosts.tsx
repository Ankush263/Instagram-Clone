import { Box } from '@mui/material';
import React from 'react';
import { MyAllPosts } from '../skeleton/Skeleton';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			handleClick: function () {},
			self: {},
		},
	};
};

function MyPosts(props: any) {
	return (
		<Box>
			{Object.keys(props.self).length > 0 ? (
				<Box className="w-full mt-10 grid grid-cols-3 gap-1">
					{props.self?.posts?.map((post: any) => {
						return (
							<Box
								className="cursor-pointer w-[310px] h-[310px]"
								key={post._id}
								onClick={() => props.handleClick(post.url, post._id)}
							>
								<img src={post.url} className="w-full h-full" alt="#" />
							</Box>
						);
					})}
				</Box>
			) : (
				<MyAllPosts />
			)}
		</Box>
	);
}

export default MyPosts;
