<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */

	export async function load({ fetch, url }) {
		const { searchParams } = url;
		const query = searchParams.get('query');

		const endpoint = 'api/fonts' + (query ? `?query=${query}` : '?page=1');

		const response = await fetch(endpoint);
		const data = await response.json();

		return {
			props: {
				searching: (query && true) || false,
				items: data['items']
			}
		};
	}
</script>

<script>
	import Card from '$lib/components/Card.svelte';
	import { URI } from '$lib/constant';
	import Controls from '$lib/components/Controls.svelte';
	import { goto } from '$app/navigation';
	import { preview } from '$lib/stores/preview';

	let axisY;
	let page = 2;
	let infinity = [];

	export let items;
	export let searching;

	const fetcher = async () => {
		const response = await fetch(URI + '/api/fonts' + `?page=${page}`);

		if (response.ok) {
			const data = await response.json();
			infinity = data['items'];
		}
	};

	$: if (axisY) {
		const element = document.documentElement;
		const offset = element.scrollTop + window.innerHeight;

		if (offset >= element.offsetHeight) {
			page++;
			fetcher();
		}
	}

	$: if (!searching) {
		items = [...items, ...infinity];
	}
</script>

<svelte:head>
	<title>Browse Fonts</title>
</svelte:head>

<svelte:window bind:scrollY={axisY} />

<Controls />

<section>
	{#if items.length}
		{#each items as specimen}
			{#key specimen}
				<Card {specimen} />
			{/key}
		{/each}
	{:else}
		<div class="center">
			<h1>(·_·)</h1>
			<button
				on:click={() => {
					preview.update((value) => ({ ...value, query: '' }));
					goto('/');
				}}>Clear your filters and try again</button
			>
		</div>
	{/if}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 15px;
		margin-bottom: 2rem;
		padding: 1rem;
	}

	div {
		width: 100%;
		grid-column: 3 span / 3 span;
		flex-direction: column;
	}

	h1 {
		font-size: 7rem;
	}

	button {
		border-radius: 5px;
		border: 1px solid var(--thumb);
		padding: 0.8rem;
		color: var(--thumb);
		font-weight: 500;
	}

	@media screen and (max-width: 768px) {
		section {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media screen and (max-width: 640px) {
		section {
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
