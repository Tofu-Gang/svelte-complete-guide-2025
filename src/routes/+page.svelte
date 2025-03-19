<script lang="ts">
	import { SvelteDate, SvelteURL } from 'svelte/reactivity';
	import CurrencyConverter from '$lib/components/CurrencyConverter.svelte';

	let date = new SvelteDate();
	const url = new SvelteURL("https://example.com/path");

	$effect(() => {
		const interval = setInterval(() => {
			date.setTime(Date.now());
		}, 1000);

		return () => {
			clearInterval(interval);
		}
	})
</script>

<CurrencyConverter />

<p>
	{date.getHours().toString().padStart(2, "0")}:{date.getMinutes().toString().padStart(2, "0")}:{date.getSeconds().toString().padStart(2, "0")}
</p>

<!-- changes to these -->
<input bind:value={url.protocol} />
<input bind:value={url.hostname} />
<input bind:value={url.pathname} />
<hr />
<!-- will update `href` and vice versa -->
<input bind:value={url.href} />

<style>
	:global(body) {
			background-color: #222;
			color: #fff;
	}
</style>
