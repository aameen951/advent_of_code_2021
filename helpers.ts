
export function sum(arr: number[]){return arr.reduce((p, i) => p+i, 0);}
export function avg(arr: number[]){return sum(arr)/arr.length;}
export function min(arr: number[]){return arr.reduce((p, i) => p < i ? p : i, Number.MAX_VALUE);}
export function max(arr: number[]){return arr.reduce((p, i) => p > i ? p : i, Number.MIN_VALUE);}

export function set_union<T>(s1: Set<T>, s2: Set<T>) {
  return new Set<T>([...s1, ...s2]);
}
export function set_intersect<T>(s1: Set<T>, s2: Set<T>) {
  const result = new Set<T>();
  for(let key of s1.keys()) if(s2.has(key))result.add(key);
  return result;
}
export function set_subtract<T>(s1: Set<T>, s2: Set<T>) {
  const result = new Set([...s1]);
  for(let key of s2.keys()) result.delete(key);
  return result;
}
export function set_equal<T>(s1: Set<T>, s2: Set<T>) {
  return s1.size == s2.size && s1.size == set_union(s1, s2).size;
}
