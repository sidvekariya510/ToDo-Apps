import { useGetTodosQuery, useDeleteTodoMutation } from '../api/todoApi';

const TodoList = () => {
    const { data: todos, isLoading, isError, error } = useGetTodosQuery();
    const [deleteTodo] = useDeleteTodoMutation();

    console.log('data', todos)
    console.log('isLoading', isLoading)
    console.log('isError', isError, error)
    if (error) {
        if ('status' in error) {
            // you can access all properties of `FetchBaseQueryError` here
            const errMsg = 'error' in error ? error.error : JSON.stringify(error.data)

            return (
                <div>
                    <div>An error has occurred:</div>
                    <div>{errMsg}</div>
                </div>
            )
        }
        // you can access all properties of `SerializedError` here
        return <div>{error.message}</div>
    }


    return (
        <ul>
            {todos?.map(todo => (
                <li key={todo.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    {todo.title} <button onClick={() => deleteTodo(todo.id)}>❌</button>
                </li>
            ))}
        </ul>
    );
};

export default TodoList;