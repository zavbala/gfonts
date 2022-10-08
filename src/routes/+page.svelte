<script lang="ts">
	import { goto } from '$app/navigation';
	import Card from '$lib/components/Card.svelte';
	import Controls from '$lib/components/Controls.svelte';
	import { URI } from '$lib/constant';
	import { preview } from '$lib/stores/preview';
	import type { Specimen } from '$lib/types';

	let page = 2;
	let axisY: number;
	let infinity: Specimen[] = [];

	export let data: { items: Specimen[]; searching: boolean };

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

	$: if (!data.searching) {
		data.items = [...data.items, ...infinity];
	}
</script>

<svelte:head>
	<title>Browse Fonts</title>
</svelte:head>

<svelte:window bind:scrollY={axisY} />

<Controls />

<section>
	{#if data.items.length}
		{#each data.items as specimen}
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
