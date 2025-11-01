<script>
	let { name, type, label } = $props();
</script>

<div class="question">
	<label for={name}>{label}</label>
	<input class={type} {name} {type} />
</div>

<style>
	.textarea {
		width: 10rem;
		height: 3rem;
	}
</style>
