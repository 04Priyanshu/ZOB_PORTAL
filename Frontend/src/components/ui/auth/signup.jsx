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
import store from '../redux/store';
import { setLoading } from '../redux/authSlice';
import { Loader2 } from 'lucide-react';

function Signup() {

  const [input, setInput] = useState({
    fullname: '',
    email: '',
    password: '',
    phonenumber: '',
    role: '',
    file: ''
  });

  const {loading}=useSelector((store)=>store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });

  };

  const handleFileChange = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('password', input.password);
    formData.append('phonenumber', input.phonenumber);
    formData.append('role', input.role);
    if (input.file) {
      formData.append('file', input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
        responseType: "json",
      });

      console.log("Response from API:", res);

      if (res.data.success) {
        toast.success(res.data.message);
       setTimeout(() => navigate('/login'), 1000);  // Ensure toast shows before navigation
      }
    } catch (error) {
      console.log("Signup Error:", error.message);
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
    finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <div>
        <Navbar />
        <div className='flex items-center justify-center min-h-screen bg-gray-100'>
          <div className='bg-white p-8 rounded-lg shadow-lg w-full max-w-md'>
            <h1 className='font-bold text-2xl mb-5 text-center'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
              <div className='mb-4'>
                <Label >Full Name</Label>
                <Input
                  type='text'
                  placeholder='patel'
                  value={input.fullname}
                  name='fullname'
                  onChange={handleChange}

                />
              </div>
              <div className='mb-4'>
                <Label >Email</Label>
                <Input
                  type='email'
                  placeholder='patel@gmail.com'
                  value={input.email}
                  name='email'
                  onChange={handleChange}
                />
              </div>
              <div className='mb-4'>
                <Label >Password</Label>
                <Input
                  type='password'
                  placeholder='Enter your password'
                  value={input.password}
                  name='password'
                  onChange={handleChange}

                />
              </div>
              <div className='mb-4'>
                <Label>Phone Number</Label>
                <Input
                  type='tel'
                  placeholder='8890XXXXXX'
                  value={input.phonenumber}
                  name='phonenumber'
                  onChange={handleChange}
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
                <div className='flex items-center gap-2'>
                  <Label>Profile</Label>
                  <Input
                    accept='image/*'
                    type='file'
                    className='cursor-pointer'
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {
                loading ? <Button className='w-full my-4 bg-red-600 font-semibold hover:bg-red-700'><Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait..</Button> : <Button type='submit' className='w-full my-4 bg-red-600 font-semibold hover:bg-red-700' >Signup</Button>
              }
              <span className='text-sm' >Already  have an account ? <Link to='/login' className='text-red-600 hover:text-red-700'>login</Link></span>
            </form>
          </div>
        </div>
        {loading && (
        <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded-lg shadow-lg text-center'>
            <Loader2 className='h-12 w-12 animate-spin text-blue-500 mx-auto' />
            {}<p className='mt-4 text-lg font-semibold'>Redirecting to Login Page...</p>
          </div>
        </div>
      )}
      </div>
    </div>

  );
}

export default Signup;