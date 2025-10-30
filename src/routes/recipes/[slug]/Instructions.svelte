<script>
	let { instructions } = $props();
	import { theme } from '$lib/themes/basicTheme';
</script>

<div class="content" style="--bgcolor: {theme.header_color}">
	<h2>Instructions</h2>
	<p>{instructions.intro}</p>
	<ol>
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each instructions.steps as step}
			<li>{step}</li>
		{/each}
	</ol>
</div>

<style>
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;

		max-width: 490px;
		width: 100%;

		background-color: var(--bgcolor);
	}

	p {
		width: 100%;
	}

	li {
		list-style-position: inside;
	}
</style>
