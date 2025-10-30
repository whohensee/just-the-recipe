import { recipes } from '$lib/data/recipes.js';

export function load( {params} ) {
    // note that this means our DB must require unique slugs
    const recipe = recipes.find((recipe) => recipe.slug === params.slug );

    return {
        recipe
    }
}