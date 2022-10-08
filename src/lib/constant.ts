export const G_FONTS = 'https://fonts.google.com';

export const G_FONTS_API = 'https://fonts.googleapis.com';

export const URI =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://gtfont.vercel.app';

export const googleapis = `<link rel="preconnect" href="https://fonts.googleapis.com">`;

export const gstatic = `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;

export const STYLES = {
	100: 'Thin',
	200: 'Extra-Light',
	300: 'Light',
	400: 'Regular',
	500: 'Medium',
	600: 'Semi-Bold',
	700: 'Bold',
	800: 'Extra-Bold',
	900: 'Black'
};

export const drawn = {
	X: 'M6 18L18 6M6 6l12 12',
	Search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
	Plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
	Sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
	Moon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
	Grid: 'M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z',
	Minus: 'M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
	ChevronDown: 'M19 9l-7 7-7-7',
	ChevronUp: 'M5 15l7-7 7 7',
	Refresh:
		'M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15',
	Duplicate:
		'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
};
