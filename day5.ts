import fs from 'fs';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day5.txt", {encoding:"utf8"}).trim();
// const raw_data = `0,9 -> 5,9
// 8,0 -> 0,8
// 9,4 -> 3,4
// 2,2 -> 2,1
// 7,0 -> 7,4
// 6,4 -> 2,0
// 0,9 -> 2,9
// 3,4 -> 1,4
// 0,0 -> 8,8
// 5,5 -> 8,2`;

/// INPUT PROCESSING
const lines = raw_data.split("\n")
  .map(l => l.split(" -> "))
  .map(l => [...l[0].split(","), ...l[1].split(",")].map(x => parseInt(x)))
  .map(l => ({x0: l[0], y0: l[1], x1: l[2], y1: l[3]}));

const axis_aligned_lines = lines.filter(l => l.x0 === l.x1 || l.y0 === l.y1);
const diagonal_lines = lines.filter(l => l.x0 !== l.x1 && l.y0 !== l.y1);

/// HELPERS
function add(diagram: Map<string, number>, x: number, y: number) {
  const key = `${x}|${y}`;
  if(!diagram.has(key))diagram.set(key, 0);
  diagram.set(key, diagram.get(key)! + 1);
}

/// PART ONE
const diagram = new Map<string, number>();
axis_aligned_lines.forEach(l => {
  for(let x=Math.min(l.x0, l.x1); x<=Math.max(l.x0, l.x1); x++) {
    for(let y=Math.min(l.y0, l.y1); y<=Math.max(l.y0, l.y1); y++) {
      add(diagram, x, y);
    }
  }
});
part_one_solution = Array.from(diagram.values()).filter(x => x > 1).length;

/// PART TWO
diagonal_lines.forEach(l => {
  let count = Math.max(l.x0, l.x1) - Math.min(l.x0, l.x1) + 1;
  const dx = l.x0 < l.x1 ? 1 : -1;
  const dy = l.y0 < l.y1 ? 1 : -1;
  let x = l.x0, y = l.y0;
  for(let i=0; i<count; i++) {
    add(diagram, x, y);
    x += dx, y += dy;
  }
});
part_two_solution = Array.from(diagram.values()).filter(x => x > 1).length;

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
