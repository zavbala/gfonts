import Fonts from '$lib/data/Fonts.json';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const entry = Fonts['familyMetadataList'];

export function GET({ params }: RequestHandler) {
	const { slug } = params;

	const splitByHyphen = slug.split('-');
	const family = splitByHyphen.length > 1 ? splitByHyphen.join(' ') : slug;
	const specimen = entry.find((font) => font.family === family);

	return json(specimen);
}
