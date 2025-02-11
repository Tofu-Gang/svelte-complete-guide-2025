<script lang="ts">
	let count = $state(0);
	const START_FREQUENCY = 1000;
	let frequency = $state(START_FREQUENCY);
	let paused = $state(false);

	$effect(() => {
		let interval: ReturnType<typeof setInterval>;
		if(!paused) {
			interval = setInterval(() => {
				// not actually updating state inside an $effect, which is not recommended
				// the effect just initializes the interval
				count++;
				// $effect is now dependent on frequency state, when frequency changes, $effect
				// reruns and create a new interval every time
			}, frequency);
		}
		return () => {
			// clear the previous interval so there is only one counter running at all times
			clearInterval(interval);
		};
	});
</script>

<h1>{count}</h1>
<p>{frequency}</p>
<button onclick={() => {
	frequency *= 2;
}}>Slower</button>
<button onclick={() => {
	frequency /= 2;
}}>Faster</button>
<button onclick={() => {
	count = 0;
	frequency = START_FREQUENCY;
}}>Reset</button>
<button onclick={() => {
	paused = !paused;
}}>{paused ? "Play" : "Pause"}</button>
