<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/Hero.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { settings, toggle } from '$lib/stores/settings';
</script>

<main>
	<div class={$settings.isSidebarOpen ? 'col-10' : 'col-12'}>
		<nav class="apart">
			<h1 on:click={() => goto('/')}>GTFont</h1>
			<button on:click={() => toggle()}> <Hero icon="Grid" /> </button>
		</nav>

		<slot />
	</div>
</main>

{#if $settings.isSidebarOpen}
	<Sidebar />
{/if}

<style>
	main {
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		gap: 3%;
		max-width: 1024px;
		margin: auto;
	}

	div {
		display: flex;
		flex-direction: column;
		transition: all 0.2s;
	}

	nav {
		height: 15vh;
		margin-bottom: 1rem;
	}

	button {
		border-radius: 999px;
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.3rem;
		transition: all 0.2s;
	}

	h1 {
		cursor: pointer;
	}

	@media screen and (max-width: 1024px) {
		nav {
			justify-content: space-around;
		}
	}
</style>
