import fs from 'fs';
import { set_intersect, sum } from './helpers';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day8.txt", {encoding:"utf8"}).trim();

/// UTILITIES
function to_key(s: Set<string>){
  return Array.from(s.keys()).sort().join("");
}

/// INPUT PROCESSING
const lines = raw_data.split("\n")
  .map(l => l.split(" | ").map(x => x.split(" ").map(x => new Set(x.split("")))))
  .map(l => ({input: l[0], output: l[1].map(s => to_key(s))}))


/// PART ONE
const target = new Set([2,3,4,7]);
part_one_solution = sum(lines.map(l => l.output.filter(x => target.has(x.length)).length));

/// PART TWO
function solve(input: Set<string>[]){
  // numbers that can be solved based on the number of segments
  const one = input.filter(x => x.size == 2)[0];
  const seven = input.filter(x => x.size == 3)[0];
  const four = input.filter(x => x.size == 4)[0];
  const eight = input.filter(x => x.size == 7)[0];

  // numbers that can be solved based on known intersection count with other known numbers:
  //  - only six has 6 segments and intersect with one by 1 segment
  //  - only nine has 6 segments and intersect with four by 4 segments
  //  - only three has 5 segments and intersect with one by 2 segment
  //  - only two has 5 segments and intersect with four by 2 segments
  //  - only five has 5 segments and intersect with two by 3 segments
  //  - only zero has 6 segments and intersect with five by 4 segments
  const six   = input.filter(x => x.size == 6 && set_intersect(x, one).size  == 1)[0];
  const nine  = input.filter(x => x.size == 6 && set_intersect(x, four).size == 4)[0];
  const three = input.filter(x => x.size == 5 && set_intersect(x, one).size  == 2)[0];
  const two   = input.filter(x => x.size == 5 && set_intersect(x, four).size == 2)[0];
  const five  = input.filter(x => x.size == 5 && set_intersect(x, two).size  == 3)[0];
  const zero  = input.filter(x => x.size == 6 && set_intersect(x, five).size == 4)[0];

  // Convert the result into a map from key to value
  return new Map([
    zero,one,two,three,four,five,six,seven,eight,nine
  ].map((s, idx) => [to_key(s), idx]));
}

part_two_solution = sum(lines.map(l => {
  const sol = solve(l.input);
  // evaluate the output value based on the solution
  return l.output.reduce((p, i) => p*10 + sol.get(i)!, 0);
}));

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
