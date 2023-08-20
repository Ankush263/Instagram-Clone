/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors';
module.exports = {
	content: [
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',

		// Or if using `src` directory:
		'./src/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {},
		colors: {
			white: '#FFFFFF',
			black: '#000000',
			deepBlue: '#1877F2',
			lightBlue: 'rgba(0, 149, 246, 0.7)',
			lightGray: '#DBDBDB',
			grayshBlack: '#363636',
			darkGray: '#737373',
			gray: `#262626`,
			lightBlack: '#00376B',
			violate: '#385185',
			skyBlue: '#0095F6',
			fuchsia: colors.fuchsia,
			yellow: 'rgb(234 179 8)',
		},
	},
	plugins: [],
};
