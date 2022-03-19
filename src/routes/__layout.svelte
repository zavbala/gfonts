<script>
	import '../app.css';
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/Hero.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { settings, toggle } from '$lib/stores/settings';
</script>

<svelte:head>
	<!-- <meta name="color-scheme" content="dark" /> -->
	<link rel="stylesheet" href={`/themes/${$settings.darkMode ? 'dark' : 'light'}.css`} />
</svelte:head>

<main>
	<div class={$settings.isSidebarOpen ? 'col-10' : 'col-12'}>
		<nav>
			<h1 on:click={() => goto('/')}>GTFont</h1>

			<div id="actions">
				<button on:click={() => toggle('isSidebarOpen')}> <Hero icon="Grid" /> </button>

				<button on:click={() => toggle('darkMode')}>
					{#if $settings.darkMode}
						<Hero icon="Sun" />
					{:else}
						<Hero icon="Moon" />
					{/if}
				</button>
			</div>
		</nav>

		<slot />
	</div>
</main>

{#if $settings.isSidebarOpen}
	<Sidebar />
{/if}

<style>
	main {
		max-width: 1024px;
		margin: auto;
		display: grid;
		grid-template-columns: repeat(12, 1fr);
		transition: all 0.2s;
	}

	#actions {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: row;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	nav {
		height: 15vh;
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
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
		/* nav {
			justify-content: space-around;
		} */
	}
</style>
