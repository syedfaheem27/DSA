//1. Print from 1 => N using backtracking

function printI(n) {
  if (n < 1) return;

  printI(n - 1);
  console.log(n);
}

//2. Print from N => 1 using backtracking

function printII(i, n) {
  if (i > n) return;

  printII(i + 1, n);
  console.log(i);
}

printII(1, 5);
