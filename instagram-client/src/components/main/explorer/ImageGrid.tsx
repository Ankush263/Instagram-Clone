import { Box } from '@mui/material';
import { GetStaticProps } from 'next';
import React from 'react';
import Masonry from 'react-masonry-css';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			breakpoints: {},
			images: [],
			handleClick: function () {},
		},
	};
};

function ImageGrid(props: any) {
	return (
		<Box>
			<Masonry
				breakpointCols={props.breakpoints}
				className="my-masonry-grid"
				columnClassName="my-masonry-grid_column"
			>
				{props.images.map((item: any) => (
					<div key={item._id} className="my-masonry-grid_item">
						<img
							src={item.url}
							alt="#"
							className="max-w-full max-h-full cursor-pointer"
							onClick={() => props.handleClick(item.url, item._id)}
							loading="lazy"
						/>
					</div>
				))}
			</Masonry>
		</Box>
	);
}

export default ImageGrid;
