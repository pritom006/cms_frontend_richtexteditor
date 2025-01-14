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
        return <p>Loading...</p>;
    }

    if (error) {
        return <p style={{ color: 'red' }}>{error}</p>;
    }

    return content ? (
        <div>
            <h1>Content Details</h1>
            <h2>{content.title}</h2>
            <p>{content.content}</p>
            <p>Status: {content.status}</p>
            <p>Created by: {content.created_by}</p>
            <p>Last modified by: {content.last_modified_by}</p>

            {content.status !== 'APPROVED' && (
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={content.title}
                        onChange={(e) => setContent({ ...content, title: e.target.value })}
                        required
                    />
                    <textarea
                        placeholder="Content"
                        value={content.content}
                        onChange={(e) => setContent({ ...content, content: e.target.value })}
                        required
                    />
                    <button type="submit">Update Content</button>
                </form>
            )}

            <h2>Feedback</h2>
            <ul>
                {feedbacks.length > 0 ? (
                    feedbacks.map((feedback) => (
                        <li key={feedback.id}>
                            <p>{feedback.comment}</p>
                            <p>By User ID: {feedback.user}</p>
                            <p>Created at: {feedback.created_at}</p>
                        </li>
                    ))
                ) : (
                    <p>No feedback available.</p>
                )}
            </ul>
        </div>
    ) : (
        <p>Content not found.</p>
    );
};

export default ContentDetailPage;