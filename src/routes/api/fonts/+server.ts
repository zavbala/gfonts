import Fonts from '$lib/data/Fonts.json';
import type { RequestHandler } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const entry = Fonts['familyMetadataList'];
const OFFSET = 12;

export function GET({ url }: RequestHandler) {
	const { searchParams } = url;
	const query = searchParams.get('query');
	const page = searchParams.get('page');

	let items = entry;

	if (query) {
		items = entry.filter((value) => value.family.includes(query));
	}

	if (page) {
		const bounds = [OFFSET * (Number(page) - 1), OFFSET * Number(page)];
		items = entry.slice(...bounds);
	}

	return json({ items });
}
