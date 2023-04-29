<script lang="ts">
	import { LOGO } from '$lib/constant';
	import { settings, toggle } from '$lib/stores/settings';
</script>

<nav>
	<div class="center">
		<img src={LOGO} alt="A Google Fonts Logo" class="margin-left" on:dragstart|preventDefault />

		<a href="/" class="">
			<p class="sm-hidden">
				<span> Google </span> Fonts
			</p>
		</a>
	</div>

	<div id="actions">
		<button class="center" on:click={() => toggle('darkMode')}>
			{#if $settings.darkMode}
				<span class="material-icons"> brightness_high </span>
			{:else}
				<span class="material-icons"> brightness_4 </span>
			{/if}
		</button>

		<button class="center" on:click={() => toggle('isSidebarOpen')}>
			<span class="material-icons"> grid_view </span>
		</button>
	</div>
</nav>

<style>
	nav {
		height: 7vh;
		display: flex;
		align-items: center;
		margin-bottom: 1rem;
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

	button {
		width: 2.5rem;
		height: 2.5rem;
		padding: 0.3rem;
		transition: all 0.2s;
		border-radius: 999px;
	}

	#actions {
		display: flex;
		align-items: center;
		flex-direction: row;
		justify-content: space-between;
	}

	@media screen and (max-width: 820px) {
		nav {
			padding: 0 1.5rem;
		}
	}
</style>
