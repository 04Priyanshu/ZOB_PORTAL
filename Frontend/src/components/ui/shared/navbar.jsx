import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../button'
import { LogOut, User2 } from 'lucide-react'

function Navbar() {
    const user=false;
    return (
        <div className='bg-white'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16 '>
                <div>
                    <h1 className='text-2xl font-bold'>Job <span className='text-[#F83002]'>Portal</span></h1>
                </div>

                <div className='flex gap-12 items-center'>
                    <ul className='flex font-medium items-center gap-5'>
                        <li>Home</li>
                        <li>Jobs</li>
                        <li>Browse</li>
                    </ul>
                    {
                        !user ?(
                            <div className='flex items-center gap-2'>
                                <Button className="bg-blue-500 text-white hover:bg-blue-600 rounded-full px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105">Login</Button>
                                <Button className="bg-[#F83002] text-white hover:bg-[#d72a00] rounded-full px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105">Signup</Button>
                            </div>
                        ):(
                            <Popover >
                        <PopoverTrigger asChild>
                            <Avatar className='w-10 h-10 rounded-full cursor-pointer'>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='w-full h-full rounded-full' />
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className='w-80 p-4'>
                            <div className='flex items-center gap-4'>
                                <Avatar className='w-8 h-8 rounded-full cursor-pointer'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" className='w-full h-full rounded-full' />
                                </Avatar>
                                <div>
                                    <h4 className='font-medium'>Patel mern stack</h4>
                                    <p className='text-sm text-gray-500'>Lorem ipsum dolor sit amet.</p>

                                </div>
                            </div>

                            <div className='flex flex-col text-gray-600 my-2'>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'><User2/><Button variant="link"> View Profile</Button></div>
                                <div className='flex w-fit items-center gap-2 cursor-pointer'><LogOut/><Button variant="link"> Logout</Button></div>
                            </div>
                        </PopoverContent>
                    </Popover>
                        )
                    }

                    
                </div>
            </div>


        </div>
    )
}

export default Navbar