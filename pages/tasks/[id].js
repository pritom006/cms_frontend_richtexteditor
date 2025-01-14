// pages/tasks/[id].js
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

const CKEditor = dynamic(() => import('@ckeditor/ckeditor5-react').then(mod => mod.CKEditor), { ssr: false });
const ClassicEditor = dynamic(() => import('@ckeditor/ckeditor5-build-classic'), { ssr: false });

const TaskDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [task, setTask] = useState(null);
    const [content, setContent] = useState('');

    useEffect(() => {
        if (id) {
            const fetchTask = async () => {
                try {
                    const response = await axiosInstance.get(`tasks/${id}/`);
                    setTask(response.data);
                    setContent(response.data.content.content);
                } catch (error) {
                    console.error('Failed to fetch task', error);
                }
            };

            fetchTask();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`content/${task.content.id}/`, {
                title: task.content.title,
                content: content,
            });
            alert('Content updated successfully');
        } catch (error) {
            console.error('Failed to update content', error);
            alert('Failed to update content');
        }
    };

    if (!task) return <div className="text-center text-xl font-semibold text-gray-700">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">{task.content.title}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
                    <CKEditor
                        editor={ClassicEditor}
                        data={content}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setContent(data);
                        }}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Update Content
                </button>
            </form>
        </div>
    );
};

export default TaskDetail;
