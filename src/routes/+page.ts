/** @type {import('./$types').PageLoad} */
export async function load({ fetch, url }) {
	const { searchParams } = url;
	const query = searchParams.get('query');
	const endpoint = '/api/fonts' + (query ? `?query=${query}` : '?page=1');
	const response = await fetch(endpoint);
	const data = await response.json();

	return {
		searching: (query && true) || false,
		items: data['items']
	};
}
