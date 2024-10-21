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

/*------------------------------------*/

//Print all subsequences who sum is k

function subsequenceSumK(k, arr) {
  let n = arr.length;

  const calculate = (index, subset, sum) => {
    if (sum === k) {
      console.log(subset);
    }

    for (let i = index; i < n; i++) {
      subset.push(arr[i]);

      calculate(i + 1, subset, sum + arr[i]);
      subset.pop();
    }
  };

  calculate(0, [], 0);
}

/*----------------------------*/

//Print the first subsequence who sum is k - don't use global variables

function firstSubSeq_K(k, arr) {
  let n = arr.length;

  const calculate = (index, subset, sum) => {
    if (sum === k) {
      console.log(subset);
      return true;
    }

    for (let i = index; i < n; i++) {
      subset.push(arr[i]);

      let bool = calculate(i + 1, subset, sum + arr[i]);

      if (bool) return true;

      subset.pop();
    }

    return false;
  };

  calculate(0, [], 0);
}

/*-----------------------------------*/

//Count the number of subsequences with sum equal to k - don't use global variables

function countSubSeq_k(k, arr) {
  let n = arr.length;

  const countSubs = (index, sum) => {
    if (index >= n) {
      if (sum === k) return 1;
      else return 0;
    }

    sum += arr[index];
    let l = countSubs(index + 1, sum);

    sum -= arr[index];
    let r = countSubs(index + 1, sum);

    return l + r;
  };

  const count = countSubs(0, 0);

  console.log(count);
}

/*-----------------------------------------*/

//Merge Sort

function mergeSort(arr) {
  //helper
  const mergeSortedArrays = (arr1, arr2) => {
    let n = arr1.length;
    let m = arr2.length;

    let i = 0,
      j = 0;

    let arr = [];

    while (i < n && j < m) {
      if (arr1[i] <= arr2[j]) {
        arr.push(arr1[i]);
        i++;
      } else {
        arr.push(arr2[j]);
        j++;
      }
    }

    for (let k = i; k < n; k++) arr.push(arr1[i]);

    for (let k = j; k < m; k++) arr.push(arr2[k]);

    return arr;
  };

  const divideAndmerge = (start, end) => {
    if (start >= end) return [arr[start]];

    let mid = Math.floor((start + end) / 2);

    let arr1 = divideAndmerge(start, mid);
    let arr2 = divideAndmerge(mid + 1, end);

    return mergeSortedArrays(arr1, arr2);
  };

  return divideAndmerge(0, arr.length - 1);
}

/*------------------------------------*/

//Quick Sort

function quickSort(arr, start, end) {
  if (start >= end) return;
  //helper
  const getPivot = (arr, start, end) => {
    let pivot = start;
    let pivotEl = arr[pivot];
    let insertionIdx = start;

    for (let i = start + 1; i <= end; i++) {
      if (arr[i] < pivotEl) {
        if (arr[insertionIdx] === pivotEl) pivot = i;

        [arr[insertionIdx], arr[i]] = [arr[i], arr[insertionIdx]];
        insertionIdx++;
      }
    }

    [arr[insertionIdx], arr[pivot]] = [arr[pivot], arr[insertionIdx]];

    return insertionIdx;
  };

  let pivotIdx = getPivot(arr, start, end);
  quickSort(arr, start, pivotIdx - 1);
  quickSort(arr, pivotIdx + 1, end);
}
