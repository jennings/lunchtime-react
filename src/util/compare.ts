type Selector<T, TProp> = (item: T) => TProp;
type Comparer<T> = (a: T, b: T) => number;

export function localeCompare(a: string, b: string) {
  return a.localeCompare(b);
}

export function localeCompareWithSelector<T>(selector: Selector<T, string>) {
  return compare(localeCompare, selector);
}

function compare<T, TProp>(compare: Comparer<TProp>, selector: Selector<T, TProp>): Comparer<T> {
  return function(a: T, b: T) {
    return compare(selector(a), selector(b));
  };
}
