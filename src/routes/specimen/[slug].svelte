<script context="module" lang="ts">
	/** @type {import('@sveltejs/kit').Load} */

	export async function load({ params, fetch }) {
		const response = await fetch('/api/fonts/' + params.slug);

		return {
			status: response.status,
			props: {
				specimen: response.ok && (await response.json())
			}
		};
	}
</script>

<script lang="ts">
	import type { Specimen } from '$lib/types';
	import { G_FONTS_API } from '$lib/constant';
	import Styles from '$lib/components/Styles.svelte';
	import Glyphs from '$lib/components/Glyphs.svelte';
	import { onDestroy, setContext } from 'svelte';
	import { browser } from '$app/env';

	export let specimen: Specimen;
	const { family, category, fonts } = specimen;

	setContext('current', family);

	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	const numerals = '1234567890';

	$: {
		if (browser) {
			document.documentElement.style.setProperty('--font-family', family);
		}
	}

	onDestroy(() => {
		if (browser) {
			document.documentElement.style.removeProperty('--font-family');
		}
	});
</script>

<svelte:head>
	<title>{family}</title>
	<link href={`${G_FONTS_API}/css2?family=${family}&display=swap`} rel="stylesheet" />
</svelte:head>

<h1>{family}</h1>

<Styles styles={fonts} />
<Glyphs set={alphabet.split('')} />
<Glyphs set={numerals.split('')} />

<style>
	h1 {
		font-size: 8rem;
		color: #fff;
		font-family: var(--font-family);
		text-align: center;
	}

	@media screen and (max-width: 640px) {
		h1 {
			font-size: 5rem;
		}
	}
</style>
