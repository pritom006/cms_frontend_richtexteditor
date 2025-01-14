// // pages/tasks.js
// import React, { useEffect, useState } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import Link from 'next/link';

// const Tasks = () => {
//     const [tasks, setTasks] = useState([]);

//     useEffect(() => {
//         const fetchTasks = async () => {
//             try {
//                 const response = await axiosInstance.get('tasks/');
//                 setTasks(response.data);
//             } catch (error) {
//                 console.error('Failed to fetch tasks', error);
//             }
//         };

//         fetchTasks();
//     }, []);

//     return (
//         <div>
//             <h1>Tasks</h1>
//             <ul>
//                 {tasks.map((task) => (
//                     <li key={task.id}>
//                         <Link href={`/tasks/${task.id}`} passHref>
//                             <span>{task.content.title}</span>
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default Tasks;

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
        <div className="container mx-auto mt-8 px-4">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6">Tasks</h1>
            <ul className="space-y-4">
                {tasks.map((task) => (
                    <li key={task.id} className="hover:bg-gray-100 p-3 rounded-lg">
                        <Link href={`/tasks/${task.id}`} passHref>
                            <span className="text-blue-600 hover:underline">{task.content.title}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tasks;
