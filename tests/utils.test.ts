import { formatStyle, formatSource } from '../src/lib/utils';
import { G_FONTS_API } from '../src/lib/constant';

test.each([
	['400i', ['Regular', 400, 'Italic']],
	['900', ['Black', 900, '']]
])('define style', (weight, expected) => {
	expect(formatStyle(weight)).toStrictEqual(expected);
});

test.each([
	[[{ Roboto: ['100', '200'] }], `${G_FONTS_API}/css2?family=Roboto:wght@0,100;0,200&display=swap`],
	[
		[{ 'Crimson Pro': ['200', '200i'] }],
		`${G_FONTS_API}/css2?family=Crimson+Pro:ital,wght@0,200;1,200&display=swap`
	],
	[
		[{ Roboto: ['100', '100i'] }, { 'Crimson Pro': ['400', '400i'] }],
		`${G_FONTS_API}/css2?family=Roboto:ital,wght@0,100;1,100&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap`
	]
])('parse source from google fonts', (item, expected) => {
	expect(formatSource(item)).toStrictEqual(expected);
});
