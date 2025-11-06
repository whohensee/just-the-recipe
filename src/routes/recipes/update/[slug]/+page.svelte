<script>
	import { theme } from '$lib/themes/basicTheme';
	import FormCreate from '../../create/FormCreate.svelte';
	let { form, data } = $props();
	let action = 'update';
</script>

<div class="content" style="--bg-color: {theme.header_color}">
	<div class="title">
		<h1>Recipe Update Page</h1>
	</div>

	<div class="formWrapper">
		<FormCreate {form} {action} recipe={data.recipe} />
	</div>
</div>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.formWrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--bg-color);
		min-width: 1000px;
	}

	.title {
		background-color: var(--bg-color);
		text-align: center;
		width: fit-content;
		padding: 0.5rem 1rem 0.5rem 1rem;
		margin-bottom: 1rem;
		border: 2px solid white;
	}
</style>
