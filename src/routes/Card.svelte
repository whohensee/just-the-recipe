<script>
	import { resolve } from '$app/paths';
	import { theme } from '$lib/themes/basicTheme';
	let { recipe } = $props();
</script>

<div class="card" style="--card-color: {theme.content_color}">
	<img src={recipe.imgurl} alt="food" />
	<h1>{recipe.title}</h1>
	<a href={resolve('./recipes/[slug]', { slug: recipe.slug })}><button>View</button></a>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		max-width: 200px;
		background-color: var(--card-color);
		padding: 1rem;
		align-items: center;
		gap: 0.5rem;
	}

	img {
		width: 200px;
		height: 200px;
	}

	button {
		padding: 0.5rem 1rem;
		border-radius: 8px;
	}
</style>
