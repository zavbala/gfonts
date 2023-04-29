<script lang="ts">
	import { goto } from '$app/navigation';
	import { family } from '$lib/stores/family';
	import { formatStyle } from '$lib/utils';
	import { slide } from 'svelte/transition';

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
		<button class="rounded center" id={String(index)} on:click={expandList}>
			<span class="material-icons"> {expandable ? 'expand_less' : 'expand_more'} </span>
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

					<button
						on:click={handleItem}
						class="rounded center"
						id={String(index) + ':' + familyName}
					>
						<span class="material-icons"> remove_circle_outline </span>
					</button>
				</li>
			{/each}

			<li class="apart">
				<button
					class="btn"
					on:click={() =>
						goto(`/specimen/${familyName.split(' ').join('-')}`, { replaceState: true })}
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
		border-radius: 3px;
		margin-bottom: 1rem;
		border: 1px solid var(--border);
	}

	li {
		width: 100%;
		padding: 0.5rem;
	}
</style>
