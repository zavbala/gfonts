<script lang="ts">
	import { browser } from '$app/environment';
	import Glyphs from '$lib/components/Glyphs.svelte';
	import Styles from '$lib/components/Styles.svelte';
	import { G_FONTS_API } from '$lib/constant';
	import { onDestroy, setContext } from 'svelte';

	import type { Specimen } from '$lib/types';

	export let data: { specimen: Specimen };
	// const { family, category, fonts } = data.specimen;

	setContext('current', data.specimen.family);

	const numerals = '1234567890';
	const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

	$: {
		if (browser) {
			document.documentElement.style.setProperty('--font-family', data.specimen.family);
		}
	}

	onDestroy(() => {
		if (browser) {
			document.documentElement.style.removeProperty('--font-family');
		}
	});
</script>

<svelte:head>
	<title>{data.specimen.family} - Google Fonts</title>
	<link href={`${G_FONTS_API}/css2?family=${data.specimen.family}&display=swap`} rel="stylesheet" />
</svelte:head>

<h1>{data.specimen.family}</h1>

<Styles styles={data.specimen.fonts} />
<Glyphs set={alphabet.split('')} />
<Glyphs set={numerals.split('')} />

<style>
	h1 {
		font-size: 8rem;
		text-align: center;
		font-family: var(--font-family);
	}

	@media screen and (max-width: 640px) {
		h1 {
			font-size: 5rem;
		}
	}
</style>
