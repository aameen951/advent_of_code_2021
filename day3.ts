import fs from 'fs';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day3.txt", {encoding:"utf8"}).trim();

// INPUT PROCESSING
const numbers = raw_data.split("\n");

/// HELPERS
function count_zeros_ones(list: string[], at: number){
  let total_ones = 0;
  let total_zeros = 0;
  list.forEach(n => {
    if(n.slice(at, at+1) === '1')total_ones++;
    if(n.slice(at, at+1) === '0')total_zeros++;
  });
  return {total_ones, total_zeros};
}

/// PART ONE
{
  let gamma_rate_bits = "";
  let epsilon_rate_bits = "";
  for(let i=0; i<numbers[0].length; i++) {
    let {total_ones, total_zeros} = count_zeros_ones(numbers, i);
    gamma_rate_bits += total_ones > total_zeros ? "1" : "0";
    epsilon_rate_bits += total_zeros > total_ones ? "1" : "0";
  }
  part_one_solution = parseInt(gamma_rate_bits, 2) * parseInt(epsilon_rate_bits, 2);
}

/// PART TWO
{
  let list = numbers.slice(0);
  for(let i=0; i<numbers[0].length; i++) {
    if(list.length === 1)break;
    let {total_ones, total_zeros} = count_zeros_ones(list, i);
    if(total_ones >= total_zeros)list = list.filter(n => n.slice(i, i+1) === '1');
    if(total_ones <  total_zeros)list = list.filter(n => n.slice(i, i+1) === '0');
  }
  let life_support_rating = list[0];

  list = numbers.slice(0);
  for(let i=0; i<numbers[0].length; i++) {
    if(list.length === 1)break;
    let {total_ones, total_zeros} = count_zeros_ones(list, i);
    if(total_ones <  total_zeros)list = list.filter(n => n.slice(i, i+1) === '1');
    if(total_ones >= total_zeros)list = list.filter(n => n.slice(i, i+1) === '0');
  }
  let co2_scrubber_rating = list[0];

  part_two_solution = parseInt(life_support_rating, 2) * parseInt(co2_scrubber_rating, 2);
}

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
