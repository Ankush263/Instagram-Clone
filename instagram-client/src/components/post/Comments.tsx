import { Box } from '@mui/material';
import React from 'react';
import Comment from '../comment/Comment';
import { CommentSkeleton } from '../skeleton/Skeleton';

function Comments(props: any) {
	return (
		<Box className="w-full h-full">
			{Object.keys(props.post).length > 0 ? (
				props.post?.comments?.map((i: any) => {
					return (
						<Box className="w-10/12 mb-4" key={i._id}>
							<Comment
								content={i.contents}
								createdAt={i.createdAt}
								name={i.user.username}
								avater={i.user.avater}
							/>
						</Box>
					);
				})
			) : (
				<Box className="w-10/12 mb-4 ">
					<CommentSkeleton />
				</Box>
			)}
		</Box>
	);
}

export default Comments;
