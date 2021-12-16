import fs from 'fs';

let part_one_solution = 0;
let part_two_solution = 0;

const raw_data = fs.readFileSync("data/day4.txt", {encoding:"utf8"}).trim();

/// INPUT PROCESSING
const lines = raw_data.split("\n\n");
const draws = lines.splice(0, 1)[0].split(',').map(n => parseInt(n));
const boards = lines
  .map(b => b.trim().split(/\s+/))
  .map(b => {
    return {
      board: new Map(
        b.map((i, idx) => [parseInt(i), {x: idx % 5, y: Math.trunc(idx / 5)}])
      ),
      marked: new Set<number>(),
    };
  });

/// HELPERS
function board_won(board: typeof boards[0]){
  const cols = [0,0,0,0,0], rows = [0,0,0,0,0];
  for(let x of board.marked) {
    const coord = board.board.get(x)!;
    cols[coord.x]++;
    rows[coord.y]++;
  }
  return cols.concat(rows).filter(x => x == 5).length > 0;
}
function sum_board(board: typeof boards[0]){
  return Array.from(board.board.keys())
  .filter(s => !board.marked.has(s) && !isNaN(s))
  .reduce((p,i)=>p + i, 0);
}

let scores: number[] = [];
for(let i=0; i<draws.length; i++) {
  const draw = draws[i];
  for(let board of boards) {
    if(board_won(board))continue;
    if(!board.board.has(draw))continue;
    board.marked.add(draw);
    if(!board_won(board))continue;
    scores.push(sum_board(board) * draw);
  }
}

/// PART ONE
part_one_solution = scores[0];

/// PART TWO
part_two_solution = scores[scores.length-1];

/// OUTPUT
console.log(part_one_solution);
console.log(part_two_solution);
