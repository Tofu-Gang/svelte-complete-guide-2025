<script lang="ts"></script>

{#snippet sum(a: number, b: number)}
	{#snippet bold(x: number)}
		<b>{x}</b>
	{/snippet}

	<span>{a} + {b} = {@render bold(a + b)}</span>
{/snippet}
{@render sum(5, 4)}
<!-- will not work, bold snippet is visible only inside sum snippet -->
<!--{@render bold("some text")}-->
