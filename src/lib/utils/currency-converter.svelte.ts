class CurrencyConverter {
	#initialBaseValue: number = -1;
	#initialBaseCurrency: string = '';
	#initialTargetCurrency: string = '';

	#baseValue: number = $state(this.#initialBaseValue);
	#baseCurrency: string = $state(this.#initialBaseCurrency);
	#targetValue: number = $state(-1);
	#targetCurrency: string = $state(this.#initialTargetCurrency);

	#baseRates: Record<string, number> = $state({});
	currencies: Record<string, string> = $state({});
	loading: boolean = $state(true);
	error: string | undefined = $state();

	constructor(baseValue: number, baseCurrency: string, targetCurrency: string) {
		this.#initialBaseValue = baseValue;
		this.#initialBaseCurrency = baseCurrency;
		this.#initialTargetCurrency = targetCurrency;
		this.reset();
		this.#loadCurrencies();
		this.#fetchRates();
	}

	get baseValue(): number {
		return this.#baseValue;
	}

	set baseValue(newValue: number) {
		this.#baseValue = newValue < 0 ? 0 : newValue;
		this.#targetValue = this.#calculateTargetValue();
	}

	get baseCurrency(): string {
		return this.#baseCurrency;
	}

	set baseCurrency(newValue: string) {
		this.#baseCurrency = newValue;
		this.#fetchRates();
	}

	get targetValue(): number {
		return this.#targetValue;
	}

	set targetValue(newValue: number) {
		this.#targetValue = newValue;
		this.#baseValue = this.#calculateBaseValue();
	}

	get targetCurrency(): string {
		return this.#targetCurrency;
	}

	set targetCurrency(newValue: string) {
		this.#targetCurrency = newValue;
		this.#targetValue = this.#calculateTargetValue();
	}

	get baseRates(): Record<string, number> {
		return this.#baseRates;
	}

	set baseRates(newValue: Record<string, number>) {
		this.#baseRates = newValue;
		this.#targetValue = this.#calculateTargetValue();
	}

	get rate(): number {
		return this.#baseRates[this.#targetCurrency];
	}

	async #fetchRates(): Promise<void> {
		const response: Response = await fetch(
			`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${this.baseCurrency}.json`
		);
		const responseJSON: Record<string, number> = await response.json();
		this.baseRates = responseJSON[this.#baseCurrency];
	}

	async #loadCurrencies(): Promise<void> {
		this.loading = true;
		this.error = undefined;

		try {
			this.currencies = await fetch(
				'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.json'
			).then((response: Response): Promise<Record<string, string>> => response.json());
		} catch (error) {
			this.error = `An error has occurred: ${error}`;
		}
		this.loading = false;
	}

	#calculateBaseValue(): number {
		return Number((this.targetValue / this.rate).toFixed(2));
	}

	#calculateTargetValue(): number {
		return Number((this.baseValue * this.rate).toFixed(2));
	}

	switch(): void {
		const base: string = this.#baseCurrency;
		this.baseCurrency = this.#targetCurrency;
		this.targetCurrency = base;
	}

	reset(): void {
		this.#baseValue = this.#initialBaseValue;
		this.#baseCurrency = this.#initialBaseCurrency;
		this.targetCurrency = this.#initialTargetCurrency;
	}
}

export default CurrencyConverter;
