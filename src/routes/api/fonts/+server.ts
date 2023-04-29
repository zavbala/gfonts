import { G_FONTS } from '$lib/constant';
import { json } from '@sveltejs/kit';

import type { Specimen } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

const OFFSET = 24;

export async function GET({ url }: RequestEvent) {
	const { searchParams } = url;
	const query = searchParams.get('query');
	const page = searchParams.get('page');

	const external = await (await fetch(G_FONTS + '/metadata/fonts')).json();
	let items = external.familyMetadataList;

	if (query) items = items.filter((value: Specimen) => value.family.includes(query));

	if (page) {
		const bounds = [OFFSET * (Number(page) - 1), OFFSET * Number(page)];
		items = items.slice(...bounds);
	}

	return json({ items, total: page ? external.familyMetadataList.length : items.length });
}
