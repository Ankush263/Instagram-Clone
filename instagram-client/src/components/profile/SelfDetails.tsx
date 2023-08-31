import { Backdrop, Box, CircularProgress } from '@mui/material';
import React, { useState, ChangeEvent } from 'react';
import { fetchToken } from '../token';
import { updateBio, uploadAvater, deleteAvater } from '@/api';
import SettingsIcon from '@/components/icons/SettingsIcon';
import CloseIcon from '@mui/icons-material/Close';
import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		revalidate: 5,
		props: {
			fetch: function () {},
			self: {},
		},
	};
};

function SelfDetails(props: any) {
	const [openEditProfile, setOpeEditProfile] = useState(false);
	const [openLoad, setOpenLoad] = useState(false);
	const [bio, setBio] = useState('');
	const [openAvaterUpload, setOpenAvaterUpload] = useState(false);
	const [avater, setAvater] = useState<any>('');
	const [avaterImg, setAvaterImg] = useState<any>('');
	const [upload, setUpload] = useState(false);

	const handleEdit = async () => {
		setOpeEditProfile(true);
	};

	const handleCloseEditBio = () => {
		setOpeEditProfile(false);
		setOpenLoad(false);
		setOpenAvaterUpload(false);
		setAvater('');
		setUpload(false);
	};

	const handleUpdateBio = async () => {
		setOpenLoad(true);
		try {
			const token = fetchToken();
			await updateBio(token, { bio });
			setOpeEditProfile(false);
			setBio('');
			props.fetch();
			setOpenLoad(false);
		} catch (error) {
			console.log(error);
			setOpenLoad(false);
		}
	};

	const handleDeleteProfilePic = async () => {
		setOpenLoad(true);
		try {
			const token = fetchToken();
			await deleteAvater(token);
			props.fetch();
			setOpenLoad(false);
		} catch (error) {
			console.log(error);
			setOpenLoad(false);
		}
	};

	const handleChangeAvater = async (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files && e.target.files[0];
		setAvaterImg(file);
		if (file) {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				if (e.target) {
					setAvater(e.target.result as string);
					setUpload(true);
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const uploadProfilePic = async () => {
		setOpenLoad(true);
		try {
			const token = fetchToken();
			const formData = new FormData();
			formData.append('avater', avaterImg);
			await uploadAvater(token, formData);
			props.fetch();
			setOpenLoad(false);
		} catch (error) {
			console.log(error);
			setOpenLoad(false);
		}
	};

	const styles = {
		btn: `bg-grayshBlack active:bg-gray w-[100px] h-8 rounded-lg flex justify-center items-center text-sm font-semibold mr-3`,
		btn2: `bg-red active:bg-gray w-[100px] h-8 rounded-lg flex justify-center items-center text-sm font-semibold mr-3`,
	};

	return (
		<Box className="w-full">
			<Box className="w-10/12 h-12 flex justify-start items-center">
				<p className="text-xl mr-5">{props.self?.username}</p>
				<button className={styles.btn} onClick={handleEdit}>
					Edit bio
				</button>

				{/* Edit Bio backdrop */}

				<Backdrop
					sx={{
						color: '#fff',
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={openEditProfile}
				>
					<Box className="w-[230px] h-[250px] bg-gray rounded-md flex flex-col justify-center items-center">
						<span className="mr-auto ml-7 mb-5">{`Bio:`}</span>
						<Box
							className="absolute top-4 right-4 cursor-pointer"
							onClick={handleCloseEditBio}
						>
							<CloseIcon fontSize="large" />
						</Box>
						<textarea
							className="mb-4 font-xs text-black"
							value={bio}
							onChange={(e) => setBio(e.target.value)}
						/>
						<button
							className="w-20 h-8 rounded-md bg-skyBlue"
							onClick={handleUpdateBio}
						>
							update
						</button>
					</Box>
				</Backdrop>

				{/* ------------------- */}

				<Backdrop
					sx={{
						color: '#fff',
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={openAvaterUpload}
				>
					<Box className="w-[230px] h-[250px] bg-gray rounded-md flex flex-col justify-center items-center">
						<Box
							className="absolute top-4 right-4 cursor-pointer"
							onClick={handleCloseEditBio}
						>
							<CloseIcon fontSize="large" />
						</Box>
						<Box className="w-[100px] h-[100px] rounded-full mb-4">
							{avater && (
								<img
									src={avater}
									alt="Avatar"
									className="w-full h-full rounded-full bg-darkGray"
								/>
							)}
						</Box>
						{upload ? (
							<button className={styles.btn} onClick={uploadProfilePic}>
								upload
							</button>
						) : (
							<Box>
								<input
									type="file"
									id="actual-btn"
									hidden
									onChange={handleChangeAvater}
								/>
								<label
									htmlFor="actual-btn"
									className="px-2 h-8 rounded-md bg-skyBlue flex justify-center items-center"
								>
									update profile pic
								</label>
							</Box>
						)}
					</Box>
				</Backdrop>

				{/* Loading backdrop */}

				<Backdrop
					sx={{
						color: '#fff',
						zIndex: (theme) => theme.zIndex.drawer + 1,
					}}
					open={openLoad}
					onClick={() => setOpenLoad(false)}
				>
					<CircularProgress color="inherit" />
				</Backdrop>

				{/* ------------------- */}

				{!props.self?.avater ? (
					<button
						className={styles.btn}
						onClick={() => setOpenAvaterUpload(true)}
					>
						Upload photo
					</button>
				) : (
					<button
						className={styles.btn2}
						// onClick={() => setOpenAvaterUpload(true)}
						onClick={handleDeleteProfilePic}
					>
						Delete photo
					</button>
				)}

				<Box className="ml-10">
					<SettingsIcon />
				</Box>
			</Box>
		</Box>
	);
}

export default SelfDetails;
