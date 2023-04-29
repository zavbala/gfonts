<script lang="ts">
	import { goto } from '$app/navigation';
	import Wrapper from '$lib/components/Input.svelte';
	import { preview, reset } from '$lib/stores/preview';
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

	const reachSelfElement = (element: WheelEvent) => {
		//
	};
</script>

<svelte:window on:wheel={reachSelfElement} />

<header class="apart">
	<Wrapper className="sm-full-width border-r border-none">
		<button type="button" disabled slot="left" class="rounded center">
			<span class="material-icons"> search </span>
		</button>

		<input
			type="text"
			slot="main"
			on:keyup={handleSearch}
			placeholder="Search Fonts"
			bind:value={$preview.query}
		/>

		<button
			type="button"
			class="rounded center {$preview.query ? 'opacity-1' : 'opacity-0'}"
			on:click={() => {
				preview.update((value) => ({ ...value, query: '' }));
				goto('/');
			}}
		>
			<span class="material-icons"> close </span>
		</button>
	</Wrapper>

	<Wrapper className="sm-hidden border-r">
		<input slot="main" type="text" placeholder="Type Something" bind:value={$preview.customText} />
	</Wrapper>

	<Wrapper className="sm-hidden">
		<small slot="left"> {$preview.fontSize}px </small>

		<input slot="main" type="range" bind:value={$preview.fontSize} min="25" max="50" />

		<button
			type="button"
			class="rounded sm-hidden center"
			on:click={() => {
				reset(), goto('/');
			}}
		>
			<span class="material-icons"> refresh </span>
		</button>
	</Wrapper>
</header>

<style>
	header {
		top: 0;
		z-index: 10;
		position: sticky;
		margin-bottom: 1rem;
		border-radius: 999px;
		background-color: var(--bg);
		border: 1px solid var(--border);
	}

	@media screen and (max-width: 820px) {
		header {
			margin: 0 0.7rem;
		}
	}
</style>
