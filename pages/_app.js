import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
    const router = useRouter();

    useEffect(() => {
        const accessToken = localStorage.getItem('access');
        if (!accessToken && router.pathname !== '/login') {
            router.push('/login');
        }
    }, [router]);

    return (
        <>
            <nav>
                <a href="/tasks">Tasks</a>
                <a href="/admin">Admin</a>
                <button onClick={() => {
                    localStorage.removeItem('access');
                    localStorage.removeItem('refresh');
                    router.push('/login');
                }}>Logout</button>
            </nav>
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;