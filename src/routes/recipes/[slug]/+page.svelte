<script>
	let { data } = $props();
	import { resolve } from '$app/paths';
	import Instructions from './Instructions.svelte';
	import Ingredients from './Ingredients.svelte';
	import { theme } from '$lib/themes/basicTheme';
	let confirmDelete = $state(false);
	function deleteButton() {
		if (!confirmDelete) {
			confirmDelete = true;
			return;
		} else {
			document.getElementById('deleteform').submit();
		}
	}
	let deletion_pwd = $state('');
</script>

{#if data.recipe}
	<div class="wrapper">
		<h1 style="--bg-color: {theme.header_color}">{data.recipe.title}</h1>
		<div class="buttonHolder" style="--grey: #B8B8B8">
			<a href={resolve('/recipes/update/[slug]', { slug: data.recipe.slug })}>
				<button type="button" class="update">Update</button>
			</a>
			<form method="POST" action="?/delete" class="deletion" id="deleteform">
				<input type="hidden" name="recipe-id" value={data.recipe.id} />
				<button type="button" class="delete" onclick={deleteButton}>Delete</button>
				{#if confirmDelete}
					<div class="pwdHolder">
						<label for="pwd" style:color="white">Admin Password</label>
						<input type="password" name="pwd" value={deletion_pwd} autocomplete="off" />
					</div>
				{/if}
			</form>
		</div>
		<div class="content">
			<Instructions instructions={data.recipe.instructions} />
			<Ingredients ingredients={data.recipe.ingredients} />
		</div>
	</div>
{:else}
	<h1>There's no recipe here!</h1>
{/if}

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;
	}
	.content {
		display: flex;
		justify-content: space-between;
		max-width: 1000px;
		width: 100%;
	}

	h1 {
		background-color: var(--bg-color);
		padding: 1rem 2rem;
		border-radius: 8px;
		margin-bottom: 1rem;
	}

	.buttonHolder {
		display: flex;
		justify-content: center;
		gap: 1rem;
		width: 250px;
	}

	button {
		flex: 1;
		padding: 0.5rem 0.25rem;
		background-color: var(--grey);
		border: 2px solid white;
		border-radius: 8px;
		font-size: large;
	}

	.deletion {
		display: flex;
		align-items: center;
	}

	.pwdHolder {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>
