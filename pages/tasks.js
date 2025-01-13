// pages/tasks.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';

const Tasks = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axiosInstance.get('tasks/');
                setTasks(response.data);
            } catch (error) {
                console.error('Failed to fetch tasks', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div>
            <h1>Tasks</h1>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <Link href={`/tasks/${task.id}`} passHref>
                            <span>{task.content.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;