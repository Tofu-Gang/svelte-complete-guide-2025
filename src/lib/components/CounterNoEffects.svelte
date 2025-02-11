<script lang="ts">
	let count = $state(0);
	const START_FREQUENCY = 1000;
	let frequency = $state(START_FREQUENCY);
	let paused = $state(false);
	let interval = $state(createTimer());

	function createTimer() {
		return setInterval(() => {
			if(!paused) {
				count++;
			}
		}, frequency);
	}
</script>

<h1>{count}</h1>
<p>{frequency}</p>
<button onclick={() => {
	clearInterval(interval);
	frequency *= 2;
	interval = createTimer();
}}>Slower</button>
<button onclick={() => {
	clearInterval(interval);
	frequency /= 2;
	interval = createTimer();
}}>Faster</button>
<button onclick={() => {
	clearInterval(interval);
	count = 0;
	frequency = START_FREQUENCY;
	interval = createTimer();
}}>Reset</button>
<button onclick={() => {
	paused = !paused;
}}>{paused ? "Play" : "Pause"}</button>
