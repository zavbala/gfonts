import { STYLES, G_FONTS_API } from '$lib/constant';
import type { FamilyTree, Style } from '$lib/types';

export const formatStyle = (weight: string): Style => {
	const array = weight.split('');
	const isItalic = array.includes('i');
	const integer = Number(array.slice(0, 3).join(''));

	return [STYLES[integer], integer, isItalic ? 'Italic' : ''];
};

export const formatSource = (tree: FamilyTree): string => {
	const params = [];

	Object.entries(tree).map(([family, styles]) => {
		const children = {
			italic: [],
			normal: []
		};

		if (family.split(' ').length > 1) {
			family = family.split(' ').join('+');
		}

		for (const style of styles) {
			const [, weight, italic] = formatStyle(style);
			const isItalic = italic === 'Italic';
			const child = `${isItalic ? 1 : 0},${weight}`;

			if (isItalic) {
				children.italic.push(child);
			} else {
				children.normal.push(child);
			}
		}

		const italicSources = children.italic.length >= 1;

		const query =
			`family=${family}` +
			`:${italicSources ? 'ital,' : ''}wght@` +
			children['normal'].join(';') +
			`${italicSources ? ';' + children.italic.join(';') : ''}`;

		params.push(query);
	});

	params.push('display=swap');

	return `<link href="${G_FONTS_API + '/css2?' + params.join('&')}" rel="stylesheet">`;
};
