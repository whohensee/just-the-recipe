<script>
	import { theme } from '$lib/themes/basicTheme';
	import FormCreate from '../../create/FormCreate.svelte';
	let { form, data } = $props();
	let action = 'update';
</script>

<div class="wrapper" style="--bg-color: {theme.header_color}">
	<FormCreate {form} {action} recipe={data.recipe} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--bg-color);
	}
</style>
