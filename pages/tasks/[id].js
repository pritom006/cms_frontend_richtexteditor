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

    if (!task) return <div>Loading...</div>;

    return (
        <div>
            <h1>{task.content.title}</h1>
            <form onSubmit={handleSubmit}>
                <CKEditor
                    editor={ClassicEditor}
                    data={content}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setContent(data);
                    }}
                />
                <button type="submit">Update Content</button>
            </form>
        </div>
    );
};

export default TaskDetail;