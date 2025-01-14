// import React, { useState, useEffect } from 'react';
// import axiosInstance from '../utils/axiosInstance';
// import { useRouter } from 'next/router';

// const ContentPage = () => {
//     const [title, setTitle] = useState('');
//     const [content, setContent] = useState('');
//     const [contents, setContents] = useState([]);
//     const [loading, setLoading] = useState(true); // Added loading state
//     const [error, setError] = useState('');
//     const [message, setMessage] = useState('');
//     const router = useRouter();

//     // Fetch existing contents
//     useEffect(() => {
//         const fetchContents = async () => {
//             try {
//                 const response = await axiosInstance.get('content/');
//                 setContents(response.data);
//                 setLoading(false); // Set loading to false after data is fetched
//             } catch (error) {
//                 console.error('Failed to fetch contents', error);
//                 setError('Failed to fetch contents');
//                 setLoading(false); // Set loading to false even if there's an error
//             }
//         };

//         fetchContents();
//     }, []);

//     // Handle content submission
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axiosInstance.post('content/', {
//                 title,
//                 content,
//             });
//             setMessage('Content submitted successfully!');
//             setContents([...contents, response.data]);
//             setTitle('');
//             setContent('');
//         } catch (error) {
//             console.error('Failed to submit content', error);
//             setError('Failed to submit content');
//         }
//     };

//     return (
//         <div>
//             <h1>Content Management</h1>
//             {message && <p style={{ color: 'green' }}>{message}</p>}
//             {error && <p style={{ color: 'red' }}>{error}</p>}
//             <form onSubmit={handleSubmit}>
//                 <input
//                     type="text"
//                     placeholder="Title"
//                     value={title}
//                     onChange={(e) => setTitle(e.target.value)}
//                     required
//                 />
//                 <textarea
//                     placeholder="Content"
//                     value={content}
//                     onChange={(e) => setContent(e.target.value)}
//                     required
//                 />
//                 <button type="submit">Submit Content</button>
//             </form>

//             <h2>Existing Contents</h2>
//             {loading ? (
//                 <p>Loading...</p> // Display loading message while fetching data
//             ) : (
//                 <ul>
//                     {contents.length > 0 ? (
//                         contents.map((c) => (
//                             <li key={c.id}>
//                                 <h3>{c.title}</h3>
//                                 <p>{c.content}</p>
//                                 <p>Status: {c.status}</p>
//                                 <p>Created by: {c.created_by}</p>
//                                 <p>Last modified by: {c.last_modified_by}</p>
//                             </li>
//                         ))
//                     ) : (
//                         <p>No content available.</p> // Display message if no content is available
//                     )}
//                 </ul>
//             )}
//         </div>
//     );
// };

// export default ContentPage;


import React, { useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import Link from 'next/link';

const ContentPage = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    // Fetch existing contents
    useEffect(() => {
        const fetchContents = async () => {
            try {
                const response = await axiosInstance.get('content/');
                setContents(response.data);
                setLoading(false); // Set loading to false after data is fetched
            } catch (error) {
                console.error('Failed to fetch contents', error);
                setError('Failed to fetch contents');
                setLoading(false); // Set loading to false even if there's an error
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
        <div>
            <h1>Content Management</h1>
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
                <button type="submit">Submit Content</button>
            </form>

            <h2>Existing Contents</h2>
            {loading ? (
                <p>Loading...</p> // Display loading message while fetching data
            ) : (
                <ul>
                    {contents.length > 0 ? (
                        contents.map((c) => (
                            <li key={c.id}>
                                <h3>
                                    <Link href={`/content?id=${c.id}`}>{c.title}</Link>
                                </h3>
                                <p>{c.content}</p>
                                <p>Status: {c.status}</p>
                                <p>Created by: {c.created_by}</p>
                                <p>Last modified by: {c.last_modified_by}</p>
                            </li>
                        ))
                    ) : (
                        <p>No content available.</p> // Display message if no content is available
                    )}
                </ul>
            )}
        </div>
    );
};

export default ContentPage;
