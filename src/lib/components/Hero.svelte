<!-- https://heroicons.dev/ -->

<script lang="ts">
	import { drawn } from '$lib/constant';
	import type { Icons } from '$lib/types';

	export let icon: Icons;
</script>

<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={drawn[icon]} />
</svg>

<style>
	svg {
		width: 1.2rem;
		color: var(--color);
	}
</style>
