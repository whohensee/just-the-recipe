<script>
	let { data } = $props();
</script>

<h1>Status is: {data.stats}</h1>
<h1>URL is : {data.DATABASE_URL}</h1>
<h1>Result is: {data.resp1}</h1>

<style>
	h1 {
		color: white;
	}
</style>
