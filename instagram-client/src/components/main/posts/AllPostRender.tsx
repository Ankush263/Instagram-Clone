import { Box } from '@mui/material';
import React from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CommentOutline from 'public/icons/CommentOutline';
import LikeComponent from '../LikeComponent';
import { time } from '@/api/calcTime';
import Link from 'next/link';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			setOpen: function () {},
			setDetails: function () {},
			setLoad: function () {},
			posts: [],
		},
	};
};

function AllPostRender(props: any) {
	const handleOpenPost = async (id: string, url: string, avater: string) => {
		try {
			props.setOpen(true);
			props.setDetails({ id, url, avater });
			props.setLoad((prev: any) => !prev);
		} catch (error) {
			console.log(error);
		}
	};

	const handleReload = () => {
		props.setReloadComponent((prevState: any) => !prevState);
	};

	const styles = {
		postBox: `w-[450px] ml-[100px] mb-20 flex flex-col justify-center items-center`,
		postAvaterBox: `w-full h-[40px] flex justify-start items-center mb-5`,
		postMain: `w-full h-[550px] border-2 border-gray flex justify-center items-center`,
	};

	return (
		<Box>
			{props.posts.map((post: any) => {
				return (
					<Box className={styles.postBox} key={post._id}>
						<Box className={styles.postAvaterBox}>
							<Link
								href={{
									pathname: `/main/ProfilePage`,
									query: { id: post.user._id },
								}}
							>
								<Box className="w-[35px] h-[35px] rounded-full cursor-pointer">
									{post?.user?.avater ? (
										<img
											src={post?.user?.avater}
											className="w-full h-full rounded-full"
										/>
									) : (
										<AccountCircleIcon className="w-full h-full" />
									)}
								</Box>
							</Link>
							<Link
								href={{
									pathname: `/main/ProfilePage`,
									query: { id: post.user._id },
								}}
							>
								<p className="text-xs font-bold ml-2 cursor-pointer">
									{post.user.username}
								</p>
							</Link>
							<span className="w-1 h-1 border-2 border-darkGray rounded-full ml-3"></span>
							<p className="text-sm text-darkGray ml-1">
								{time(post.createdAt)}
							</p>
						</Box>
						<Box className={styles.postMain}>
							<img src={post.url} className="max-w-full max-h-full" alt="#" />
						</Box>
						<Box className="w-full h-[40px] flex justify-start items-start mt-3">
							<Box className="cursor-pointer">
								<LikeComponent _id={post._id} reload={handleReload} />
							</Box>
							<Box
								className="ml-3"
								onClick={() =>
									handleOpenPost(post?._id, post?.url, post?.user.avater)
								}
							>
								<CommentOutline />
							</Box>
						</Box>
						<Box className="w-full flex justify-start items-start">
							<span className="text-sm">
								{post.likesNum}
								{` likes`}
							</span>
						</Box>
						<Box className="w-full">
							<span className="font-semibold text-sm">
								{post.user.username}
								{'    '}
							</span>
							<span className="text-sm text-left">{post.caption}</span>
						</Box>
						<Box className="w-full cursor-pointer">
							<span
								className="text-sm text-darkGray"
								onClick={() =>
									handleOpenPost(post?._id, post?.url, post?.user?.avater)
								}
							>
								View all comments...
							</span>
						</Box>
						<Box className="w-11/12 border-b-2 mt-5 border-gray"></Box>
					</Box>
				);
			})}
		</Box>
	);
}

export default AllPostRender;
