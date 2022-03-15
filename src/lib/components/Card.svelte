<script lang="ts">
	import { goto } from '$app/navigation';
	import { G_FONTS_API } from '$lib/constant';
	import type { Font, Specimen } from '$lib/types';
	import { preview } from '$lib/stores/preview';

	export let specimen: Specimen;

	const { family, fonts } = specimen;

	const source = `${G_FONTS_API}/css2?family=${family}&display=swap`;
	const styles = Object.keys(fonts).length;
	const about = family.split(' ').length > 1 ? family.split(' ').join('-') : family;

	const pangram = 'The quick brown fox jumps over the lazy dog';
</script>

<svelte:head>
	<link href={source} rel="stylesheet" />
</svelte:head>

<div
	style="--font-family: {family}; --font-size: {$preview.fontSize}px;"
	on:click={() => goto(`/specimen/${about}`)}
>
	<span> {family} </span>

	<p>
		{#if $preview.customText}
			{$preview.customText}
		{:else}
			{pangram}
		{/if}
	</p>

	<small>
		{styles}
		{styles > 1 ? 'styles' : 'style'}
	</small>
</div>

<style>
	div {
		grid-column: 1 span / 1 span;
		border: 1px solid gray;
		padding: 1rem;
		cursor: pointer;
		color: #fff;
		position: relative;
		border-radius: 5px;
	}

	span {
		position: absolute;
		top: 5%;
		left: 5%;
		font-size: 0.8rem;
	}

	p {
		font-family: var(--font-family);
		font-size: var(--font-size);
		word-break: normal;
	}

	small,
	span {
		color: gray;
		transition: all 0.2s;
	}

	small {
		position: absolute;
		bottom: 5%;
		left: 5%;
	}

	div:hover {
		background-color: rgba(255, 255, 255, 0.1);
	}

	@media screen and (max-width: 640px) {
		div {
			width: auto;
		}

		p {
			font-size: 1.5rem;
		}
	}
</style>
