//Permutations 2 (leetcode)

function perm(nums) {
  nums.sort((a, b) => a - b);
  let result = [];

  getPermutations(0, nums, result);

  return result;
}

function getPermutations(index, nums, result) {
  if (index >= nums.length) {
    result.push([...nums]);
    return;
  }

  let seen = new Set();

  for (let i = index; i < nums.length; i++) {
    if (seen.has(nums[i])) continue;

    seen.add(nums[i]);
    swap(i, index, nums);
    getPermutations(index + 1, nums, result);
    swap(i, index, nums);
  }
}
function swap(i, j, nums) {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}
