//Topological Sort(GFG)

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
