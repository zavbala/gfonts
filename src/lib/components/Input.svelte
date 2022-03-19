<script lang="ts">
	export let className = '';
</script>

<div class={`wrapper around ${className}`}>
	<div id="left">
		<slot name="left" />
	</div>

	<slot name="main" />

	<div id="right">
		<slot />
	</div>
</div>

<style>
	.wrapper {
		padding: 0 0.5rem;
	}

	#left {
		margin-right: 0.4rem;
	}

	#right {
		margin-left: 0.2rem;
	}
</style>
