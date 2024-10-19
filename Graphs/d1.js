// Number of distinct islands

import Queue from "../Common/queue";

//Approach- Traverse each island in a similar manner
//and use origin shifting and push the co-ordinates as string into a set

//return set size

//DFS approach - TC O(M*N) & SC O(M*N)

//1 => land , 0 => water

function distinctIslandsDFS(grid) {
  let n = grid.length;
  let m = grid[0].length;

  let set = new Set();
  let visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  );

  const dfs = (row, col, arr, baseRow, baseCol) => {
    if (row < 0 || col < 0 || row >= n || col >= m) return;

    if (visited[i][j] || grid[i][j] === 0) return;

    visited[i][j] = true;
    arr.push([i - baseRow, j - baseCol]);

    let delRow = [0, 0, 1, -1];
    let delCol = [1, -1, 0, 0];

    for (let i = 0; i < 4; i++) {
      let numRow = delRow[i] + row;
      let numCol = delCol[i] + col;

      dfs(numRow, numCol, arr, baseRow, baseCol);
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        let arr = [];
        dfs(i, j, i, j);
        set.add(Json.stringify(arr));
      }
    }
  }

  return set.size;
}

//BFS - less optimal than dfs because of enqueing and dequeing
function distinctIslandsBFS(grid) {
  let n = grid.length;
  let m = grid.length;

  let queue = new Queue();
  let set = new Set();
  let visited = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => false)
  );

  const bfs = (queue, arr, baseRow, baseCol) => {
    while (!queue.isEmpty()) {
      let [i, j] = queue.remove();
      visited[i][j] = true;
      arr.push([i - baseRow, j - baseCol]);

      let delRow = [0, 0, 1, -1];
      let delCol = [-1, 1, 0, 0];

      for (let k = 0; k < 4; k++) {
        let numRow = delRow[k] + i;
        let numCol = delCol[k] + j;

        if (numRow < 0 || numRow >= n || numCol < 0 || numCol >= m) continue;

        if (visited[numRow][numCol] || grid[numRow][numCol] !== 1) continue;

        queue.add([numRow, numCol]);
      }
    }
  };

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      if (!visited[i][j] && grid[i][j] === 1) {
        let arr = [];
        queue.add([i, j]);
        bfs(queue, arr, i, j);
        set.add(JSON.stringify(arr));
      }
    }
  }

  return set.size;
}
