<script>
	import { resolve } from '$app/paths';
	import { theme } from '$lib/themes/basicTheme';
</script>

<div class="wrapper" style="--header-color: {theme.header_color}">
	<nav>
		<div class="content">
			<h1><a href={resolve('/')}>Just The Recipe</a></h1>
			<h2><a href={resolve('/recipes/create')}>New Recipe</a></h2>
			<p>A site by William Hohensee</p>
		</div>
	</nav>
</div>

<style>
	.wrapper {
		padding: 1rem 0px;
	}

	nav {
		background-color: var(--header-color);
		display: flex;
		justify-content: center;
		padding: 1rem;
	}

	.content {
		display: flex;
		align-items: center;
		justify-content: space-between;
		max-width: 1000px;
		width: 100%;
	}
</style>
