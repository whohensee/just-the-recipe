<script>
	import { theme } from '$lib/themes/basicTheme';
	import FormCreate from './FormCreate.svelte';
	let { form } = $props();
	let action = 'create';
</script>

<div class="wrapper" style="--bg-color: {theme.header_color}">
	<FormCreate {form} {action} />
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		background-color: var(--bg-color);
	}

	/* h1 {
		background-color: var(--bg-color);
		padding: 1rem 2rem;
		border-radius: 8px;
		margin-bottom: 1rem;
	} */
</style>
