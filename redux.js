const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const addTodoAction = todo => ({
  type: ADD_TODO,
  todo
})

const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id
})

const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
})

const addGoalAction = goal => ({
  type: ADD_GOAL,
  goal
})

const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
})

const todos = (state = [], action) => {
  switch(action.type) {
    case ADD_TODO:
      return [...state, action.todo]
    case REMOVE_TODO:
      return state.filter(todo => todo.id !== action.id)
    case TOGGLE_TODO:
      return state.map(todo => todo.id !== action.id
        ? todo
        : Object.assign({}, todo, { complete: !todo.complete })
      )
    default:
      return state
  }
}

const goals = (state = [], action) => {
  switch(action.type) {
    case ADD_GOAL:
      return [...state, action.goal]
    case REMOVE_GOAL:
      return state.filter(goal => goal.id !== action.id)
    default:
      return state
  }
}

const app = (state = {}, action) => ({
  todos: todos(state.todos, action),
  goals: goals(state.goals, action)
})

const createStore = (reducer) => {
  let state
  const listeners = []

  const getState = () => state

  const subscribe = listener => {
    listeners.push(listener)

    return () => {
      listeners = listeners.filter(l => l !== listener)
    }
  }

  const dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach(listener => { listener() })
  }

  return {
    getState,
    subscribe,
    dispatch
  }
}

const store = createStore(app);
