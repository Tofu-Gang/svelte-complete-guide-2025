<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';

	// we need to extend the types so it includes attributes from html button element like disabled
	// we also need to extend the types with anchor attribute since Button component can be rendered
	// either as a button or as an anchor
	type Props = (
		(HTMLButtonAttributes & {href?: never}) |
		(HTMLAnchorAttributes & {href: string})) & {
		// question mark - optional
		left?: Snippet<[boolean]>;
		// no question mark - required
		children: Snippet<[boolean]>;
		right?: Snippet<[boolean]>;
		size?: "sm" | "lg";
		shadow?: boolean;
		bgColor?: string;
		textColor?: string;
		// optional custom event defined in +page route
		onlefthover?: () => void;
	}

	// children is a snippet which is between <Button></Button> elements
	let { left, right, children, bgColor, textColor, size = "sm", shadow = false, class: _class_, onlefthover, ...props }: Props = $props();
	let isLeftHovered = $state(false);
	let isRightHovered = $state(false);
	let isChildrenHovered = $state(false);
	let buttonTag: HTMLButtonElement | HTMLAnchorElement;

	// exported functions can be used outside, in +page route
	export function getButtonTag() {
		return buttonTag;
	}
</script>

<!-- ?. left is optional, its existence can be tested as well like so -->
<!-- <button>{@render left?.()}{@render children()}</button> -->
<!-- class directives - if the result is true, class is added -->
<!-- class directives became obsolete in v5.16; it now accepts objects and arrays, before, it was just strings -->
<!-- <button class:sm={size === "sm"} class:lg={size === "lg"} class:shadow> -->
<!-- rewritten using clsx -->
<!-- using objects -->
<!-- <button class={{ sm: size === "sm", lg: size === "lg", shadow }}> -->
<!-- using arrays; the test object at the end will be flattened -->
<!-- cannot have javascript in style segment, so use style directive instead to access bgColor and textColor props -->
<!-- style:background-color={bgColor} style:color={textColor} -->
<!-- in code, we are creating css variables which are used in the style segment -->
<!-- bind the button html element to buttonTag variable -->
<!-- svelte:element can be used to change dynamically the element to render -->
<!-- if href attribute is present, it will be rendered as an anchor; otherwise, it stays as a button -->
<svelte:element
	this={props.href ? "a" : "button"}
	bind:this={buttonTag}
	class={[
		size === "sm" && "sm",
		size === "lg" && "lg",
		shadow && "shadow",
		{ test: true },
		_class_,
		"button"]}
	{...props}
	style:--buttonBgColor={bgColor}
	style:--buttonTextColor={textColor}
>
	<div class="flex">
		{#if left}
			<div
				class="left-content"
				role="presentation"
				onmouseenter={() => {
					isLeftHovered = true;
					// custom event defined in +page route
					onlefthover?.();
				}}
				onmouseleave={() => {isLeftHovered = false}}
			>
				{@render left(isLeftHovered)}
			</div>
		{/if}
		<div
			role="presentation"
			onmouseenter={() => {isChildrenHovered = true}}
			onmouseleave={() => {isChildrenHovered = false}}
		>
			{@render children(isChildrenHovered)}
		</div>
		{#if right}
			<div
				class="right-content"
				role="presentation"
				onmouseenter={() => {isRightHovered = true}}
				onmouseleave={() => {isRightHovered = false}}
			>
				{@render right(isRightHovered)}
			</div>
		{/if}
	</div>
</svelte:element>

<!-- change styling so the component is rendered visually the same no matter if it is an anchor or a button -->
<style lang="scss">
  .button {
    border: none;
    background-color: var(--buttonBgColor, #ff3e00);
    color: var(--buttonTextColor, #ffffff);
    padding: 0 20px;
    height: 45px;
    font-weight: bold;
    border-radius: 5px;
    cursor: pointer;
		display: inline-block;
		font-family: sans-serif;
		text-decoration: none;
		.flex {
      display: flex;
      align-items: center;
      justify-content: center;
			height: 100%;
		}
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    &:hover {
      background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0 0);
    }
    &:active {
      background-image: linear-gradient(rgba(255, 255, 255, 0.1) 0 0);
    }
    &.sm {
      height: 45px;
    }
    &.lg {
      height: 55px;
      font-size: 20px;
    }
    &.shadow {
      box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
    }
    .left-content {
      margin-inline-end: 10px;
    }
    .right-content {
      margin-inline-start: 10px;
    }
  }
</style>
