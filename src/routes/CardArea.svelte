<script>
	import Card from './Card.svelte';
</script>

<div class="area">
	<Card />
	<Card />
	<Card />
	<Card />
	<Card />
	<Card />
</div>

<style>
	.area {
		display: flex;
		flex-wrap: wrap;
		gap: 66px;
		justify-content: left;
		max-width: 1000px;
	}
</style>
