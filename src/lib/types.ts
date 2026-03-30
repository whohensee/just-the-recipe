export interface recipe {
	id: string;
	title: string;
	slug: string;
	instructions: instructions;
	imgurl: string;
	ingredients: ingredients;
}

export interface instructions {
	steps: string[];
	intro: string;
}

export interface ingredient {
	name: string;
	amount: string;
}

export type ingredients = ingredient[];
