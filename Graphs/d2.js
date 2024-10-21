//1. Detect cycle in an undirected graph

//BFS
import Queue from "../Common/queue";

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
