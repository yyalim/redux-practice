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

const checkAndDispatch = (store, action) => {
  if(
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().include('bitcon')
  ) {
    return alert('Nope. Thats not a good idea')
  }

  if(
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().include('bitcon')
  ) {
    return alert('Nope. Thats not a good idea')
  }

  return store.dispatch(action)
}

const app = Redux.combineReducers({ todos, goals })

const store = Redux.createStore(app);
