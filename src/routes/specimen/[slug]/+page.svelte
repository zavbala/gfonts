<script lang="ts">
	import { browser } from '$app/environment';
	import Glyphs from '$lib/components/Glyphs.svelte';
	import Styles from '$lib/components/Styles.svelte';
	import { G_FONTS_API } from '$lib/constant';
	import type { Specimen } from '$lib/types';
	import { onDestroy, setContext } from 'svelte';

	export let data: { specimen: Specimen };
	const { family, category, fonts } = data.specimen;

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
		font-family: var(--font-family);
		text-align: center;
	}

	@media screen and (max-width: 640px) {
		h1 {
			font-size: 5rem;
		}
	}
</style>
