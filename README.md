# Full Thrust Game Builder

**This tool is still in development and not ready for use.** Everything is done on the client. No Internet access is required once the page is downloaded.

If you want to host it yourself, download the latest ZIP file from the Releases and put the files wherever you want.

This site is built on the [Svelte framework](https://svelte.dev/), using the [Bulma CSS library](https://bulma.io/).

I believe in the "value for value" model. If you find this tool valuable, consider a donation proportional to that value: [paypal.me/abstractplay](https://www.paypal.me/abstractplay). Thank you!

## Developers

If you want to contribute to the code, here's how to get the development environment up and running:

* Install [NodeJS](https://nodejs.org).
* Clone the repo.
* From the newly cloned folder, type `npm i` to install all the dependencies.
* Then type `npm run dev` to start up the dev server.

Ideally you'd submit any changes via pull request, but if you wanted to just host your own instance, run `npm run build` and then move everything in the `dist` folder to some host somewhere.

The core ship handling code (including glyph drawing and JSON schema) has been abstracted into a standalone package: <https://github.com/Perlkonig/ftLibShip>.

The core game handling code has also been abstracted into its own standalone package: <https://github.com/Perlkonig/ftLibGame>.
