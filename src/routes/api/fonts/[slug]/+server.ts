import { G_FONTS } from '$lib/constant';
import { json } from '@sveltejs/kit';

import type { Specimen } from '$lib/types';
import type { RequestEvent } from '@sveltejs/kit';

export async function GET({ params }: RequestEvent) {
	const { slug } = params as { slug: string };

	const external = await (await fetch(G_FONTS + '/metadata/fonts')).json();
	const entry = external.familyMetadataList;

	const splitByHyphen = slug.split('-');
	const family = splitByHyphen.length > 1 ? splitByHyphen.join(' ') : slug;
	const specimen = entry.find((font: Specimen) => font.family === family);

	return json(specimen);
}
