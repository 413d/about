import { test, expect } from '@playwright/test';
import { chipColumns } from '../src/lib/chip-columns';

/**
 * The Full-Shelf Rule (DESIGN.md): a chip shelf never strands a single chip on
 * its last row. These cases pin the arithmetic, not the styling.
 */
test('chip shelf columns keep the last row full', () => {
	const cases: Array<[count: number, columns: number | null]> = [
		[0, null],
		[1, null],
		[2, null],
		[3, null],
		[4, 4],
		[5, 5],
		[6, null],
		[7, 4],
		[8, 4],
		[9, null],
		[10, 5],
		[11, 4],
		[12, null]
	];

	for (const [count, expected] of cases) {
		expect(chipColumns(count), `count ${count}`).toBe(expected);
	}
});

test('no count between 3 and 40 ends a row with one chip', () => {
	const offenders: string[] = [];

	for (let count = 3; count <= 40; count += 1) {
		const columns = chipColumns(count) ?? 3;
		const remainder = count % columns;
		const lastRow = remainder === 0 ? columns : remainder;
		if (lastRow === 1) offenders.push(`${count} chips over ${columns} columns`);
	}

	expect(offenders).toEqual([]);
});
