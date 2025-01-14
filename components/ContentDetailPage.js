import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { useRouter } from 'next/router';

const ContentDetailPage = () => {
    const [content, setContent] = useState(null);
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchContentDetails = async () => {
            try {
                const response = await axiosInstance.get(`content/${id}/`);
                setContent(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch content details', error);
                setError('Failed to fetch content details');
                setLoading(false);
            }
        };

        const fetchFeedbacks = async () => {
            try {
                const response = await axiosInstance.get(`content/${id}/feedback/`);
                setFeedbacks(response.data);
            } catch (error) {
                console.error('Failed to fetch feedbacks', error);
            }
        };

        if (id) {
            fetchContentDetails();
            fetchFeedbacks();
        }
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.put(`content/${id}/`, content);
            alert('Content updated successfully!');
        } catch (error) {
            console.error('Failed to update content', error);
            setError('Failed to update content');
        }
    };

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">{error}</p>;
    }

    return content ? (
        <div className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-500 p-8 flex flex-col items-center">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-4xl">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-4">Content Details</h1>

                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800">{content.title}</h2>
                    <p className="text-gray-600 mt-2">{content.content}</p>
                    <p className="text-sm text-gray-500 mt-2">Status: <span className="font-semibold">{content.status}</span></p>
                    <p className="text-sm text-gray-500">Created by: <span className="font-semibold">{content.created_by}</span></p>
                    <p className="text-sm text-gray-500">Last modified by: <span className="font-semibold">{content.last_modified_by}</span></p>
                </div>

                {content.status !== 'APPROVED' && (
                    <form onSubmit={handleUpdate} className="space-y-6">
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                placeholder="Enter content title"
                                value={content.title}
                                onChange={(e) => setContent({ ...content, title: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        <div>
                            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                            <textarea
                                id="content"
                                placeholder="Enter content"
                                value={content.content}
                                onChange={(e) => setContent({ ...content, content: e.target.value })}
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-teal-600 text-white py-3 rounded-lg hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 transition duration-200"
                        >
                            Update Content
                        </button>
                    </form>
                )}

                <div className="mt-8">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Feedback</h2>
                    {feedbacks.length > 0 ? (
                        <ul className="space-y-4">
                            {feedbacks.map((feedback) => (
                                <li key={feedback.id} className="bg-white p-6 rounded-lg shadow-md">
                                    <p className="text-gray-700">{feedback.comment}</p>
                                    <p className="text-sm text-gray-500 mt-2">By User ID: {feedback.user}</p>
                                    <p className="text-sm text-gray-500">Created at: {feedback.created_at}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-500">No feedback available.</p>
                    )}
                </div>
            </div>
        </div>
    ) : (
        <p className="text-center text-red-500">Content not found.</p>
    );
};

export default ContentDetailPage;
