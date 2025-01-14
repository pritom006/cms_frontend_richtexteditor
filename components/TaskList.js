// components/TaskList.js
import React from 'react';
import Link from 'next/link';

const TaskList = ({ tasks }) => {
    return (
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tasks</h1>
            <ul className="list-disc pl-6 space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="hover:bg-gray-100 p-3 rounded-lg">
                        <Link href={`/tasks/${task.id}`}>
                            <span className="text-blue-600 hover:underline">{task.content.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;
