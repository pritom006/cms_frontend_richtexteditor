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
        <div>
            <h1>Admin Dashboard</h1>
            <h2>Assign Task</h2>
            <form onSubmit={handleAssignTask}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
                <select
                    value={assignedTo}
                    onChange={(e) => setAssignedTo(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Content Writer</option>
                    {Array.isArray(users) && users.filter(user => user.role === 3).map(user => (
                        <option key={user.email} value={user.email}>{user.email}</option>
                    ))}
                </select>
                <select
                    value={contentId}
                    onChange={(e) => setContentId(e.target.value)}
                    required
                >
                    <option value="" disabled>Select Content</option>
                    {Array.isArray(contents) && contents.map(content => (
                        <option key={content.id} value={content.id}>{content.title}</option>
                    ))}
                </select>
                <button type="submit">Assign Task</button>
            </form>
        </div>
    );
};

export default Admin;