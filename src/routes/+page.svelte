<script>
	import CardArea from './CardArea.svelte';
	let { data } = $props();
</script>

<div class="area">
	<CardArea recipes={data.recipes} />
</div>

<style>
	.area {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
