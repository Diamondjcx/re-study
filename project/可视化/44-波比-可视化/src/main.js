import App from './App.svelte';
import { initRefLines } from './ref-line';

initRefLines();

const app = new App({
	target: document.body
});

export default app;
