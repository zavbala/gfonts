<script lang="ts">
	import { LOGO } from '$lib/constant';
	import { settings, toggle } from '$lib/stores/settings';
</script>

<nav>
	<a href="/" class="center">
		<img src={LOGO} alt="A Google Fonts Logo" class="margin-left" on:dragstart|preventDefault />

		<p class="sm-hidden">
			<span> Google </span> Fonts
		</p>
	</a>

	<div id="actions">
		<button class="center action" on:click={() => toggle('darkMode')}>
			{#if $settings.darkMode}
				<span class="material-icons"> brightness_high </span>
			{:else}
				<span class="material-icons"> brightness_4 </span>
			{/if}
		</button>

		<button class="center action" on:click={() => toggle('isSidebarOpen')}>
			<span class="material-icons"> grid_view </span>
		</button>
	</div>
</nav>

<style>
	nav {
		height: 7vh;
		margin: auto;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
		max-width: var(--viewport);
		justify-content: space-between;
	}

	a {
		font-size: 1.5rem;
	}

	a p span {
		font-weight: 500;
	}

	nav img {
		width: 2rem;
		height: 2rem;
	}

	#actions {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	@media screen and (max-width: 820px) {
		nav {
			padding: 0 1rem;
		}
	}
</style>
