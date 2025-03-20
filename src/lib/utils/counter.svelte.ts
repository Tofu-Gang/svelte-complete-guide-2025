let count = $state(0);

export default {
	get value(): number {
		return count;
	},

	set value(value: number) {
		count = value;
	},

	increment(): void {
		count++;
	},

	reset(): void {
		count = 0;
	}
};
