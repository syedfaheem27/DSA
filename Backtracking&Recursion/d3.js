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
