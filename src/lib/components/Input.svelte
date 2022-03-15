<script lang="ts">
	export let className = '';
</script>

<div class={`apart ${className}`}>
	<slot name="left" />
	<slot name="main" />
	<slot />
</div>

<style>
	div {
		padding: 1rem;
	}
</style>
