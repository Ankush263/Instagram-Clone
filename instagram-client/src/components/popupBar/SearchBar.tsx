import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { GoSearch } from 'react-icons/go';
import { TbSearch } from 'react-icons/tb';
import { createSearch } from '@/api';
import 'animate.css';
import { fetchToken } from '../token';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from 'next/link';

function SearchBar() {
	const [trigger, setTrigger] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [queryResult, setQueryResult] = useState<any>([]);

	const handleClick = () => {
		setTrigger((prev) => !prev);
		openSideBar();
	};

	const fetch = async () => {
		try {
			const token = fetchToken();
			console.log(searchQuery.length);
			if (searchQuery.length > 0) {
				const res = await createSearch(token, searchQuery);
				console.log(res.data.data.data);
				setQueryResult(res.data.data.data);
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetch();
	}, [searchQuery]);

	const styles = {
		container: `w-full h-full flex justify-center items-center`,
		iconBox: `w-full h-full flex justify-start items-center`,
		searchBarBox: `w-96 h-screen flex flex-col justify-start items-start absolute top-0 left-[62px] bg-black animate__animated animate__slideInLeft cursor-auto`,
		searchBar: `w-11/12 h-9 pl-3.5 rounded-lg placeholder:text-darkGray bg-gray mt-10 ml-auto mr-auto focus:outline-0`,
		searchItemsBox: `w-full h-full mt-4 flex flex-col items-center`,
		profileBox: `w-10/12 h-[50px] flex justify-between items-center mb-4`,
	};

	const openSideBar = () => {
		if (trigger) {
			return (
				<Box className={styles.searchBarBox}>
					<p className="text-2xl font-semibold mt-6 ml-8">Search</p>
					<input
						type="search"
						placeholder="Search"
						className={styles.searchBar}
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
					/>
					<Box className="w-full border-b-2 border-gray mt-5 ml-auto mr-auto"></Box>
					<Box className={styles.searchItemsBox}>
						{queryResult.length > 0 ? (
							queryResult.map((result: any) => {
								return (
									<Box className={styles.profileBox} key={result?.id}>
										<Box className="w-[45px] h-[45px] rounded-full cursor-pointer">
											{result?.avater ? (
												<Link
													href={{
														pathname: `/main/ProfilePage`,
														query: { id: result?.id },
													}}
												>
													<img
														src={result?.avater}
														className="w-full h-full rounded-full"
													/>
												</Link>
											) : (
												<Link
													href={{
														pathname: `/main/ProfilePage`,
														query: { id: result?.id },
													}}
												>
													<AccountCircleIcon className="w-full h-full" />
												</Link>
											)}
										</Box>
										<Box className="h-full flex flex-col justify-center items-start w-10/12">
											<span className="text-sm font-semibold">
												{result?.username}
											</span>
											<Box className="flex justify-center items-center">
												<span className="text-darkGray text-sm">
													{result?.fullname}
												</span>
												<Box className="w-1 h-1 rounded-full border-2 text-darkGray ml-2"></Box>
												<span className="text-darkGray ml-2 text-sm">{`${result?.followersNum} followers`}</span>
											</Box>
										</Box>
									</Box>
								);
							})
						) : (
							<span className="text-darkGray">No result found...</span>
						)}
					</Box>
				</Box>
			);
		}
	};

	return (
		<Box className={styles.container}>
			<Box className={styles.iconBox}>
				{trigger ? (
					<Box className="border-2 rounded-lg p-1">
						<TbSearch size={23} onClick={handleClick} />
					</Box>
				) : (
					<GoSearch size={28} onClick={handleClick} />
				)}
				<p className="ml-3" onClick={handleClick}>
					Search
				</p>
				{openSideBar()}
			</Box>
		</Box>
	);
}

export default SearchBar;
