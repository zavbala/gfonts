<script lang="ts">
	import { family } from '$lib/stores/family';
	import { settings } from '$lib/stores/settings';
	import { formatStyle } from '$lib/utils';
	import { getContext } from 'svelte';

	export let styles = {};
	const current = getContext('current') as string;

	const handleFamily = (event: any) => {
		const { name } = event.target;
		family.add([current, name]);

		if (!$settings.isSidebarOpen) {
			settings.update((values) => ({ ...values, isSidebarOpen: true }));
		}
	};
</script>

<section>
	{#each Object.keys(styles) as weight}
		{@const style = formatStyle(weight)}
		{@const available = $family[current]?.includes(weight) || false}

		<div class="apart">
			<span>{style.join(' ')}</span>

			{#if !available}
				<button name={weight} on:click={handleFamily} class="around">
					<span class="material-icons"> add_circle_outline </span>
					<small> Select this style </small>
				</button>
			{/if}
		</div>
	{/each}
</section>

<style>
	section {
		gap: 2%;
		display: grid;
		margin: 7rem 0;
		grid-template-columns: repeat(2, 1fr);
	}

	div {
		padding: 1rem;
		grid-column: 1 span / 1 span;
		border-bottom: 1px solid var(--border);
	}

	div:hover > button {
		opacity: 1;
	}

	span {
		font-size: 1rem;
	}

	button {
		opacity: 0;
		width: 10rem;
		height: 2rem;
		border-radius: 3px;
		transition: all 0.2s;
		padding: 0.5rem 0.3rem;
	}

	small {
		font-weight: 500;
	}

	@media screen and (max-width: 820px) {
		section {
			padding: 1rem;
			margin: 1rem 0;
			grid-template-columns: repeat(1, 1fr);
		}

		span {
			font-size: 1rem;
		}

		button {
			opacity: 1;
		}
	}
</style>
