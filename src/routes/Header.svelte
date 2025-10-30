<script>
	import { resolve } from '$app/paths';
</script>

<div class="wrapper">
	<nav>
		<div class="content">
			<h1><a href={resolve('/')}>Just The Recipe</a></h1>
			<p>A site by William Hohensee</p>
		</div>
	</nav>
</div>

<style>
	.wrapper {
		padding: 1rem 0px;
	}

	nav {
		background-color: #73648a;
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
