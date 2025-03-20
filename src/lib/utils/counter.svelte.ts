class Counter {
	value: number = $state(0);

	constructor() {
		$effect(() => {
			console.log(this.value);
		});
	}

	increment = () => {
		this.value++;
	};

	reset = () => {
		this.value = 0;
	};
}

export default Counter;
