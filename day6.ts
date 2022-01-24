import fs from 'fs';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day6.txt", {encoding:"utf8"}).trim();

/// HELPERS
function add(set: Map<number, number>, n: number, count = 1){
  set.set(n, (set.get(n) || 0) + count);
}

/// INPUT PROCESSING
const input_counted_set = new Map<number, number>();
raw_data.split(",").forEach(x => add(input_counted_set, parseInt(x)));

/// PROCESSING
function simulate(set: Map<number, number>, days: number) {
  // loop over all the days
  for(let i=0; i<days; i++) {
    // hold the result for the current day simulation
    let out = new Map<number, number>();
    for(let [key, count] of set.entries()) {
      // if the number is zero, set it to 6 and add new set as 8
      if(key == 0) add(out, 6, count), add(out, 8, count);
      // decrement the value for the rest
      else add(out, key-1, count);
    }
    // set the current set to the result of the current day simulation
    set = out;
  }
  // sum the total number of lantern fishes
  return Array.from(set.values()).reduce((p,i) => p+i, 0);
}

/// PART ONE
part_one_solution = simulate(input_counted_set, 80);

/// PART TWO
part_two_solution = simulate(input_counted_set, 256);

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
