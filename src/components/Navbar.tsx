'use client'

import React from 'react'
import { useSession,signOut } from 'next-auth/react'
import Link from 'next/link'
import { User } from 'next-auth'
import { Button } from '@react-email/components'

const Navbar = () => {

    const { data: session } = useSession()
    const user: User = session?.user
    
    

    return (
        <nav className='p-4 md:p-6 shadow-md'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                <a href="#" className='text-xl font-bold mb-4 md:mb-0'>Mystry Message</a>
                {
                    session ? (
                        <>
                            <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                            <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <Link className='w-full md:w-auto' href='/sign-in'>
                            Login
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar