<script lang="ts">
	// import Proxy from '$lib/components/Proxy.svelte';
	// import DeepState from '$lib/components/DeepState.svelte';
	import Notifications from '$lib/components/Notifications.svelte';
	import Sheet from '$lib/components/sheet/Sheet.svelte';
	import { test_data } from '$lib/components/sheet/utils';

	let data = $state(test_data);
</script>

<hr>
<p>33. Javascript Proxies and Object Setters & Getters</p>
<hr>
<!--<Proxy />-->
<hr>
<p>34. Deep State Reactivity in Svelte</p>
<hr>
<p>35. Debugging in Svelte</p>
<hr>
<!--<DeepState />-->
<hr>
<p>36. Displaying a List of Data (#each loops & @const tags)</p>
<hr>
<p>37. Handling Removing Elements from An Array Correctly</p>
<hr>
<p>38. Immutable Raw State</p>
<hr>
<Notifications />
<hr>
<p>39. Spreadsheet Component: Initialization & Helper Functions</p>
<hr>
<p>40. Spreadsheet Component: Rendering a Table with Cells and Values</p>
<hr>
<p>41. Spreadsheet Component: Selecting & Editing Cells</p>
<hr>
<p>42. Spreadsheet Component: Updating Cells Values</p>
<hr>
<p>43. Spreadsheet Component: Handling SUM & MULTIPLY Functions</p>
<hr>
<p>44. Spreadsheet Component: Binding the Data Prop with $bindable()</p>
<hr>
<p>45. Spreadsheet Component: Changing the Cell Background and Font Colours</p>
<hr>
<pre>{JSON.stringify(data, null, 2)}</pre>
<!-- allow Sheet component to mutate the data by using bind: -->
<!-- since prop "data" is defined as optional, we can omit bind:data entirely and default value
(from $bindable rune in Sheet component) will be used -->
<Sheet bind:data />

<style>
	:global(body) {
			background-color: #222;
			color: #fff;
	}
</style>
