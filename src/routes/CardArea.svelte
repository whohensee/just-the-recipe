<script>
	import Card from './Card.svelte';
	import { recipes } from '$lib/data/recipes.js';
</script>

<div class="area">
	{#each recipes as recipe (recipe.slug)}
		<Card {recipe} />
	{/each}
</div>

<style>
	.area {
		display: flex;
		flex-wrap: wrap;
		gap: 66px;
		justify-content: left;
		max-width: 1000px;
	}
</style>
