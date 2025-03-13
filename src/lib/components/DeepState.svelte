<script lang="ts">
	// objects and arrays are converted into proxies (recursively)
	// primitives like numbers and strings are individual states
	let array = $state([1, 2, 3, 4]);
	let objectsArray = $state([{ id: 1 }, { id: 2 }]);
	let object = $state({
		firstName: "Jakub",
		lastName: "Franěk",
		address: {
			city: "City",
			street: "Street"
		}
	});
	console.log(array, objectsArray, object);
	// logs snapshot (not a proxy) if the object mutates
	// inspect function can be changed, default is console.log
	$inspect(object).with(console.trace);

	$effect(() => {
		console.log('object effect');
		console.log(object);
	});
	$effect(() => {
		// highlights in the console which state change caused this effect to run
		$inspect.trace();
		console.log('object.firstName effect');
		console.log(object.firstName);
	});
	$effect(() => {
		console.log('object.address.city');
		console.log(object.address.city);
	});
	$effect(() => {
		console.log('array[0]');
		console.log(array[0]);
	});
	$effect(() => {
		console.log('array.length');
		console.log(array.length);
	});
</script>

<!-- creates a breakpoint and tracks selected variables -->
{@debug object, array}
<h2>{object.firstName}</h2>
<h2>{object.address.city}</h2>

<input bind:value={object.firstName} />
<input bind:value={object.address.city} />
<input bind:value={object.address.street} />

<p>{array}</p>

<button
	onclick={() => {
		array[0] = Math.floor(Math.random() * 10);
	}}>Add to array</button>

<!-- not updated when array changes, unless array[0] specifically changes -->
<h1>{array[0]}</h1>
