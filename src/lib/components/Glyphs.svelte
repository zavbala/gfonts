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
		margin-top: 2rem;
		margin-bottom: 2rem;
		grid-template-columns: repeat(10, 1fr);
	}

	span {
		padding: 1rem;
		display: flex;
		font-size: 2rem;
		align-items: center;
		transition: all 0.2s;
		justify-content: center;
		grid-column: 1 span / 1 span;
		font-family: var(--font-family);
	}

	@media screen and (max-width: 640px) {
		div {
			display: none;
		}
	}
</style>
