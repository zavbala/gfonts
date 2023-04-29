<script lang="ts">
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

<aside
	transition:fly
	class:col-3={$settings.isSidebarOpen}
	class={!$settings.darkMode ? 'light' : ''}
>
	<div class="apart border-b pd-1">
		<h3>
			Selected
			{Object.keys($family).length > 1 ? 'Families' : 'Family'}
		</h3>

		<button class="rounded center" on:click={() => toggle('isSidebarOpen')}>
			<i class="material-icons"> close </i>
		</button>
	</div>

	{#if !Object.keys($family)?.length}
		<div class="center f-column pd-1">
			<p>¯\_(ツ)_/¯</p>
			<span class="text-center">You don’t have any fonts yet. Choose a font to get started.</span>
		</div>
	{:else}
		<div class="grow pd-1">
			<h3>Review</h3>

			{#each Object.entries($family) as [familyName, styles], index}
				{@const expandable = active == String(index)}

				{#if styles.length}
					<Review {expandList} {index} {expandable} {familyName} {styles} />
				{/if}
			{/each}

			<div class="flex align-start f-column gap-y-1">
				<h3>Use on the web</h3>
				<small> To embed a font, copy the code into the {'<head> of your html </head>'}</small>

				<div class="flex gap-x-1">
					<div class="center">
						<input type="radio" bind:group={embed} value="HTML" />
						<small> {'<link>'} </small>
					</div>

					<div class="center">
						<input type="radio" bind:group={embed} value="CSS" />
						<small> {'@import'} </small>
					</div>
				</div>

				<code class="apart">
					{embed === 'HTML' ? '<link>' : '@import'}

					<button class="rounded center" on:click={copyURL}>
						<i class="material-icons"> content_copy </i>
					</button>
				</code>

				<code class="apart">
					font-family:
					<button class="rounded center" on:click={copyCSSFamilies}>
						<i class="material-icons"> content_copy </i>
					</button>
				</code>
			</div>
		</div>
	{/if}

	<div class="pd-1">
		<a href="https://github.com/zavbala/gtfont" target="_blank"> GITHUB </a>
	</div>
</aside>

<style>
	aside {
		top: 0;
		right: 0;
		z-index: 50;
		display: flex;
		height: 100vh;
		position: fixed;
		flex-direction: column;
		width: calc(1024px / 3);
		background-color: var(--bg);
		justify-content: space-between;
		background-color: var(--sidebar);
	}

	.light {
		box-shadow: 1px 0px 10px 1px rgba(0, 0, 0, 0.2);
	}

	span {
		font-size: 1.3rem;
	}

	a {
		font-size: 1rem;
		padding: 0.5rem;
		border-radius: 5px;
		text-align: center;
		color: var(--thumb);
		border: 2px solid var(--thumb);
	}

	h3 {
		font-weight: 400;
	}

	p {
		font-size: 2.3rem;
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

	code .material-icons {
		font-size: 1rem;
	}

	aside > div {
		height: 7vh;
	}

	input[type='radio'] {
		margin-right: 0.5rem;
	}
</style>
