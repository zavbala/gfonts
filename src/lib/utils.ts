import { G_FONTS_API, STYLES } from '$lib/constant';
import type { Family, FamilyTree, Item, Style } from '$lib/types';

export const formatStyle = (weight: string): Style => {
	const array = weight.split('');
	const isItalic = array.includes('i');
	const integer = Number(array.slice(0, 3).join(''));

	return [STYLES[integer], integer, isItalic ? 'Italic' : ''];
};

export const setPrefix = (family: Family) => {
	const { name, styles } = family;
	const sources = [[], []];
	let familyName = name;

	if (name.split(' ').length > 1) {
		familyName = name.split(' ').join('+');
	}

	for (const style of styles) {
		const [, weight, italic] = formatStyle(style);
		const isItalic = italic === 'Italic';
		const child = `${isItalic ? 1 : 0},${weight}`;

		if (isItalic) {
			sources[0].push(child);
		} else {
			sources[1].push(child);
		}
	}

	const [italic, normal] = sources;

	return {
		[familyName]: {
			italic: italic.sort(),
			normal: normal.sort()
		}
	};
};

export const formatSource = (tree: FamilyTree) => {
	const query = [];
	const families: Item[] = [];

	Object.entries(tree).forEach(([name, styles]) => {
		families.push(setPrefix({ name, styles }));
	});

	for (const family of families) {
		const [[key, value]] = Object.entries(family);
		const { italic, normal } = value;

		const italicSources = italic.length >= 1;
		const regular = normal.includes('0,400');
		const regularItalic = italic.includes('1,400');

		let flag = true;

		if (regular || regularItalic) {
			if (normal.length === 1 && italic.length === 1) {
				query.push(`family=${key}:ital@0;1`);
				flag = false;
			}
			if (normal.length === 1 && !italic.length) {
				query.push(`family=${key}`);
				flag = false;
			}
			if (italic.length === 1 && !normal.length) {
				query.push(`family=${key}:ital@1`);
				flag = false;
			}
		}

		if (flag) {
			query.push(
				`family=${key}` +
					`:${italicSources ? 'ital,' : ''}wght@` +
					(italicSources
						? normal.join(';')
						: normal.map((item) => `${item.split(',')[1]}`).join(';')) +
					`${italicSources ? ';' + italic.join(';') : ''}`
			);
		}
	}

	return `${G_FONTS_API + '/css2?' + [...query, 'display=swap'].join('&')}`;
};
