<script lang="ts">
	import { onDestroy, onMount, tick, untrack } from 'svelte';

	function getRandomNumber() {
		// return random int between 0 and 9
		return Math.floor(Math.random() * 10);
	}

	let randomNumber = $state(getRandomNumber());
	let doubleRandomNumber = $derived(randomNumber * 2);
	let halfRandomNumber = $state();
	// untrack because warning would be issued without it:
	// let history: number[] = $state([randomNumber]);
	// the warning would just point out that randomNumber is not considered a dependency of the history array
	let history: number[] = $state([untrack(() => randomNumber)]);
	// will be populated with the <p> DOM element showing the history of generated randomNumbers
	let historyPTag: HTMLParagraphElement;

	$effect.pre(() => {
		// $effect.pre runs once before the component is mounted, then runs before DOM changes are applied
		history.length;
		console.log("$effect.pre", historyPTag?.innerText);

		// tick returns a promise which resolves after pending changes are done
		tick().then(() => {
			console.log("After tick", historyPTag.innerText);
		})

		// cleanup function can be added
		return () => {
			console.log("$effect.pre cleanup");
		};
	});

	$effect(() => {
		// $effect runs once when component is initialized, then runs from microtask queue
		halfRandomNumber = Math.floor(randomNumber / 2);
		// this makes the effect dependent on randomNumber AND history array as well, causing recursion
		// history.push(randomNumber);
		// untrack(() => {
			// this works only because randomNumber is referenced in this effect above, if it wasn't,
			// randomNumber would not be considered a dependency (because this is inside untrack) and
			// therefore the effect would not run even if randomNumber changed
			// however, if the generated randomNumber happens to be the same as the previous one, the
			// effect will not run
			// history.push(randomNumber);
		// });
		// make the effect run after the history array length changes
		// not needed actually, because of halfRandomNumber calculation makes the effect dependent on randomNumber
		history.length;
		console.log("$effect", historyPTag.innerText);

		// cleanup function can be added
		return () => {
			console.log("$effect cleanup");
		};
	});

	onMount(() => {
		// lifecycle function that runs once when the component is mounted
		console.log("The component has mounted.");

		// cleanup function can be added
		return () => {
			console.log("onMount cleanup");
		};
	});

	onDestroy(() => {
		// lifecycle function that runs once when the component is destroyed
		console.log("The component has been destroyed.");

		// cleanup function can be added
		return () => {
			console.log("onDestroy cleanup");
		};
	});
</script>

<h2>The random number is: {randomNumber}</h2>
<h2>Double random number is: {doubleRandomNumber}</h2>
<h2>Half random number is: {halfRandomNumber}</h2>
<!-- populate historyPTag with the <p> DOM element -->
<p bind:this={historyPTag}>History: {history}</p>

<button onclick={() => {
	randomNumber = getRandomNumber();
	// randomNumber and doubleRandomNumber are in sync;
	// randomNumber and halfRandomNumber are not, because effects are processed in microtask queue;
	// halfRandomNumber will be always one generation behind
	console.log({ randomNumber, doubleRandomNumber, halfRandomNumber });
	history.push(randomNumber);
}}>Generate</button>
