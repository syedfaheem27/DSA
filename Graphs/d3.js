//Topological Sort(GFG)

const Queue = require("../Common/queue");

//DFS approach

function topologicalSort(graph) {
  let v = graph.length;
  let visited = Array.from({ length: v }, () => false);

  let stack = [];
  for (let i = 0; i < v; i++) {
    if (!visited[i]) sort(i, visited, stack, graph);
  }

  return stack.reverse();
}

function sort(node, visited, stack, graph) {
  if (visited[node]) return;

  visited[node] = true;
  for (const v of graph[node]) {
    sort(v, visited, stack, graph);
  }
  stack.push(node);
  return;
}

/*-----------------------------------------------*/

//Kahn's algorithm - write a topological sort

/**
 *
 * @param {number[][]} adj
 * @returns {number[]}
 */
function kahnAlgo(adj) {
  let v = adj.length;

  let indegree = Array.from({ length: v }, () => 0);
  for (let i = 0; i < v; i++) {
    let neigh = adj[i];
    for (let j = 0; j < neigh.length; j++) indegree[neigh[j]]++;
  }

  const queue = new Queue();

  for (let i = 0; i < v; i++) if (indegree[i] === 0) queue.add(i);

  let result = [];
  while (!queue.isEmpty()) {
    let node = queue.remove();

    let neigh = adj[node];

    for (let i = 0; i < neigh.length; i++) {
      let vertex = neigh[i];

      indegree[vertex]--;
      if (indegree[vertex] === 0) queue.add(vertex);
    }

    result.push(node);
  }

  return result;
}

/*--------------------------------------------*/

//Detect a cycle in a directed graph using kahn's algorithm

function detectCycle(adj) {
  const v = adj.length;
  const indegree = Array.from({ length: v }, () => 0);

  for (let i = 0; i < v; i++) {
    let neigh = adj[i];
    for (let j = 0; j < neigh.length; j++) indegree[neigh[j]]++;
  }

  const queue = new Queue();

  for (let i = 0; i < v; i++) if (indegree[i] === 0) queue.add(i);

  let count = 0;
  while (!queue.isEmpty()) {
    const node = queue.remove();
    let neigh = adj[node];

    for (let i = 0; i < neigh.length; i++) {
      const vertex = neigh[j];
      indegree[vertex]--;
      if (indegree[vertex] === 0) queue.add(vertex);
    }
    count++;
  }

  return count !== v;
}
