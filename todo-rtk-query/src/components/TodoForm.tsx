import { useState } from 'react';
import { useAddTodoMutation } from '../api/todoApi';

const TodoForm = () => {
    const [title, setTitle] = useState('');
    const [addTodoMutation] = useAddTodoMutation();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addTodoMutation({ title, completed: false });
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', justifyContent: 'space-between', width: '300px' }}>
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
            <button type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
