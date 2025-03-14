<script lang="ts">
	import dummyRates from '$lib/utils/dummy-rates';
	import { untrack } from 'svelte';

	let baseValue: number | undefined = $state(1);
	let baseCurrency: string = $state("usd");
	let baseRates: Record<string, number> = $derived(dummyRates[baseCurrency]);
	let targetCurrency: string = $state("eur");
	let targetValue: number | undefined = $state();

	$effect(() => {
		targetValue = baseValue && baseRates[targetCurrency] && baseValue * baseRates[targetCurrency];
		console.log('Calculating Target', untrack(() => targetValue));
	});
	$effect(() => {
		baseValue = targetValue && baseRates[targetCurrency] && targetValue / baseRates[targetCurrency];
		console.log('Calculating Base', untrack(() => baseValue));
	});
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
		<!-- specify getter and setter functions for bind:value directive -->
		<input type="number" bind:value={
		() => baseValue,
		(newValue) => {
			if(newValue && newValue < 0) {
				baseValue = 1;
				return;
			}
			baseValue = newValue
		}}>
		<select bind:value={baseCurrency}>
			<option value="usd">United States Dollar</option>
			<option value="eur">Euro</option>
			<option value="gbp">Pound Sterling</option>
		</select>
	</div>
	<div class="target">
		<input bind:value={targetValue} type="number">
		<select bind:value={targetCurrency}>
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
