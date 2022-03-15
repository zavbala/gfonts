<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { family } from '$lib/stores/family';
	import { toggle, settings } from '$lib/stores/settings';
	import { formatStyle, formatSource } from '$lib/utils';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';

	const googleapis = `<link rel="preconnect" href="https://fonts.googleapis.com">`;
	const gstatic = `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>`;

	$: source = formatSource($family);
	let active = '0';

	const clipboard = () => {
		const data = [googleapis, gstatic, source];
		navigator.clipboard.writeText(data.join('\n'));
	};

	const expandList = (event: Event) => {
		active = (event.target as HTMLElement).id;
	};

	const handleItem = (event: Event) => {
		const [id, name] = (event.target as HTMLElement).id.split(':');
		family.remove([name, id]);
	};
</script>

<aside class:col-3={$settings.isSidebarOpen}>
	<div class="apart">
		<h3>Selected Family</h3>
		<button on:click={() => toggle()}>
			<Hero icon="X" />
		</button>
	</div>

	{#if !Object.keys($family)?.length}
		<small> You don’t have any fonts yet. Choose a font to get started. </small>
	{:else}
		<code class="apart">
			{source}
			<button on:click={clipboard}>
				<Hero icon="Duplicate" />
			</button>
		</code>

		<section>
			{#each Object.entries($family) as [name, styles], index}
				{@const expandable = active == String(index)}
				{#if styles.length}
					<ul>
						<li class="apart">
							{name}
							<button id={String(index)} on:click={expandList}>
								<Hero icon={expandable ? 'ChevronUp' : 'ChevronDown'} />
							</button>
						</li>

						{#if expandable}
							<div
								transition:slide={{ duration: 300 }}
								style="width: 100%;"
								class={expandable ? 'block' : 'hidden'}
							>
								{#each styles as style, index}
									<li class="apart">
										{formatStyle(String(style)).join(' ')}
										<button id={String(index) + ':' + name} on:click={handleItem}>
											<Hero icon="Minus" />
										</button>
									</li>
								{/each}
								<li class="apart">
									<button on:click={() => goto(`/specimen/${name.split(' ').join('-')}`)}>
										Add more styles
									</button>
									<button on:click={() => family.restore(name)}> Remove all </button>
								</li>
							</div>
						{/if}
					</ul>
				{/if}
			{/each}
		</section>
	{/if}
</aside>

<style>
	aside {
		height: 100vh;
		padding: 1rem;
		width: calc(1024px / 4);
		position: fixed;
		top: 0;
		right: 0;
		z-index: 20;
		background-color: var(--mine-shaft);
	}

	section {
		flex-direction: column;
		height: 90%;
		overflow-y: hidden;
	}

	section:hover {
		overflow-y: auto;
	}

	button {
		border-radius: 3px;
		padding: 0.2rem 0.4rem;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	ul {
		flex-direction: column;
		border: 1px solid #fff;
		margin-bottom: 1rem;
		border-radius: 3px;
	}

	li {
		width: 100%;
		padding: 0.7rem;
	}

	code {
		display: block;
		border-radius: 3px;
		background-color: blue;
		padding: 0.8rem;
		width: 100%;
		margin-bottom: 1rem;
	}

	@media screen and (max-width: 640px) {
	}
</style>
