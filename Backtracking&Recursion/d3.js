const Queue = require("../Common/queue");

//Subset Sum I(GFG)
function subsetSums(arr, n) {
  let result = [];

  getSums(0, arr, 0, result);
  return result;
}

//DFS type appraoch
// getSums(index,arr,sum,res){
//     if(index>arr.length)
//         return;

//     if(index===arr.length)
//         res.push(sum);

//     getSums(index+1,arr,sum+arr[index],res);
//     getSums(index+1,arr,sum,res);
// }

//BFS type approach
function getSums(index, arr, sum, result) {
  result.push(sum);

  for (let i = index; i < arr.length; i++) {
    getSums(i + 1, arr, sum + arr[i], result);
  }
}

//Subset Sum II(leetcode)
function subsetsWithDup(nums) {
  let result = [];
  nums.sort((a, b) => a - b);
  getSubsets(0, nums, result, []);
  return result;
}

function getSubsets(index, nums, result, temp) {
  result.push([...temp]);

  for (let i = index; i < nums.length; i++) {
    if (i > index && nums[i] === nums[i - 1]) continue;
    temp.push(nums[i]);
    getSubsets(i + 1, nums, result, temp);
    temp.pop();
  }
}

/*--------------------------------------------------------------*/

//Permutations I(leetcode)

//TC O(n!*n) - overall there are n! permutations and for each permutation, i have to make n calls.
//SC O(n+n) => O(n)

//Using a queue
function permutationsI(nums) {
  const queue = new Queue();
  for (let n of nums) queue.add(n);

  let result = [];

  const getAllPermutations = (queue, result, temp) => {
    if (queue.length === 0) {
      result.add([...temp]);
      return;
    }

    let len = queue.length;

    for (let i = 0; i < len; i++) {
      temp.push(queue.remove());
      getAllPermutations(queue, result, temp);
      queue.add(temp.pop());
    }
  };

  getAllPermutations(queue, result, []);

  return result;
}

//Using a map
function permutationsII(nums) {
  let map = new Map();

  for (const n of nums) map.set(n, 1);

  let result = [];
  const getAllPermutations = (map, result, temp) => {
    if (map.size === 0) {
      result.push([...temp]);
      return;
    }

    let len = map.size;

    for (const [key, _] of map) {
      if (len === 0) break;

      temp.push(key);
      map.delete(key);
      getAllPermutations(map, result, temp);
      map.set(temp.pop(), 1);
      len--;
    }
  };
  getAllPermutations(map, result, []);

  return result;
}

//Most optimal in case of the space complexity
//not using any additional data structure

function permutationsIII(nums) {
  let result = [];
  const swap = (i, j, arr) => {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  const getPermutations = (index, nums, result) => {
    if (index === nums.length) {
      result.push([...nums]);
      return;
    }

    for (let i = index; i < nums.length; i++) {
      swap(i, index, nums);
      getPermutations(index + 1, nums, result);
      swap(i, index, nums);
    }
  };
  getPermutations(0, nums, result);
}
