<script lang="ts">
	import Snippet from "$lib/components/Snippet.svelte";
	import Button from "$lib/components/Button.svelte";
	import { AlarmCheck, AlarmClock, Badge, BadgeCheck, Search, SearchCheck } from 'lucide-svelte';

	const html = "<p>additional text</p>"
	let buttonComponentTag: Button;

	$effect(() => {
		// call the function which is exported from Button component
		const buttonTag = buttonComponentTag.getButtonTag();
		// calling HTMLButtonElement.focus()
		buttonTag.focus();
	});
</script>

<hr>
<p>19. Introduction to Snippets</p>
<hr>
<Snippet />
<hr>
<p>20. Passing Snippets to Components as Props</p>
<hr>
<p>21. Passing Arguments to Component Snippets</p>
<hr>
<p>22. Using SASS & the Class Directive</p>
<hr>
<p>23. UPDATE: New Class Attribute Features</p>
<hr>
<p>24. Extending the HTML Button Element Attributes</p>
<hr>
<p>25. Using the Style Directive</p>
<hr>
<p>26. The Global CSS Selector</p>
<hr>
<p>27. Passing CSS Variables as Props</p>
<hr>
<p>28. Forwarding Events & Custom Events</p>
<hr>
<p>29. Event Bubbling, Capturing and Delegation</p>
<hr>
<p>30. Programatic Component Interaction with Component Exports</p>
<hr>
<p>31. Dynamic Rendering with &lt;svelte:element /></p>
<div class="wrapper">
	{@html html}
	<div
		role="presentation"
		onclick={() => {
			// event bubbling: outermost onclick event runs last
			alert("onclick event coming from button parent div");
		}}
		onclickcapture={(event) => {
			// event bubbling: outermost onclickcapture event runs first
			alert("onclickcapture event coming from button parent div");
			// event bubbling: onclickcapture propagation can be stopped
			// event.stopPropagation();
		}}
	>
		<!-- <Button size="lg" class={{"test-from-route":true}} shadow disabled> -->
		<!-- remove disabled to use style directive with bgColor and textColor props -->
		<!-- we can pass css variables directly as props, without any definition in prop types -->
		<!-- however, global styles after the Button markup override this now -->
		<!-- <Button size="lg" class={{"test-from-route":true}} shadow --buttonBgColor="green" --buttonTextColor="yellow"> -->
		<!-- event listener (onclick here) can be passed as a prop as well -->
		<!-- custom event (onlefthover here) has to be defined in prop types -->
		<!-- href attribute for dynamic rendering; having href present causes the Button component to be rendered as an anchor -->
		<Button
			href="https://svelte.dev"
			bind:this={buttonComponentTag}
			size="lg"
			class={{"test-from-route":true}}
			shadow
			bgColor="green"
			textColor="yellow"
			onclick={(event) => {
				// event bubbling: innermost onclick event runs first
				alert("onclick event as a prop from +page component");
				// event bubbling: onclick propagation can be stopped
				// event.stopPropagation();
			}}
			onclickcapture={() => {
				// event bubbling: innermost onclickcapture event runs last
				alert("onclickcapture event as a prop from +page component")
			}}
			onlefthover={() => {
				alert("left hovered");
			}}
		>
			{#snippet left(isHovered: boolean)}
				{#if isHovered}
					<SearchCheck />
				{:else}
					<Search />
				{/if}
			{/snippet}
			{#snippet children(isChildrenHovered: boolean)}
				{#if isChildrenHovered}
					<BadgeCheck />
				{:else}
					<Badge />
				{/if}
			{/snippet}
			{#snippet right(isHovered: boolean)}
				{#if isHovered}
					<AlarmCheck />
				{:else}
					<AlarmClock />
				{/if}
			{/snippet}
		</Button>
	</div>
</div>

<!-- adding styles globally by using :global; not recommended, using props is recommended instead -->
<!-- use for third party components where props are not available -->
<!-- scope is specified by using .wrapper so it applies only inside the div with this class -->
<!-- we can specify blocks as in case of the button and p tags, or use syntax like for the body -->
<style>
	:global(body) {
			background-color: #222;
	}
	.wrapper :global {
			p {
					color: white;
			}
			button {
          background-color: blue;
			}
	}
</style>
