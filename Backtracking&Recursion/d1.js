//1. Reverse an array using recursion - use 2 variables
function reverse(arr) {
  const rec = (start, end, arr) => {
    if (start >= end) return arr;

    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    return rec(start + 1, end - 1, arr);
  };

  const res = rec(0, arr.length - 1, [...arr]);
}

// Reverse an array using recursion - use 1 variable

function reverseI(arr) {
  const rec = (start, arr) => {
    let end = arr.length - 1 - start;

    if (start >= end) return arr;

    let temp = arr[start];
    arr[start] = arr[end];
    arr[end] = temp;

    return rec(start + 1, arr);
  };

  const res = rec(0, [...arr]);
  console.log(res);
}

//2. Print all subsequences of an array

//way 1
function print(arr) {
  const res = [];
  const subset = [];
  const index = 0;

  const calcSubsets = (res, subset, index) => {
    res.push([...subset]);

    for (let i = index; i < arr.length; i++) {
      subset.push(arr[i]);

      calcSubsets(res, subset, i + 1);

      subset.pop();
    }
  };

  calcSubsets(res, subset, index);
  console.log(res);
}

//way 2
function printSubsets(arr) {
  const print = (i, subset, res) => {
    if (i >= arr.length) {
      res.push([...subset]);
      return;
    }

    subset.push(arr[i]);
    print(i + 1, subset, res);
    subset.pop();
    print(i + 1, subset, res);
  };
  const res = [];
  print(0, [], res);
  console.log(res);
}

/*-----------------------------*/

/*
Problem statement
Count Number of Maximum Bitwise-OR Subsets(leetcode)
*/

//The maxmimum OR would be the OR of all the nums
//Then find all possible subsets and compute OR for each subset and increment the count

/**
 * @param {number[]} nums
 * @return {number}
 */
var countMaxOrSubsets = function (nums) {
  let maxOrSum = nums.reduce((acc, curr) => {
    return acc | curr;
  }, 0);

  let res = 0;

  const calcOR = (arr) => {
    let orSum = 0;

    for (let i = 0; i < arr.length; i++) orSum |= arr[i];

    return orSum;
  };

  const allSubsets = (index, subset) => {
    if (calcOR(subset) === maxOrSum) res++;

    for (let i = index; i < nums.length; i++) {
      subset.push(nums[i]);

      allSubsets(i + 1, subset);

      subset.pop();
    }
  };

  allSubsets(0, []);

  return res;
};
