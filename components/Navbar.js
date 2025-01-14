// // components/Navbar.js
"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Check authentication status when component mounts and when localStorage changes
        const checkAuth = () => {
            const token = localStorage.getItem('access');
            setIsAuthenticated(!!token);
        };

        // Initial check
        checkAuth();

        // Listen for storage changes (in case of login/logout in other tabs)
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        setIsAuthenticated(false);
        router.push('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl">
                    <Link href="/">
                        <span className="cursor-pointer">CMS</span>
                    </Link>
                </div>
                <div className="flex space-x-4">
                    {isAuthenticated ? (
                        // Show these links only when user is logged in
                        <>
                            <Link href="/tasks">
                                <span className="text-white hover:text-gray-400">Tasks</span>
                            </Link>
                            <Link href="/admin">
                                <span className="text-white hover:text-gray-400">Admin</span>
                            </Link>
                            <Link href="/content">
                                <span className="text-white hover:text-gray-400">Content</span>
                            </Link>
                            <button 
                                onClick={handleLogout} 
                                className="text-white hover:text-gray-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        // Show these links only when user is not logged in
                        <>
                            <Link href="/login">
                                <span className="text-white hover:text-gray-400">Login</span>
                            </Link>
                            <Link href="/register">
                                <span className="text-white hover:text-gray-400">Register</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;



