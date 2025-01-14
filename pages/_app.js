import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Link from 'next/link';
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
                <Link href="/tasks">Tasks</Link>
                <Link href="/admin">Admin</Link>
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