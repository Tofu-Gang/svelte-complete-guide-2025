const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
export const test_data = [
	// each inner array is a table row
	[
		// undefined can be used as an empty cell
		{
			/* A1 */
			value: 'Item',
			bgColor: '#6aa84f',
			color: '#ffffff'
		},
		{ /* B1 */ value: 'Price', bgColor: '#6aa84f', color: '#ffffff' },
		{ /* C1 */ value: 'Quantity', bgColor: '#6aa84f', color: '#ffffff' },
		{ /* D1 */ value: 'Total', bgColor: '#51803d', color: '#ffffff' }
	],
	[{ value: 'Milk' }, { value: '3' }, { value: '2' }, { value: '=MULTIPLY(B2,C2)' }],
	[{ value: 'Oats' }, { value: '4' }, { value: '1' }, { value: '=MULTIPLY(B3,C3)' }],
	[{ value: 'Honey' }, { value: '5' }, { value: '2' }, { value: '=MULTIPLY(B4,C4)' }],
	[{ value: 'Strawberries' }, { value: '2' }, { value: '2' }, { value: '=MULTIPLY(B5,C5)' }],
	[
		{ value: '', bgColor: '#b4a7d6' },
		{ value: '', bgColor: '#b4a7d6' },
		{ value: 'Total', bgColor: '#b4a7d6' },
		{ value: '=SUM(D2,D3,D4,D5)', bgColor: '#8e7eb6' }
	]
];

export type Cell = {
	value?: string;
	bgColor?: string;
	color?: string;
};

// https://stackoverflow.com/questions/9905533/convert-excel-column-alphabet-e-g-aa-to-number-e-g-25
export function alphabetToNumber(letters: string) {
	return letters.split('').reduce((r, a) => r * alphabet.length + parseInt(a, 36) - 9, 0);
}

export function cellToIndex(cell: string) {
	const regex = new RegExp('([0-9]+)|([a-zA-Z]+)', 'g');
	const colRow = cell.match(regex);
	return {
		col: alphabetToNumber(colRow?.[0] || ''),
		row: Number(colRow?.[1])
	};
}

// https://www.npmjs.com/package/number-to-excel-header
export function numberToAlphabet(index: number): string {
	index -= 1;

	const quotient = Math.floor(index / 26);
	if (quotient > 0) {
		return numberToAlphabet(quotient) + alphabet[index % 26];
	}

	return alphabet[index % 26];
}
