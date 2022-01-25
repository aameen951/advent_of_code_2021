import fs from 'fs';
import { max, min, sum } from './helpers';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day7.txt", {encoding:"utf8"}).trim();

/// INPUT PROCESSING
const input_data = raw_data.split(",").map(x => parseInt(x));
const start = min(input_data);
const end = max(input_data);

/// SHARED
function find_minimum(compute_cost: (d: number) => number) {
  let min = Number.MAX_SAFE_INTEGER;
  for(let v = start; v <= end; v++) {
    const total_cost = sum(input_data.map(x => compute_cost(Math.abs(v-x))));
    if(total_cost < min)min = total_cost;
  }
  return min;
}


/// PART ONE
part_one_solution = find_minimum(d => d);

/// PART TWO
part_two_solution = find_minimum(d => d * (d+1) / 2);

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
