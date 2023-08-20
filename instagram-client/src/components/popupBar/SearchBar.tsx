import { Box } from '@mui/material';
import React, { useState } from 'react';
import { GoSearch } from 'react-icons/go';
import { TbSearch } from 'react-icons/tb';
import 'animate.css';

function SearchBar() {
	const [trigger, setTrigger] = useState(false);

	const handleClick = () => {
		setTrigger((prev) => !prev);
		openSideBar();
	};

	const styles = {
		container: `w-full h-full flex justify-center items-center`,
		iconBox: `w-full h-full flex justify-start items-center`,
		searchBarBox: `w-96 h-screen flex flex-col justify-start items-start absolute top-0 left-[60px] bg-black animate__animated animate__slideInLeft`,
		searchBar: `w-11/12 h-9 pl-3.5 rounded-lg placeholder:text-darkGray bg-gray mt-10 ml-auto mr-auto focus:outline-0`,
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
					/>
					<Box className="w-full border-b-2 border-gray mt-5 ml-auto mr-auto"></Box>
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
