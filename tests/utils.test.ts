import { formatStyle, formatSource, setPrefix } from '../src/lib/utils';
import { G_FONTS_API } from '../src/lib/constant';

test.each([
	['400i', ['Regular', 400, 'Italic']],
	['900', ['Black', 900, '']]
])('define style', (weight, expected) => {
	expect(formatStyle(weight)).toStrictEqual(expected);
});

// test.each([
// 	[{ Roboto: ['100', '200'] }, `${G_FONTS_API}/css2?family=Roboto:wght@100;200&display=swap`],
// 	[
// 		{ 'Bebas Neue': ['400'], Poppins: ['400', '500', '600'] },
// 		`${G_FONTS_API}/css2?family=Bebas+Neue&family=Poppins:wght@400;500;600&display=swap`
// 	],
// 	[{ Montserrat: ['400', '400i'] }, `${G_FONTS_API}/css2?family=Montserrat:ital@0;1&display=swap`]
// ])('parse source from google fonts', (item, expected) => {
// 	expect(formatSource(item)).toStrictEqual(expected);
// });

test.each([
	[
		{ name: 'Roboto', styles: ['200', '100', '500'] },
		{
			Roboto: {
				italic: [],
				normal: ['0,100', '0,200', '0,500']
			}
		}
	]
])('filter by style', (family, expected) => {
	expect(setPrefix(family)).toStrictEqual(expected);
});
