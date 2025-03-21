<script lang="ts">
import ClickToCount from '$lib/components/ClickToCount.svelte';
import Button from '$lib/components/Button.svelte';
import { increment } from '$lib/utils/counter.svelte';
</script>

<Button onclick={increment}>Increment</Button>
<ClickToCount />
<ClickToCount />
<ClickToCount />

<style>
	:global(body) {
			background-color: #222;
			color: #fff;
	}
</style>
