// pages/admin.js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';

const Admin = () => {
    const [users, setUsers] = useState([]);
    const [contents, setContents] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [assignedTo, setAssignedTo] = useState('');
    const [contentId, setContentId] = useState('');

    useEffect(() => {
        const fetchUsersAndContents = async () => {
            try {
                const usersResponse = await axiosInstance.get('users');
                console.log('Users Response:', usersResponse.data); 
                if (usersResponse.data.success && Array.isArray(usersResponse.data.users)) {
                    setUsers(usersResponse.data.users);
                } else {
                    console.error('Unexpected users response format:', usersResponse.data);
                }
                const contentsResponse = await axiosInstance.get('content/');
                console.log('Contents Response:', contentsResponse.data); 
                if (Array.isArray(contentsResponse.data)) {
                    setContents(contentsResponse.data);
                } else {
                    console.error('Unexpected contents response format:', contentsResponse.data);
                }
            } catch (error) {
                console.error('Failed to fetch users or contents', error);
                if (error.response) {
                    console.error('Error Response:', error.response.data); // Log the detailed error response
                }
            }
        };
        fetchUsersAndContents();
    }, []);

    const handleAssignTask = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('tasks/', {
                title,
                description,
                assigned_to: assignedTo,
                content_id: contentId,
            });
            alert('Task assigned successfully');
        } catch (error) {
            console.error('Failed to assign task', error);
            if (error.response) {
                console.error('Error Response:', error.response.data); // Log the detailed error response
            }
            alert('Failed to assign task');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
                <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Admin Dashboard</h1>
                <h2 className="text-2xl font-medium text-gray-600 mb-4">Assign Task</h2>
                <form onSubmit={handleAssignTask}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-sm font-medium text-gray-600">Title</label>
                        <input
                            id="title"
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-600">Description</label>
                        <textarea
                            id="description"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="mt-1 p-2 w-full h-32 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="assignedTo" className="block text-sm font-medium text-gray-600">Select Content Writer</label>
                        <select
                            id="assignedTo"
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select Content Writer</option>
                            {Array.isArray(users) && users.filter(user => user.role === 3).map(user => (
                                <option key={user.email} value={user.email}>{user.email}</option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="contentId" className="block text-sm font-medium text-gray-600">Select Content</label>
                        <select
                            id="contentId"
                            value={contentId}
                            onChange={(e) => setContentId(e.target.value)}
                            required
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value="" disabled>Select Content</option>
                            {Array.isArray(contents) && contents.map(content => (
                                <option key={content.id} value={content.id}>{content.title}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">Assign Task</button>
                </form>
            </div>
        </div>
    );
};

export default Admin;
