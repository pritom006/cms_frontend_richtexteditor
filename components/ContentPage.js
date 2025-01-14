
import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';

const ContentPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Fetch existing contents
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axiosInstance.get('content/');
                setContents(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch contents', error);
                setError('Failed to fetch contents');
                setLoading(false);
            }
        };

        fetchContents();
    }, []);

    // Handle content submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('content/', {
                title,
                content,
            });
            setMessage('Content submitted successfully!');
            setContents([...contents, response.data]);
            setTitle('');
            setContent('');
        } catch (error) {
            console.error('Failed to submit content', error);
            setError('Failed to submit content');
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex flex-col items-center justify-center p-8">
            <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-xl">
                <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">Content Management</h1>
                {message && <p className="text-green-500 mb-4">{message}</p>}
                {error && <p className="text-red-500 mb-4">{error}</p>}

                {/* Form for content submission */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            placeholder="Enter content title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                        <textarea
                            id="content"
                            placeholder="Enter content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                        Submit Content
                    </button>
                </form>

                {/* List of existing contents */}
                <h2 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Existing Contents</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <ul className="space-y-6">
                        {contents.length > 0 ? (
                            contents.map((c) => (
                                <li key={c.id} className="bg-white p-6 rounded-lg shadow-md">
                                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                        <Link href={`/content?id=${c.id}`} className="text-blue-600 hover:text-blue-800">
                                            {c.title}
                                        </Link>
                                    </h3>
                                    <p className="text-gray-600">{c.content}</p>
                                    <p className="text-sm text-gray-500">Status: {c.status}</p>
                                    <p className="text-sm text-gray-500">Created by: {c.created_by}</p>
                                    <p className="text-sm text-gray-500">Last modified by: {c.last_modified_by}</p>
                                </li>
                            ))
                        ) : (
                            <p>No content available.</p>
                        )}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default ContentPage;
