<!-- https://heroicons.dev/ -->
<script lang="ts">
	import type { Icons } from '$lib/types';

	export let icon: Icons;
	// export let color: string = '';

	const drawn = {
		X: 'M6 18L18 6M6 6l12 12',
		Search: 'M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z',
		Plus: 'M12 6v6m0 0v6m0-6h6m-6 0H6',
		Sun: 'M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z',
		Moon: 'M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z',
		Grid: 'M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z',
		Minus: 'M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z',
		ChevronDown: 'M19 9l-7 7-7-7',
		ChevronUp: 'M5 15l7-7 7 7',
		Duplicate:
			'M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z'
	}[icon];
</script>

<svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
	<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d={drawn} />
</svg>

<style>
	svg {
		width: 1.2rem;
		color: #fff;
	}
</style>
