/**
 * Chips sit in three columns on wide cards. A count that leaves a single chip
 * alone on its last row breaks the shelf, so the count gets a column number
 * that fills its rows instead — the Full-Shelf Rule in DESIGN.md.
 *
 * Preference order:
 *   1. three columns, when the count divides by three;
 *   2. an exact fit at four or five columns;
 *   3. four or five columns that leave a remainder other than one, so no row
 *      ends with a single stretched chip;
 *   4. three columns, which is the only answer left for a prime count.
 *
 * Returning null means "keep the default three columns".
 */
export function chipColumns(count: number): number | null {
	if (count < 3) return null;
	if (count % 3 === 0) return null;

	const exact = [4, 5].find((columns) => count % columns === 0);
	if (exact !== undefined) return exact;

	const tidy = [4, 5].find((columns) => count % columns !== 1);
	return tidy ?? null;
}
