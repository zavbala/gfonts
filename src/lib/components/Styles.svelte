<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { family } from '$lib/stores/family';
	import { formatStyle } from '$lib/utils';
	import type { Font } from '$lib/types';
	import { getContext } from 'svelte';

	export let styles = {};

	const current = getContext('current') as string;

	const handleFamily = (event: any) => {
		const { name } = event.target;
		family.add([current, name]);
	};
</script>

<section>
	{#each Object.keys(styles) as weight}
		{@const style = formatStyle(weight)}
		{@const available = $family[current]?.includes(weight) || false}

		<div class="apart">
			<span>{style.join(' ')}</span>

			{#if !available}
				<button name={weight} on:click={handleFamily}>
					<Hero icon="Plus" />
					<small> Select this style </small>
				</button>
			{/if}
		</div>
	{/each}
</section>

<style>
	section {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 2%;
		margin: 7rem 0;
	}

	div {
		padding: 1rem;
		border-bottom: 1px solid gray;
		grid-column: 1 span / 1 span;
	}

	div:hover > button {
		opacity: 1;
		background-color: rgba();
		border-color: #fff;
	}

	span {
		font-size: 1rem;
	}

	button {
		padding: 0.5rem 0.3rem;
		display: flex;
		border-radius: 3px;
		align-items: center;
		width: 10rem;
		height: 2rem;
		justify-content: space-around;
		opacity: 0;
		transition: all 0.2s;
		border: 2px solid;
	}

	@media screen and (max-width: 768px) {
		section {
			grid-template-columns: repeat(1, 1fr);
			padding: 1rem;
			margin: 1rem 0;
		}

		span {
			font-size: 1rem;
		}

		button {
			opacity: 1;
		}
	}
</style>
