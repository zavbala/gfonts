<script lang="ts">
	export let set: string[];
</script>

<div>
	{#each set as character}
		<span> {character} </span>
	{/each}
</div>

<style>
	div {
		display: grid;
		grid-template-columns: repeat(10, 1fr);
		margin-bottom: 2rem;
		margin-top: 2rem;
	}

	span {
		grid-column: 1 span / 1 span;
		padding: 1rem;
		font-size: 2rem;
		transition: all 0.2s;
		font-family: var(--font-family);
		display: flex;
		align-items: center;
		justify-content: center;
	}

	@media screen and (max-width: 640px) {
		div {
			display: none;
		}
	}
</style>
