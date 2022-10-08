<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { googleapis, gstatic } from '$lib/constant';
	import { family } from '$lib/stores/family';
	import { settings, toggle } from '$lib/stores/settings';
	import { formatSource } from '$lib/utils';
	import { fly } from 'svelte/transition';
	import Review from './Review.svelte';

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

		<button class="rounded center" on:click={() => toggle('isSidebarOpen')}>
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

		<div class="around">
			<div class="around">
				<input type="radio" bind:group={embed} value="HTML" />
				<small> {'<link>'} </small>
			</div>

			<div class="around">
				<input type="radio" bind:group={embed} value="CSS" />
				<small> {'@import'} </small>
			</div>
		</div>

		<code class="apart">
			{#if embed === 'HTML'}
				{'<link>'}
			{:else}
				@import
			{/if}

			<button class="rounded center" on:click={copyURL}>
				<Hero icon="Duplicate" />
			</button>
		</code>

		<code class="apart">
			font-family:

			<button class="rounded center" on:click={copyCSSFamilies}>
				<Hero icon="Duplicate" />
			</button>
		</code>
	{/if}

	<a href="https://github.com/zavbala/gtfont" target="_blank"> GITHUB </a>
</aside>

<style>
	aside {
		top: 0;
		right: 0;
		z-index: 20;
		display: flex;
		height: 100vh;
		position: fixed;
		padding: 0.7rem;
		flex-direction: column;
		width: calc(1024px / 4);
		background-color: var(--bg);
		border-left: 1px solid gray;
		justify-content: space-between;
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
		padding: 0.5rem;
		border-radius: 5px;
		text-align: center;
		color: var(--thumb);
		border: 2px solid var(--thumb);
	}

	a:hover {
		background-color: var(--hover);
	}

	code {
		width: 100%;
		padding: 0.7rem;
		border-radius: 3px;
		background-color: var(--code);
	}

	input[type='radio'] {
		margin-right: 0.5rem;
	}
</style>
