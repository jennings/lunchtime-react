export function localeCompare(a, b) {
  return a.localeCompare(b);
}

export function localeCompareWithSelector(selector) {
  return compare(localeCompare, selector);
}

function compare(compare, selector) {
  return function(a, b) {
    compare(selector(a), selector(b));
  };
}
