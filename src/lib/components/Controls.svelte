<script lang="ts">
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/Hero.svelte';
	import Wrapper from '$lib/components/Input.svelte';
	import { preview } from '$lib/stores/preview';
	import _ from 'lodash';

	let debounce: NodeJS.Timeout;

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
		<button type="button" disabled slot="left" class="rounded center">
			<Hero icon="Search" />
		</button>

		<input
			type="text"
			slot="main"
			bind:value={$preview.query}
			on:keyup={handleSearch}
			placeholder="Search Fonts"
		/>

		{#if $preview.query}
			<button
				type="button"
				class="rounded center"
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
		class="rounded sm-hidden center"
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
		top: 0;
		z-index: 10;
		padding: 0.7rem;
		position: sticky;
		margin-bottom: 1rem;
		background-color: var(--bg);
		border-bottom: 1px solid var(--border);
	}
</style>
