<script>
	import Nav from '$lib/components/Nav.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { settings } from '$lib/stores/settings';

	import '../app.css';
</script>

<svelte:head>
	<!-- <meta name="color-scheme" content="dark" /> -->
	<link rel="stylesheet" href={`/themes/${$settings.darkMode ? 'dark' : 'light'}.css`} />
</svelte:head>

<main>
	<Nav />
	<slot />
</main>

{#if $settings.isSidebarOpen}
	<Sidebar />
{/if}

<style>
	main {
		margin: auto;
		display: flex;
		max-width: 1024px;
		flex-direction: column;
	}
</style>
