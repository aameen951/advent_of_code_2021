import fs from 'fs';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day1.txt", {encoding:"utf8"}).trim();

// INPUT PROCESSING
const numbers = raw_data.split("\n").map(n => parseInt(n.trim()));

/// PART ONE
{
  let prev = numbers[0];
  for(let i=1; i<numbers.length; i++) {
    const curr = numbers[i];
    if(curr > prev) {
      part_one_solution++;
    }
    prev = curr;
  }
}

/// PART TWO
{
  for(let i=3; i<numbers.length; i++) {
    const s1 = numbers[i-3] + numbers[i-2] + numbers[i-1];
    const s2 = numbers[i-2] + numbers[i-1] + numbers[i-0];
    if(s2 > s1) {
      part_two_solution++;
    }
  }
}

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
