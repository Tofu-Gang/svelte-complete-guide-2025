const counter = $state({
	value: 0
});

export default counter;

export function increment(): void {
	counter.value++;
}

export function reset(): void {
	counter.value = 0;
}
