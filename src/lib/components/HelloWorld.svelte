<script lang="ts">
	let name = "World";
	let src = "https://picsum.photos/250/300";
	let bio = "Hello, <b>this</b> is me.";
</script>

<!-- access variables from the script part inside curly braces -->
<!-- use other JS features there -->
<h1>Hello {name.toUpperCase()}</h1>
<!-- can use {src} instead of src={src} since the variable name equals the attribute name -->
<!-- use curly braces even in a string -->
<img {src} alt="random 250x300 from picsum {name}" />
<!-- display html using @html; use only for trustworthy html source, can lead to XSS attacks -->
<p>{@html bio}</p>

<style>
		/* only applies to h1 tag in THIS component */
	h1 {
			color: red;
	}
</style>
