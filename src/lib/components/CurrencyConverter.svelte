<script lang="ts">
	import dummyRates from '$lib/utils/dummy-rates';

	let baseValue: number | undefined = $state(1);
	let baseCurrency: string = $state("usd");
	let baseRates: Record<string, number> = $derived(dummyRates[baseCurrency]);
	let targetCurrency: string = $state("eur");
	let targetValue: number | undefined = $state(calculateTarget());

	function calculateBase(): number | undefined {
		if(targetValue && baseRates[targetCurrency]) {
			return Number((targetValue / baseRates[targetCurrency]).toFixed(2));
		}
	}

	function calculateTarget(): number | undefined {
		if(baseValue && baseRates[targetCurrency]) {
			return Number((baseValue * baseRates[targetCurrency]).toFixed(2));
		}
	}

	function updateBaseValue(newValue: number): void {
		baseValue = newValue;
		targetValue = calculateTarget();
		console.log("Calculate Target value", targetValue);
	}

	function updateTargetValue(newValue: number): void {
		targetValue = newValue;
		baseValue = calculateBase();
		console.log("Calculate Base value", baseValue);
	}

	function updateBaseCurrency(newValue: string): void {
		baseCurrency = newValue;
		targetValue = calculateTarget();
		console.log("Changed Base currency; Calculate Target value", targetValue);
	}

	function updateTargetCurrency(newValue: string): void {
		targetCurrency = newValue;
		targetValue = calculateTarget();
		console.log("Changed Target currency; Calculate Target value", targetValue);
	}
</script>

<div class="wrapper">
	<div class="conversion">
		<span class="base">{Number(1).toLocaleString('en-US', {
			style: 'currency',
			currency: baseCurrency,
			currencyDisplay: 'name'
		})} equals
		</span>
		<span class="target">{baseRates[targetCurrency].toLocaleString('en-US', {
			style: 'currency',
			currency: targetCurrency,
			currencyDisplay: 'name'
		})}
		</span>
	</div>
	<div class="base">
		<input type="number" value={baseValue} oninput={(event) => {
			updateBaseValue(Number(event.currentTarget.value));
		}}>
		<select value={baseCurrency} oninput={(event) => {
			updateBaseCurrency(event.currentTarget.value);
		}}>
			<option value="usd">United States Dollar</option>
			<option value="eur">Euro</option>
			<option value="gbp">Pound Sterling</option>
		</select>
	</div>
	<div class="target">
		<input type="number" value={targetValue} oninput={(event) => {
			updateTargetValue(Number(event.currentTarget.value));
	}}>
		<select value={targetCurrency} oninput={(event) => {
			updateTargetCurrency(event.currentTarget.value);
		}}>
			<option value="usd">United States Dollar</option>
			<option value="eur">Euro</option>
			<option value="gbp">Pound Sterling</option>
		</select>
	</div>
</div>

<style lang="scss">
  .wrapper {
    font-family: Arial, Helvetica, sans-serif;
    background-color: #131313;
    padding: 20px;
    margin: 20px 10px;
    border-radius: 10px;
    .conversion {
      margin-bottom: 20px;
      span.base {
        opacity: 0.6;
        font-size: 14px;
        display: block;
        margin-bottom: 5px;
      }
      span.target {
        font-size: 28px;
        display: block;
      }
    }
    .base {
      margin-bottom: 15px;
    }
    .base,
    .target {
      select,
      input {
        background-color: transparent;
        color: #fff;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 5px;
        padding: 10px;
        &:focus-visible {
          outline: 1px solid rgb(65, 189, 209);
        }
      }
      input {
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
</style>
