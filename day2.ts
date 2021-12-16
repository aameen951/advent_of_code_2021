import fs from 'fs';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day2.txt", {encoding:"utf8"}).trim();

/// INPUT PROCESSING
const commands = raw_data
  .split("\n")
  .map(c => c.split(" "))
  .map(c => ({command: c[0].trim(), x: parseInt(c[1])}));

/// PART ONE
{
  let x = 0, d = 0;
  commands.forEach(c => {
    if(c.command === 'forward')x += c.x;
    if(c.command === 'down')d += c.x;
    if(c.command === 'up')d -= c.x;
  });
  part_one_solution = x * d;
}

/// PART TWO
{
  let x = 0, d = 0, aim = 0;
  commands.forEach(c => {
    if(c.command === 'down')aim += c.x;
    if(c.command === 'up')aim -= c.x;
    if(c.command === 'forward')x += c.x, d += aim * c.x;
  });
  part_two_solution = x * d;
}

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
