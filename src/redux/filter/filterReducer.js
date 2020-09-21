import FILTER_TYPES from './filterTypes';

const INITIAL_STATE = {
  algorithms: [
    {
      id: 0,
      type: 'unweighted',
      name: 'Breadth First Search',
      abbreviation: 'BFS',
      description: 'BFS is unweighted & gives shortest path',
      complexity: 'O(V+E)',
    },
    {
      id: 1,
      type: 'unweighted',
      name: 'Depth First Search',
      abbreviation: 'DFS',
      description: "DFS is unweighted & doesn't guarantee shortest path",
      complexity: ' O(V+E)',
    },
    {
      id: 2,
      type: 'weighted',
      name: "Dijkstra's Algorithm",
      description: 'Dijkstra algorithm is weighted & guarantees shortest path',
      complexity: 'O(E + VlogV)',
    },
    {
      id: 3,
      type: 'weighted',
      name: 'A* Algorithm',
      description: 'A* algorithm uses heuristics to find the shortest path',
    },
    {
      id: 4,
      type: 'weighted',
      name: 'Bidirectional Dijkstra',
      description:
        'Bidirectional Dijkstra is weighted & guarantees shortest path',
      complexity: 'O(E + VlogV)',
    },
    {
      id: 5,
      type: 'weighted',
      name: 'Bidirectional A*',
      description: 'Bidirectional A* uses heuristics to find the shortest path',
    },
  ],
  currentAlg: 0,
};

const filterReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FILTER_TYPES.CHOOSE_ALGO:
      return {
        ...state,
        currentAlg: action.payload,
      };

    default:
      return state;
  }
};

export default filterReducer;
