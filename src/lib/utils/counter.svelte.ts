class Counter {
	value = $state(0);

	// does not work!!!
	// constructor() {
	// 	$effect(() => {
	// 		console.log(this.value);
	// 	});
	// }

	increment = () => {
		this.value += 1;
	};

	reset = () => {
		this.value = 0;
	};
}

const counter = new Counter();
export default counter;
