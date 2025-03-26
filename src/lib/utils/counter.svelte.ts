import { browser } from '$app/environment';

const Defaults = {
	LocalStorage: {
		Counter: 'counter'
	}
};

class Counter {
	#count: number = $state(0);

	get value(): number {
		const storedValue = browser && localStorage.getItem(Defaults.LocalStorage.Counter);

		if (storedValue) {
			this.#count = JSON.parse(storedValue);
		}

		return this.#count;
	}

	set value(value: number) {
		localStorage.setItem(Defaults.LocalStorage.Counter, JSON.stringify(value));
		this.#count = value;
	}

	increment = () => {
		this.value++;
	};

	reset = () => {
		this.value = 0;
	};
}

export default new Counter();
