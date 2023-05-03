<script>
	import { dev } from '$app/environment';
	import { page } from '$app/stores';
	import Controls from '$lib/components/Controls.svelte';
	import Nav from '$lib/components/Nav.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { settings } from '$lib/stores/settings';
	import { inject } from '@vercel/analytics';

	import '../app.css';

	inject({ mode: dev ? 'development' : 'production' });

	$: pathname = $page.url.pathname;
</script>

<svelte:head>
	<!-- <meta name="color-scheme" content="dark" /> -->
	<link rel="stylesheet" href={`/themes/${$settings.darkMode ? 'dark' : 'light'}.css`} />

	<title>Browse Fonts - Google Fonts</title>

	<meta
		name="description"
		content="Making the web more beautiful, fast, and open through great typography"
	/>

	<!-- Open Graph / Facebook -->
	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://gfonts.vercel.app" />
	<meta property="og:title" content="Google Fonts" />
	<meta
		property="og:description"
		content="Making the web more beautiful, fast, and open through great typography"
	/>
	<meta property="og:image" content="https://gfonts.vercel.app/banner.png" />

	<!-- Twitter -->
	<meta property="twitter:card" content="summary_large_image" />
	<meta property="twitter:url" content="https://gfonts.vercel.app" />
	<meta property="twitter:title" content="Google Fonts" />
	<meta
		property="twitter:description"
		content="Making the web more beautiful, fast, and open through great typography"
	/>
	<meta property="twitter:image" content="https://gfonts.vercel.app/banner.png" />
</svelte:head>

<Nav />

{#if pathname === '/'}
	<Controls />
{/if}

<main class="no-padding">
	<slot />
</main>

{#if $settings.isSidebarOpen}
	<Sidebar />
{/if}

<style>
	main {
		margin: auto;
		display: flex;
		flex-direction: column;
		max-width: var(--viewport);
	}
</style>
