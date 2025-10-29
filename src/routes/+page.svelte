<script>
	import CardArea from './CardArea.svelte';
</script>

<h1>Welcome to SvelteKit</h1>
<p>
	Visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to read the documentation, okay
	boyo?
</p>

<div class="area">
	<CardArea />
</div>

<style>
	.area {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
