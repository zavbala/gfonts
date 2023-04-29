<script lang="ts">
	export let className = '';
</script>

<div class={`around ${className}`}>
	<slot name="left" />
	<slot name="main" />
	<slot />
</div>

<style>
	div {
		flex: 1;
		padding: 0.6rem;
	}

	@media screen and (max-width: 820px) {
		div {
			padding: 0.2rem;
		}
	}
</style>
