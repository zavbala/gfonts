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

	export let data: { items: Specimen[]; searching: boolean; total: number };

	const fetcher = async () => {
		const args = new URLSearchParams({ page: String(page) });
		const response = await fetch(URI + '/api/fonts' + `?` + args.toString());

		if (response.ok) {
			const data = await response.json();
			infinity = data['items'];
		}
	};

	$: if (axisY) {
		const element = document.documentElement;
		const offset = element.scrollTop + window.innerHeight;
		if (offset >= element.offsetHeight) page++, fetcher();
	}

	const handleView = () => {
		preview.update((value) => ({
			...value,
			viewMode: value.viewMode === 'grid' ? 'list' : 'grid'
		}));
	};

	$: if (!data.searching) data.items = [...data.items, ...infinity];
</script>

<svelte:head>
	<title>Browse Fonts - Google Fonts</title>
</svelte:head>

<svelte:window bind:scrollY={axisY} />

<Controls />

<div id="top" class="sm-hidden apart my-1">
	<small> {data.total} of {data.total} families </small>

	<div>
		<button
			title={$preview.viewMode === 'grid' ? 'List' : 'Grid'}
			type="button"
			on:click={handleView}
		>
			<span class="material-icons">
				{$preview.viewMode === 'grid' ? 'view_list' : 'view_module'}
			</span>
		</button>
	</div>
</div>

{#if data.items.length}
	<section class={$preview.viewMode === 'grid' ? 'grid-3' : 'grid-1'}>
		{#key data}
			{#each data.items as specimen}
				<Card {specimen} />
			{/each}
		{/key}
	</section>
{:else}
	<div class="f-column center">
		<h1>(·_·)</h1>
		<button
			on:click={() => {
				preview.update((value) => ({ ...value, query: '' }));
				goto('/');
			}}>Clear your filters and try again</button
		>
	</div>
{/if}

<style>
	section {
		gap: 15px;
		display: grid;
		margin-bottom: 2rem;
	}

	h1 {
		font-size: 7rem;
	}

	button {
		padding: 0.4rem;
		font-weight: 500;
		border-radius: 5px;
		color: var(--thumb);
		border: 1px solid var(--thumb);
	}

	@media screen and (max-width: 820px) {
		section {
			padding: 1rem;
			grid-template-columns: repeat(2, 1fr);
		}

		#top {
			padding: 1rem;
		}
	}

	@media screen and (max-width: 640px) {
		section {
			padding: 1rem;
			grid-template-columns: repeat(1, 1fr);
		}
	}
</style>
