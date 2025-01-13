// components/TaskList.js
import React from 'react';
import Link from 'next/link';

const TaskList = ({ tasks }) => {
    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">Tasks</h1>
            <ul className="list-disc pl-5">
                {tasks.map((task) => (
                    <li key={task.id} className="mb-2">
                        <Link href={`/tasks/${task.id}`}>
                            <span className="text-blue-500 hover:underline">{task.content.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;