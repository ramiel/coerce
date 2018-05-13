export function moreThan(v) { return x => x > v; }
export function moreThanEqual(v) { return x => x >= v; }
export function multipleOf(v) { return x => x % v === 0; }
