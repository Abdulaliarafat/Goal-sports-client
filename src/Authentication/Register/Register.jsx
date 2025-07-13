import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import axios from 'axios';
import useAuth from '../../Hook/useAuth';
import SocalLogIn from '../SocalLogIn/SocalLogIn';
import useAxios from '../../Hook/useAxios';
import Swal from 'sweetalert2';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const { createUser, updateUserProfile } = useAuth()
    const [profilePic, setProfilePic] = useState('')
    // For registration use Hook
    const axiosInstance = useAxios()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || '/';
    const onRegister = data => {
        createUser(data.email, data.password)
            .then(async (result) => {
                const userInfo = {
                    email: data.email,
                    name: data.name,
                    photo: profilePic,
                    role: 'user',
                    create_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString()
                };
                console.log(result)

                const userRes = await axiosInstance.post('/users', userInfo);
              console.log(userRes.data)
                const userProfile = {
                    displayName: data.name,
                    photoURL: profilePic
                };

                updateUserProfile(userProfile)
                    .then(() => {
                        Swal.fire({
                            icon: 'success',
                            title: 'Account Created!',
                            text: 'Your registration was successful.',
                            confirmButtonColor: '#166534', // Tailwind green-700
                        });
                        navigate(from);
                    })
                    .catch(error => {
                        console.log(error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Profile Update Failed',
                            text: error.message,
                            confirmButtonColor: '#b91c1c', // Tailwind red-700
                        });
                    });
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message,
                    confirmButtonColor: '#b91c1c',
                });
            });
    };

    const handleImageUpload = async (e) => {
        const image = e.target.files[0]
        console.log(image)
        const formData = new FormData();
        formData.append('image', image);
        // image post
        const res = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload}`, formData)

        setProfilePic(res.data.data.url)
    }
    return (
        <div className='bg-green-100 p-6 shadow-2xl'>
            <form onSubmit={handleSubmit(onRegister)}>
                <h1 className="text-2xl font-bold text-center">Create an Account</h1>
                <fieldset className="fieldset">
                    {/* Email */}
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email', { required: true })}
                        className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }
                    {/* Name */}
                    <label className="label">Your name</label>
                    <input type="text"
                        {...register('name', { required: true })}
                        className="input w-full" placeholder="Your name" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Your name is required</p>
                    }
                    {/* Photo */}
                    <label className="label">Profile image</label>
                    <input type="file"
                        onChange={handleImageUpload}
                        className="input w-full" placeholder="Profile image" />

                    {/* password */}
                    <label className="label">Password</label>
                    <input type="password"
                        {...register('password',
                            {
                                required: true,
                                minLength: 6,

                            })}
                        className="input w-full" placeholder="Password" />
                    {
                        errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>
                    }
                    {
                        errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 charectes or longer</p>
                    }
                    <div><a className="link link-hover font-bold text-md mt-2">Forgot password?</a></div>
                    <button className="btn bg-green-700 text-white mt-2">Register</button>
                </fieldset>
                <p><small>Already have account <Link className='text-red-400  btn btn-link -ml-3 ' to='/login'>LogIn</Link></small></p>
            </form>
            <SocalLogIn></SocalLogIn>
        </div>
    );
};

export default Register;