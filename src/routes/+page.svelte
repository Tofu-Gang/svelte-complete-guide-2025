<script lang="ts">
	import scrollY from "$lib/utils/scroll-y.svelte"

	let show1 = $state(true);
	let show2 = $state(true);

	console.log(scrollY.current);
</script>

<input type="checkbox" bind:checked={show1} />
<input type="checkbox" bind:checked={show2} />
{#if show1}
	<h1 style="position: fixed;top: 100px">{scrollY.current}</h1>
{/if}
{#if show2}
	<h1 style="position: fixed;">{scrollY.current}</h1>
{/if}
<div style="height: 2000px;"></div>

<style>
	:global(body) {
			background-color: #222;
			color: #fff;
	}
</style>
