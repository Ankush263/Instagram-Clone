import react, { useEffect } from 'react';
import Homepage from '../components/main/HomePage';
import { fetchToken } from '@/components/token';

export default function Home() {
	const token = fetchToken();

	const fetch = () => {
		if (!token) {
			window.location.replace(`/auth/login`);
		}
	};

	useEffect(() => {
		fetch();
	}, []);
	return (
		<>
			<Homepage />
		</>
	);
}
