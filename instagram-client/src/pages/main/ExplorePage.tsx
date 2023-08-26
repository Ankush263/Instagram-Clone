import LeftSideComponent from '@/components/SideComponents/LeftSideComponent';
import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { getIdAndPhotoOfPosts } from '@/api';
import { fetchToken } from '@/components/token';

function ExplorePage() {
	const [images, setImages] = useState<any>([]);

	const fetch = async () => {
		try {
			const token = fetchToken();
			const res = await getIdAndPhotoOfPosts(token);
			const imgs = res.data.data.data;
			setImages(imgs);
			console.log(res.data.data.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, []);

	const styles = {
		page: `flex justify-center items-start`,
		leftBar: `h-screen w-2/12 mb-auto fixed left-0 top-0`,
	};
	return (
		<Box className={styles.page}>
			<Box className={styles.leftBar}>
				<LeftSideComponent />
			</Box>
			<Box className="w-10/12 ml-auto flex justify-center items-center">
				<Box className="w-10/12 grid grid-cols-3 gap-1 mt-10 mb-10">
					{images.map(({ url, key }: any) => {
						return (
							<Box className="">
								<img
									src={`${url}`}
									alt="#"
									key={key}
									className="w-full h-full"
								/>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Box>
	);
}

export default ExplorePage;
