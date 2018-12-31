const ADD_TODO = 'ADD_TODO'
const REMOVE_TODO = 'REMOVE_TODO'
const TOGGLE_TODO = 'TOGGLE_TODO'

const ADD_GOAL = 'ADD_GOAL'
const REMOVE_GOAL = 'REMOVE_GOAL'

const RECEIVE_DATA = 'RECEIVE_DATA'

const addTodoAction = todo => ({
  type: ADD_TODO,
  todo
})

const handleSaveTodo = (text, clearInput) => dispatch => {
  API.saveGoal(text)
    .then((todo) => {
      dispatch(addTodoAction(todo))
      clearInput()
    })
    .catch(() => alert('There was an error. Try again.'))
}

const removeTodoAction = id => ({
  type: REMOVE_TODO,
  id
})

const handleDeleteTodo = todo => dispatch => {
  dispatch(removeTodoAction(todo.id))

  API.deleteTodo(todo.id)
    .catch(() => {
      dispatch(addTodoAction(todo))
      alert('An error occurred. Try again')
    })
}

const toggleTodoAction = id => ({
  type: TOGGLE_TODO,
  id
})

const handleSaveToggleTodo = id => dispatch => {
  dispatch(toggleTodoAction(id))

  API.saveTodoToggle(id)
    .catch(() => {
      dispatch(toggleTodoAction(id))
      alert('An error occurred. Try again')
    })
}

const addGoalAction = goal => ({
  type: ADD_GOAL,
  goal
})

const handleSaveGoal = (text, clearInput) => dispatch => {
  API.saveGoal(text)
    .then((goal) => {
      dispatch(addGoalAction(goal))
      clearInput()
    })
    .catch(() => alert('There was an error. Try again.'))
}

const removeGoalAction = id => ({
  type: REMOVE_GOAL,
  id
})

const handleDeleteGoal = goal => dispatch => {
  dispatch(removeGoalAction(goal.id))

  API.deleteGoal(goal.id)
    .catch(() => {
      dispatch(addGoalAction(goal))
      alert('An error occurred. Try again')
    })
}

const receiveDataAction = (todos, goals) => ({
  type: RECEIVE_DATA,
  todos,
  goals
})

const handleFetchData = () => dispatch => {
  Promise.all([
    API.fetchTodos(),
    API.fetchGoals()
  ]).then(([todos, goals]) => {
    dispatch(receiveDataAction(todos, goals))
  })
}

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
    case RECEIVE_DATA:
      return action.todos
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
    case RECEIVE_DATA:
      return action.goals
    default:
      return state
  }
}
// hello world, how are you today!!!
const loading = (state = true, action) => {
  switch(action.type) {
    case RECEIVE_DATA:
      return false
    default:
      return state
  }
}

const thunk = store => next => action => {
  if(typeof action === 'function') {
    return action(store.dispatch)
  }

  return next(action)
}

const checker = store => next => action => {
  if(
    action.type === ADD_TODO &&
    action.todo.name.toLowerCase().includes('bitcoin')
  ) {
    return alert('Nope. Thats not a good idea')
  }

  if(
    action.type === ADD_GOAL &&
    action.goal.name.toLowerCase().includes('bitcoin')
  ) {
    return alert('Nope. Thats not a good idea')
  }

  return next(action)
}

const logger = store => next => action => {
  console.group(action.type)
  console.log(`action ${action.type}`)
  const result = next(action)
  console.log('The new state: ', store.getState())
  console.groupEnd(action.type)

  return result
}

const app = Redux.combineReducers({ todos, goals, loading })
const middlewares = Redux.applyMiddleware(thunk, checker, logger)

const store = Redux.createStore(app, middlewares)
