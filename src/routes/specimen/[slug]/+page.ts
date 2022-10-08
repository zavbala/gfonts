import { error } from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ params, fetch }) {
	const { slug } = params;

	try {
		const response = await fetch('/api/fonts/' + slug);
		return { specimen: await response.json() };
	} catch {
		throw error(404, 'Not Found');
	}
}
