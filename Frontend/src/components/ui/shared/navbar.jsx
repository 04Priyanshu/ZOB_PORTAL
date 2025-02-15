import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Button } from '../button'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'


function Navbar() {
    const user=false;
    return (
        <div className='bg-white'>
            <div className='flex justify-between items-center mx-auto max-w-7xl h-16 '>
                <div>
                    <h1 className='text-2xl font-bold'>Blinker <span className='text-[#F83002]'>Loan</span></h1>
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
                                <Link to="/Login"><Button className=" text-black   px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105">Login</Button></Link>
                                <Link to="/Signup"><Button className="bg-[#6A38C2] text-white hover:bg-[#d72a00]  px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105">Signup</Button></Link>
                                
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