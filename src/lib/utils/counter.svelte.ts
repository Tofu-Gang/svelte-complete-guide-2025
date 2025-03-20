function createCounter() {
	let count: number = $state(0);
	$effect(() => {
		console.log(count);
	});
	return {
		get value(): number {
			return count;
		},
		increment: (): number => count++,
		reset: (): number => (count = 0)
	};
}

export default createCounter;
