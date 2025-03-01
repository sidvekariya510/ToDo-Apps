import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import { Provider } from 'react-redux';
import { store } from './store/store';
import './App.css'

const App = () => (
  <Provider store={store}>
    <h1>Todo App</h1>
    <TodoForm />
    <TodoList />
  </Provider>
);

export default App;
