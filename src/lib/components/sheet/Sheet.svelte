<script lang="ts">
	import { type Cell, cellToIndex, numberToAlphabet } from '$lib/components/sheet/utils';

	const ROWS_MIN_COUNT = 10;
	const COLUMNS_MIN_COUNT = 10;
	const FUNCTIONS = {
		SUM: {
			REDUCE_INITIAL_VALUE: 0,
			FUNCTION: (previous: number, current: number): number => previous + current
		},
		MULTIPLY: {
			REDUCE_INITIAL_VALUE: 1,
			FUNCTION: (previous: number, current: number): number => previous * current
		}
	}

	// allow the Sheet component to mutate the data by using $bindable rune
	let { data = $bindable([[]]) }: { data?: Cell[][] } = $props();
	let editedCell: string | null = $state(null);
	let selectedCell: string | null = $state(null);
	let selectedCellObject = $derived.by(() => {
		if(!selectedCell) {
			return null;
		} else {
			const [row, column] = selectedCell.split(",").map((value) => Number(value) - 1);
			return data[row]?.[column];
		}
	})
	let rowsCount = $derived(Math.max(data.length, ROWS_MIN_COUNT));
	let columnsCount = $derived.by(() => {
		const largestRowLength = Math.max(...data.map(row => row.length));
		return Math.max(largestRowLength, COLUMNS_MIN_COUNT);
	});

	function init(element: HTMLInputElement) {
		element.focus();
	}

	function setCell(row: number, column: number, prop: "value" | "bgColor" | "color", value: string) {
		if(data[row]) {
			if(data[row][column]) {
				data[row][column][prop] = value;
			} else {
				data[row][column] = {
					[prop]: value
				}
			}
		} else {
			data[row] = [];
			data[row][column] = {
				[prop]: value
			}
		}
	}

	function parseValue(value: string | undefined): string | number {
		if(!value) {
			return "";
		} else if (value.startsWith("=")) {
			const functionName = /(?<==)(.*)(?=\()/.exec(value)[0];
			const params = /(?<=\()(.*)(?=\))/.exec(value)[0].split(",");
			const values = params.map((param) => {
				const cell = cellToIndex(param);
				const value = data[cell.row - 1]?.[cell.col - 1]?.value;
				if(value?.startsWith("=")) {
					// value is another function; parse recursively
					return parseValue(value);
				} else {
					return Number(value);
				}
			});
			return values.reduce((previous, current) => {
				return FUNCTIONS[functionName].FUNCTION(previous, current);
			}, FUNCTIONS[functionName].REDUCE_INITIAL_VALUE);
		} else {
			return value;
		}
	}
</script>

{#if selectedCell}
	<br>
	<label for="bgColor">Background</label>
	<input
		type="color"
		id="bgColor"
		value={selectedCellObject?.bgColor || "#222222"}
		oninput={(event) => {
			const [row, column] = selectedCell.split(",").map((value) => Number(value) - 1);
			setCell(row, column, 'bgColor', event.currentTarget.value);
		}}
	/>
	<br>
	<label for="color">Text Color</label>
	<input
		type="color"
		id="color"
		value={selectedCellObject?.color || "#ffffff"}
		oninput={(event) => {
			const [row, column] = selectedCell.split(",").map((value) => Number(value) - 1);
			setCell(row, column, 'color', event.currentTarget.value);
		}}
	/>
{/if}

<table class="sheet">
	<tbody>
		{#each { length: rowsCount }, row}
			<tr>
				{#each { length: columnsCount }, column}
					{@const cellData = data[row - 1]?.[column - 1]}
					{@const currentCell = `${row},${column}`}
					<!-- first row and first column is a header (th), others are cells (td) -->
					<!-- scope specifies the scope of a header, whether it is a row or column header -->
					<svelte:element
						this={row === 0 || column === 0 ? "th" : "td"}
						scope={row === 0 ? "col" : column === 0 ? "row" : undefined}
						role="button"
						tabindex="0"
						ondblclick={() => {
							if(row > 0 && column > 0) {
								editedCell = currentCell;
							}
						}}
						onclick={() => {
							if(currentCell !== selectedCell && row > 0 && column > 0) {
								selectedCell = currentCell;
								editedCell = null;
							}
						}}
						class:selected={selectedCell === currentCell}
						style:background-color={cellData?.bgColor}
						style:color={cellData?.color}
					>
						{#if row === 0 && column > 0}
							<!-- column headers -->
							{numberToAlphabet(column)}
						{:else if row > 0 && column === 0}
							<!-- row headers -->
							{row}
						{:else if row === 0 && column === 0}
							<!-- top left corner cell -->
							{""}
						{:else if editedCell !== currentCell}
							<!-- data not being edited -->
							{parseValue(cellData?.value)}
						{:else}
							<!-- data being edited -->
							<input
								use:init
								type="text"
								value={cellData?.value || ""}
								style:background-color={cellData?.bgColor}
								style:color={cellData?.color}
								oninput={(event) => setCell(row - 1, column - 1, "value", event.currentTarget.value)}
								onkeydown={(event) => {
									if(event.key === "Enter") {
										editedCell = null;
									}
								}}
							/>
						{/if}
					</svelte:element>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
  .sheet {
    border-collapse: collapse;
    font-family: sans-serif;
    * {
      box-sizing: border-box;
    }
    tr {
      th {
        background-color: #191919;
      }
      td {
        background-color: #222;
      }
      td.selected {
        outline: 2px solid #3257f8;
        outline-offset: -2px;
      }
      th,
      td {
        min-width: 100px;
        height: 30px;
        border: 1px solid #393939;
        span {
          padding: 5px;
          display: inline-block;
        }
        input {
          width: 100%;
          height: 100%;
          padding: 5px;
          margin: 0;
          border: none;
          font-size: 16px;
					// if (background) color is defined in the cell, this style here is overwritten
					// if (background) color is NOT defined in the cell, this is the default
					background-color: #222;
					color: #fff;
        }
      }
    }
  }
</style>