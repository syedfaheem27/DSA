//Combination Sum I(leetcode)

//Here, since u can take a number unlimited amount of times and also a the array has distinct integers,
//we won't have any duplicate combinations.

function combinationSum(target, candidates) {
  let res = [];

  findSum(0, target, [], candidates, res);

  return res;
}

//Also, since a number can be taken unlimited amount of times
//that's why we are not checking for target===0 when index===n
//beacause that will already be considered.

//But if a number had to be taken only once, then we would return only when
//the index goes out of bounds and target < 0, so in that case we would have
//check for target ===0 at index === nums.length only

function findSum(index, target, arr, candidates, res) {
  if (index >= candidates.length || target < 0) return;

  if (target === 0) {
    res.push([...arr]);
    return;
  }

  arr.push(candidates[index]);
  findSum(index, target - candidates[index], arr, candidates, res);
  arr.pop();
  findSum(index + 1, target, arr, candidates, res);
}

//Combination Sum I(GFG)

//here just remove the duplicates in the sorted array and then follow the above approach
//we need to remove the duplicates to get unique combinations

function combinationSum(A, B) {
  A.sort((a, b) => a - b);

  let nums = [];
  for (let i = 1; i < A.length; i++) {
    if (A[i] !== A[i - 1]) nums.push(A[i - 1]);

    if (i === A.length - 1) {
      nums.push(A[i]);
    }
  }

  let res = [];

  getCombinationsI(0, nums, B, [], res);

  return res;
}

function getCombinationsI(index, nums, target, temp, res) {
  if (index >= nums.length || target < 0) return;

  if (target === 0) {
    res.push([...temp]);
    return;
  }

  temp.push(nums[index]);
  getCombinationsI(index, nums, target - nums[index], temp, res);

  temp.pop();
  getCombinationsI(index + 1, nums, target, temp, res);
}

/*--------------------------------------------------------------------*/

//Combination Sum 2 (leetcode)

function combinatonSumII(candidates, target) {
  candidates.sort((a, b) => a - b);

  let res = [];

  getCombinationsII(0, candidates, target, [], res);

  return res;
}

function getCombinationsII(index, candidates, target, temp, res) {
  if (target === 0) {
    res.push([...temp]);
    return;
  }

  for (let i = index; i < candidates.length; i++) {
    if (i > index && candidates[i] === candidates[i - 1]) continue;

    if (candidates[i] > target) break;

    temp.push(candidates[i]);
    getCombinationsII(i + 1, candidates, target - candidates[i], temp, res);
    temp.pop();
  }
}
