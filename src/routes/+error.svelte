<script>
	import { theme } from '$lib/themes/basicTheme';
</script>

<div class="wrapper">
	<div class="content" style="--bg-color: {theme.header_color}">
		<h1>Sorry, something went wrong.</h1>
		<h2>Please navigate back to the home page and don't do that again!</h2>
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.content {
		background-color: var(--bg-color);
		max-width: 1000px;
		width: 100%;
		text-align: center;
	}
</style>
