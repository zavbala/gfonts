<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import { family } from '$lib/stores/family';
	import { goto } from '$app/navigation';
	import { slide } from 'svelte/transition';
	import { formatStyle } from '$lib/utils';

	export let index: number;
	export let familyName: string;
	export let styles: String[];
	export let expandable = false;
	export let expandList: (event: Event) => void;

	const handleItem = (event: Event) => {
		const [id, familyName] = (event.target as HTMLElement).id.split(':');
		family.remove([familyName, id]);
	};
</script>

<ul>
	<li class="apart">
		<span> {familyName} </span>

		<button class="rounded" id={String(index)} on:click={expandList}>
			<Hero icon={expandable ? 'ChevronUp' : 'ChevronDown'} />
		</button>
	</li>

	{#if expandable}
		<div
			transition:slide={{ duration: 350 }}
			style="width: 100%;"
			class={expandable ? 'block' : 'hidden'}
		>
			{#each styles.sort() as style, index}
				<li class="apart">
					<small> {formatStyle(String(style)).join(' ')} </small>

					<button class="rounded" id={String(index) + ':' + familyName} on:click={handleItem}>
						<Hero icon="Minus" />
					</button>
				</li>
			{/each}

			<li class="apart">
				<button
					class="btn"
					on:click={() => goto(`/specimen/${familyName.split(' ').join('-')}`, {})}
				>
					Add more styles
				</button>

				<button class="btn" on:click={() => family.restore(familyName)}> Remove all </button>
			</li>
		</div>
	{/if}
</ul>

<style>
	span {
		color: var(--thumb);
	}

	ul {
		border: 1px solid var(--border);
		margin-bottom: 1rem;
		border-radius: 3px;
	}

	/* ul:hover {
		background-color: var(--hover);
	} */

	li {
		width: 100%;
		padding: 0.5rem;
	}
</style>
