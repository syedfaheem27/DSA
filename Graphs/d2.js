//1. Detect cycle in an undirected graph

//BFS
const Queue = require("../Common/queue");

//nodes 0=>n-1
function detectCycleUnBFS(adj) {
  let V = adj.length;

  let visited = Array.from({ length: V }, () => false);

  const hasCycle = (node, adj, visited) => {
    visited[node] = true;
    const queue = new Queue();
    queue.add([node, -1]);

    while (!queue.isEmpty()) {
      let [n, p] = queue.remove();

      let arr = adj[n];
      for (let i = 0; i < arr.length; i++) {
        let vertex = arr[i];

        if (vertex === n) continue;

        if (vertex === p) continue;

        if (visited[vertex]) return true;

        visited[vertex] = true;
        queue.add([vertex, n]);
      }
    }

    return false;
  };

  for (let i = 0; i < V; i++) {
    if (visited[i] === -1) {
      if (hasCycle(node, adj, visited)) return true;
    }
  }

  return false;
}

//DFS

function detectCycleUnDFS(adj) {
  let V = adj.length;
  let visited = Array.from({ length: V }, () => false);

  const hasCycle = (u, par, adj, vis) => {
    vis[u] = true;

    for (let i = 0; i < adj[u].length; i++) {
      let v = adj[u][i];

      if (v == par) continue;

      if (vis[v]) return true;

      if (this.detectCycle(v, u, adj, vis)) return true;
    }

    return false;
  };

  for (let i = 0; i < V; i++) {
    if (visited[i] === -1) {
      if (hasCycle(node, -1, adj, visited)) return true;
    }
  }

  return false;
}

/*-------------------------------*/

//Detecting a cycle in a directed graph

//basically the node stack keeps track of the path, and if a node is visited and it's there in the stack
//it means we the path to that node must have a cycle. If it's visited, but it's not in the stack, means
//we retreated somewhere and came back from a different path.

//O(V+E)

/**
 * @param {number} V
 * @param {number[][]} adj
 * @returns {boolean}
 */
function detectCyleDirDFS(v, adj) {
  const visited = Array.from({ length: v }, () => false);
  const nodeStack = Array.from({ length: v }, () => false);

  const hasCycle = (node, adj, visited, nodeStack) => {
    visited[node] = true;
    nodeStack[node] = true;

    let neighbours = adj[node];
    for (let i = 0; i < neighbours.length; i++) {
      let vertex = neighbours[i];

      if (visited[vertex]) {
        if (nodeStack[vertex]) return true;
        else continue;
      }

      if (hasCycle(vertex, adj, visited, nodeStack)) return true;
    }
    nodeStack[node] = false;

    return false;
  };

  for (let i = 0; i < v; i++) {
    if (hasCycle(i, adj, visited, nodeStack)) return true;
  }

  return false;
}

/*-----------------------------------------*/

//Find Eventual safe states

//a terminal node is one with no outbound connections. Find safe nodes => terminal + nodes whose all
//outbound conns end in a terminal node

function eventualSafeStates(graph) {
  let v = graph.length;

  let visited = Array.from({ length: v }, () => false);
  let terminal = Array.from({ length: v }, () => true);
  let stack = Array.from({ length: v }, () => false);

  for (let i = 0; i < v; i++) {
    if (!visited[i]) isSafe(i, graph, visited, terminal, stack);
  }

  let result = [];
  for (let i = 0; i < v; i++) if (terminal[i]) result.push(i);

  return result;
}

function isSafe(node, graph, visited, terminal, stack) {
  if (visited[node]) {
    if (stack[node]) return false;
    if (terminal[node]) return true;
  }

  visited[node] = true;
  stack[node] = true;
  let neighbours = graph[node];

  for (const vertex of neighbours) {
    if (!isSafe(vertex, graph, visited, terminal, stack)) {
      terminal[node] = false;
      stack[node] = false;
      return false;
    }
  }

  stack[node] = false;
  return true;
}
