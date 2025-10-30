<script>
	import faviconURL from '$lib/assets/favicon.svg';
	let { recipe } = $props();
</script>

<div class="card">
	<img src={recipe.imgURL} alt="food" />
	<h1>{recipe.title}</h1>
	<a href="./recipes/{recipe.slug}"><button>View</button></a>
</div>

<style>
	.card {
		display: flex;
		flex-direction: column;
		max-width: 200px;
		background-color: #4a5240;
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
