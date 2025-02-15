import React, { useState } from 'react';
import Navbar from '../shared/navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../input';
import { RadioGroup } from '@radix-ui/react-radio-group';
import { Button } from '../button';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { USER_API_END_POINT } from '../../../utils/constant.js'
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '../redux/authSlice';
import store from '../redux/store';
import { Loader2 } from 'lucide-react';

function Login() {

  const [input, setInput] = useState({
    email: '',
    password: '',
    role: ''
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));//slice k actions dispatch hote hai 
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      })

      if (res.data.success) {
        navigate('/');
        toast.success(res.data.message);
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.message);

    }
    finally {
      dispatch(setLoading(false));
    }
  }

  return (
    <div>
      <div>
        <Navbar />
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='font-bold text-2xl mb-5 text-center'>Login</h1>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <Label >Email</Label>
                <Input
                  type='email'
                  placeholder='patel@gmail.com'
                  name='email'
                  onChange={handleChange}
                  value={input.email}

                />
              </div>
              <div className='mb-4'>
                <Label >Password</Label>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  name='password'
                  onChange={handleChange}
                  value={input.password}


                />
              </div>
              <div className='mb-4'>

                <RadioGroup
                  className='flex items-center gap-4 my-5'
                >
                  <div className='flex items-center space-x-2 '>
                    <Input
                      type='radio'
                      name="role"
                      checked={input.role === 'student'}
                      onChange={handleChange}
                      value='student'
                      className='w-4 h-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
                    />
                    <Label className='cursor-pointer' htmlFor='r1'>Student</Label>
                  </div>
                  <div className='flex items-center space-x-2 '>
                    <Input
                      type='radio'
                      name="role"
                      value='recrutier'
                      checked={input.role === 'recrutier'}
                      onChange={handleChange}
                      className='w-4 h-4 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer'
                    />
                    <Label className='cursor-pointer' htmlFor='r2'>recrutier</Label>
                  </div>
                </RadioGroup>
                {
                  loading ? <Button className='w-full my-4 bg-red-600 font-semibold hover:bg-red-700'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button> : <Button type='submit' className='w-full my-4 bg-red-600 font-semibold hover:bg-red-700' >Login</Button>
                }
              </div>

              <span className='text-sm' >Create a new account ?<Link to='/signup' className='text-red-600 hover:text-red-700 mx-1'>signup</Link></span>
            </form>
          </div>
        </div>
        {loading && (
  <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
    <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
      <div className='animate-float'>
        <Loader2 className='h-12 w-12 text-blue-500 mx-auto' />
      </div>
      <p className='mt-4 text-lg font-semibold text-gray-700'>Redirecting to Home Page...</p>
    </div>
  </div>
)}
      </div>
    </div>

  );
}

export default Login