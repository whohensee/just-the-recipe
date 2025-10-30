# Just The Recipe

This site, built from the basic Svelte 5 template, will be a simple recipe website, designed to present just the basic tools needed for a recipe with none of the fluff. It will begin as a static site that just presents the information nicely. Then it will evolve to include some more features including:

- shopping list generator
- CRUD operations
- user accounts and sessions

Fixes:
- Prevent long names from bleeding out in the cards (e.g. Quinoaoaoaoaoaoaoa)

# sv

Everything you need to build a Svelte project, powered by [`sv`](https://github.com/sveltejs/cli).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```sh
# create a new project in the current directory
npx sv create

# create a new project in my-app
npx sv create my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.
