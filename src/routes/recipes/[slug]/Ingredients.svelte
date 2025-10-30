<script>
	let { ingredients } = $props();
	import { theme } from '$lib/themes/basicTheme';
</script>

<div class="content" style="--bgcolor: {theme.header_color}">
	<h2>Ingredients</h2>
	<ul>
		<!-- eslint-disable-next-line svelte/require-each-key -->
		{#each Object.entries(ingredients) as [ingredient, amount]}
			<li>{ingredient} : {amount}</li>
		{/each}
	</ul>
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
		padding: 2rem;
	}

	p {
		width: 100%;
	}

	ul {
		margin-top: 1rem;
	}

	li {
		list-style-position: inside;
		margin-top: 0.5rem;
	}
</style>
