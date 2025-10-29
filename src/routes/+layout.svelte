<script>
	import favicon from '$lib/assets/favicon.svg';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<Header />

{@render children?.()}

<style>
	:global(*),
	:global(*::before),
	:global(*::after) {
		box-sizing: border-box;
	}

	:global(*) {
		margin: 0;
		padding: 0;
	}

	:global(body) {
		background-color: #1f0033;
	}
</style>
