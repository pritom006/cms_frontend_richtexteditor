// components/Navbar.js
"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Navbar = () => {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
        router.push('/login');
    };

    return (
        <nav className="bg-gray-800 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <div className="text-white text-xl">
                    CMS
                </div>
                <div className="flex space-x-4">
                    <Link href="/tasks">
                        <span className="text-white hover:text-gray-400">Tasks</span>
                    </Link>
                    <Link href="/admin">
                        <span className="text-white hover:text-gray-400">Admin</span>
                    </Link>
                    <Link href="/register">
                        <span className="text-white hover:text-gray-400">Register</span>
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
                </div>
            </div>
        </nav>
    );
};

export default Navbar;