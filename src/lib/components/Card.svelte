<script lang="ts">
	import { goto } from '$app/navigation';
	import { G_FONTS_API } from '$lib/constant';
	import { preview } from '$lib/stores/preview';
	import type { Specimen } from '$lib/types';

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
		color: #fff;
		padding: 1rem;
		cursor: pointer;
		position: relative;
		border-radius: 5px;
		grid-column: 1 span / 1 span;
		border: 1px solid var(--border);
	}

	span {
		top: 5%;
		left: 5%;
		font-size: 0.8rem;
		position: absolute;
	}

	p {
		word-break: break-word;
		font-size: var(--font-size);
		font-family: var(--font-family);
	}

	small,
	span {
		color: gray;
		transition: all 0.2s;
	}

	small {
		left: 5%;
		bottom: 5%;
		position: absolute;
	}

	div:hover {
		background-color: var(--hover);
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
