const counter = $state({
	value: 0
});

$effect.root(() => {
	$effect(() => {
		console.log(counter.value);
	});
});

export default counter;

export function increment(): void {
	counter.value++;
}

export function reset(): void {
	counter.value = 0;
}
