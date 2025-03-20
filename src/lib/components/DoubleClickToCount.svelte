<script lang="ts">
	import Button from './Button.svelte';
	import counter from '$lib/utils/counter.svelte';

	const { reset } = counter;
</script>

<div class="wrapper">
	<h2>{counter.value}</h2>
	<Button --buttonBgColor="#000" ondblclick={() => counter.value += 2}>Increment</Button>
	<Button --buttonBgColor="#fff" --buttonTextColor="#000" onclick={reset}>Reset</Button>
</div>

<style>
    .wrapper {
        text-align: center;
        background-color: #ff3e00;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 10px;
        h2 {
            font-size: 60px;
            margin: 0 0 20px;
            line-height: 1;
        }
    }
</style>