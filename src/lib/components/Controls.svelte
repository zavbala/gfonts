<script lang="ts">
	import { goto } from '$app/navigation';
	import { preview, reset } from '$lib/stores/preview';
	import { toggle } from '$lib/stores/settings';
	import _ from 'lodash';
	import Wrapper from './Input.svelte';

	let flag = false;
	let debounce: NodeJS.Timeout;
	let targetElement: HTMLElement;

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
		const rect = targetElement.getBoundingClientRect();
		const isSticky = rect.top <= 0 && rect.bottom > 0;

		if (isSticky) flag = true;
		else flag = false;
	};
</script>

<svelte:window on:wheel={reachSelfElement} />

<header bind:this={targetElement} class={flag ? 'reached' : 'missed'}>
	<div class="apart">
		<Wrapper className="sm-full-width border-r border-none">
			<button type="button" slot="left" class="center action" disabled>
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
				class="center action {$preview.query ? 'opacity-1' : 'opacity-0'}"
				on:click={() => {
					preview.update((value) => ({ ...value, query: '' }));
					goto('/');
				}}
			>
				<span class="material-icons"> close </span>
			</button>
		</Wrapper>

		<Wrapper className="md-hidden border-r">
			<input
				slot="main"
				type="text"
				placeholder="Type Something"
				bind:value={$preview.customText}
			/>
		</Wrapper>

		<Wrapper className="sm-hidden">
			<small slot="left"> {$preview.fontSize}px </small>
			<input slot="main" type="range" bind:value={$preview.fontSize} min="25" max="50" />
			<button
				type="button"
				class="sm-hidden center action"
				on:click={() => {
					reset(), goto('/');
				}}
			>
				<span class="material-icons"> refresh </span>
			</button>
		</Wrapper>

		{#if flag}
			<button class="center action" on:click={() => toggle('isSidebarOpen')}>
				<span class="material-icons"> grid_view </span>
			</button>
		{/if}
	</div>
</header>

<style>
	header {
		top: 0;
		z-index: 10;
		padding: 0 1rem;
		position: sticky;
		background-color: var(--bg);
	}

	div {
		width: 100%;
		margin: auto;
		max-width: var(--viewport);
	}

	.reached {
		width: 100vw;
		border-top: 1px solid var(--border);
		border-bottom: 1px solid var(--border);
	}

	.missed {
		width: 95%;
		margin: auto;
		border-radius: 999px;
		max-width: var(--viewport);
		border: 1px solid var(--border);
	}

	@media screen and (max-width: 820px) {
	}
</style>
