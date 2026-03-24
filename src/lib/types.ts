export interface recipe {
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

export interface ingredients {
	[index: string]: string;
}
