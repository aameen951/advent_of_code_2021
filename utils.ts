
// return an array of `count` elements like: [0, 1, ..., count-1] 
export function rng(count: number) {
  const arr = new Array(count);
  for(let i=0; i<count; i++)arr[i] = i;
}
