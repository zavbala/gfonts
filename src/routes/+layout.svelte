<script>
	import { goto } from '$app/navigation';
	import Hero from '$lib/components/Hero.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import { settings, toggle } from '$lib/stores/settings';
	import '../app.css';
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
				<button class="center" on:click={() => toggle('darkMode')}>
					{#if $settings.darkMode}
						<Hero icon="Sun" />
					{:else}
						<Hero icon="Moon" />
					{/if}
				</button>
				<button class="center" on:click={() => toggle('isSidebarOpen')}>
					<Hero icon="Grid" />
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
		margin: auto;
		display: grid;
		max-width: 1024px;
		transition: all 0.2s;
		grid-template-columns: repeat(12, 1fr);
	}

	#actions {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	div {
		display: flex;
		flex-direction: column;
	}

	nav {
		height: 15vh;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		justify-content: space-around;
	}

	button {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.3rem;
		transition: all 0.2s;
		border-radius: 999px;
	}

	h1 {
		cursor: pointer;
	}
</style>
