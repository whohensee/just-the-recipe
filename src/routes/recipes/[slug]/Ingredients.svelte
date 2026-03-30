<script lang="ts">
	interface Props {
		ingredients: ingredients;
	}
	let { ingredients } : Props = $props();
	import { theme } from '$lib/themes/basicTheme';
	import type { ingredients } from '$lib/types';
</script>

<div class="content" style="--bgcolor: {theme.header_color}">
	<h2>Ingredients</h2>

	<table>
		<thead>
			<tr> </tr>
		</thead>
		<tbody>
			<!-- eslint-disable-next-line svelte/require-each-key -->
			{#each ingredients as ingredient}
				<tr>
					<td>{ingredient.name}</td>
					<td>{ingredient.amount}</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>

<style>
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		align-items: center;

		max-width: 490px;
		width: 100%;

		background-color: var(--bgcolor);
		padding: 2rem;

		border: 2px solid white;
	}

	h2 {
		font-size: xx-large;
	}
	p {
		width: 100%;
	}

	ul {
		margin-top: 1rem;
	}

	li {
		list-style-position: inside;
		margin-top: 0.5rem;
	}

	table,
	th,
	td {
		width: 100%;
		border: 1px solid black;
		text-align: left;
		font-size: larger;
		border-collapse: collapse;
		padding: 0rem 1rem;
	}

	table {
		table-layout: fixed;
	}
</style>
