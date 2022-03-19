<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { family } from '$lib/stores/family';
	import { toggle, settings } from '$lib/stores/settings';
	import { formatSource } from '$lib/utils';
	import Review from './Review.svelte';
	import { fly } from 'svelte/transition';
	import { googleapis, gstatic } from '$lib/constant';

	$: source = formatSource($family);

	let active = '0';
	let embed = 'HTML';

	const copyURL = () => {
		const data = [googleapis, gstatic, `<link href=${source} rel="stylesheet"> `];
		const url = `<style> @import url('${source}') </style>`;

		navigator.clipboard.writeText(embed === 'HTML' ? data.join('\n') : url);
	};

	const copyCSSFamilies = () => {
		navigator.clipboard.writeText('');
	};

	const expandList = (event: Event) => {
		active = (event.target as HTMLElement).id;
	};
</script>

<aside transition:fly class:col-3={$settings.isSidebarOpen}>
	<div class="apart border-b">
		<h3>Selected Family</h3>

		<button class="rounded" on:click={() => toggle('isSidebarOpen')}>
			<Hero icon="X" />
		</button>
	</div>

	{#if !Object.keys($family)?.length}
		<div class="center f-column">
			<span> ¯\_( )_/¯ </span>

			<small class="text-center">
				You don’t have any fonts yet. Choose a font to get started.
			</small>
		</div>
	{:else}
		<section>
			{#each Object.entries($family) as [familyName, styles], index}
				{@const expandable = active == String(index)}

				{#if styles.length}
					<Review {expandList} {index} {expandable} {familyName} {styles} />
				{/if}
			{/each}
		</section>

		<!-- <div class="apart">
			<select bind:value={embed}>
				<option value="HTML"> HTML </option>
				<option value="CSS"> CSS </option>
			</select>

			<Hero icon="ChevronDown" />
		</div> -->

		<!-- <div class="apart">
			<label for="HTML">
				HTML
				<input id="HTML" type="checkbox" checked />
			</label>

			<label for="CSS">
				<input id="CSS" type="checkbox" />
			</label>
		</div> -->

		<code class="apart">
			{#if embed === 'HTML'}
				{'<link>'}
			{:else}
				@import
			{/if}

			<button class="rounded" on:click={copyURL}>
				<Hero icon="Duplicate" />
			</button>
		</code>

		<code class="apart">
			font-family:

			<button class="rounded" on:click={copyCSSFamilies}>
				<Hero icon="Duplicate" />
			</button>
		</code>
	{/if}

	<a href="https://github.com/zavbala/gtfont" target="_blank"> GitHub </a>
</aside>

<style>
	aside {
		height: 100vh;
		padding: 0.7rem;
		width: calc(1024px / 4);
		position: fixed;
		top: 0;
		right: 0;
		z-index: 20;
		border-left: 1px solid gray;
		background-color: var(--bg);
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}

	section {
		height: 50%;
		overflow-y: hidden;
	}

	section:hover {
		overflow-y: auto;
	}

	span {
		font-size: 3rem;
		margin-bottom: 0.5rem;
	}

	a {
		font-size: 1rem;
		text-align: center;
		border-radius: 5px;
		border: 2px solid var(--thumb);
		padding: 0.5rem;
		color: var(--thumb);
	}

	a:hover {
		background-color: var(--hover);
	}

	/* select {
		border: 1px solid var(--border);
		margin-bottom: 0.5rem;
		padding: 0.7rem;
		border-radius: 999px;
	} */

	code {
		border-radius: 3px;
		background-color: var(--code);
		padding: 0.7rem;
		width: 100%;
	}
</style>
