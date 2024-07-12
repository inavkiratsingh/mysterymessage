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
        <nav className='py-6 md:p-6 sm:py-6 shadow-md'>
            <div className='container mx-auto flex sm:flex-row justify-between items-center'>
                <a href="#" className='lg:text-xl sm:text-nowrap sm:text-lg font-bold md:mb-0'>Unknown Sandesh</a>
                {
                    session ? (
                        <>
                            <span className='mr-4'>Welcome, {user?.username || user?.email}</span>
                            <Button className='w-full md:w-auto' onClick={() => signOut()}>Logout</Button>
                        </>
                    ) : (
                        <Link className='' href='/sign-in'>
                            Login
                        </Link>
                    )
                }
            </div>
        </nav>
    )
}

export default Navbar