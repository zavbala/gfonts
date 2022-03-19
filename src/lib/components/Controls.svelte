<script lang="ts">
	import { preview } from '$lib/stores/preview';
	import Wrapper from '$lib/components/Input.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import { goto } from '$app/navigation';
	import _ from 'lodash';

	let debounce;

	const handleSearch = (event: Event) => {
		clearTimeout(debounce);

		if ($preview.query) {
			setTimeout(() => {
				goto(`?query=${_.startCase(_.capitalize($preview.query))}`);
			}, 1500);
		} else {
			goto('/');
		}
	};
</script>

<header class="apart">
	<Wrapper className="sm-full-width">
		<Hero slot="left" icon="Search" />

		<input
			slot="main"
			bind:value={$preview.query}
			on:keyup={handleSearch}
			type="text"
			placeholder="Search Fonts"
		/>

		{#if $preview.query}
			<button
				class="rounded"
				type="button"
				on:click={() => {
					preview.update((value) => ({ ...value, query: '' }));
					goto('/');
				}}
			>
				<Hero icon="X" />
			</button>
		{:else}
			<div />
		{/if}
	</Wrapper>

	<Wrapper className="sm-hidden">
		<input slot="main" type="text" placeholder="Type Something" bind:value={$preview.customText} />
	</Wrapper>

	<Wrapper className="sm-hidden">
		<small slot="left"> {$preview.fontSize}px </small>
		<input slot="main" type="range" bind:value={$preview.fontSize} min="25" max="50" />
	</Wrapper>

	<button
		class="rounded sm-hidden"
		type="button"
		on:click={() => {
			preview.set({
				customText: '',
				fontSize: 32,
				query: ''
			});
			goto('/');
		}}
	>
		<Hero icon="Refresh" />
	</button>
</header>

<style>
	header {
		margin-bottom: 1rem;
		position: sticky;
		top: 0;
		z-index: 10;
		background-color: var(--bg);
		padding: 0.7rem;
		border-bottom: 1px solid var(--border);
	}
</style>
