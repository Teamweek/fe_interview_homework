const emoji = [
	'Segoe UI Emoji',
	'Segoe UI Symbol',
	'Segoe UI',
	'Apple Color Emoji',
	'Twemoji Mozilla',
	'Noto Color Emoji',
	'EmojiOne Color',
	'Android Emoji',
	'sans-serif',
];

const fontFamily = [
	'Inter',
	'system-ui',
	'-apple-system',
	'BlinkMacSystemFont',
	'"Segoe UI"',
	'Roboto',
	'"Helvetica Neue"',
	'Arial',
	'"Noto Sans"',
	...emoji,
];

export default {
	content: ['src/**/*.svelte', 'src/**/*.html', 'src/**/*.js', 'src/**/*.ts'],
	theme: {
		extend: {
			fontFamily: {
				sans: fontFamily,
			},
		},
	},
};
