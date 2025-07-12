import React from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import useAuth from '../../Hook/useAuth';
import SocalLogIn from '../SocalLogIn/SocalLogIn';

const LogIn = () => {
    const { signIn } = useAuth()
    const { register, handleSubmit, formState: { errors } } = useForm()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || '/';
    const onsubmit = data => {
        console.log(data)
        signIn(data.email, data.password)
            .then(result => {
                console.log(result)
                navigate(from)
            })
            .catch(error => {
                console.log(error)
            })
    }
    return (
        <div className='bg-green-100  p-6  shadow-2xl'>
            <form onSubmit={handleSubmit(onsubmit)}>
                <h1 className="text-2xl font-bold text-center">Please login now !</h1>
                <fieldset className="fieldset">
                    <label className="label">Email</label>
                    <input type="email"
                        {...register('email', { required: true, })}
                        className="input w-full" placeholder="Email" />
                    {
                        errors.email?.type === 'required' && <p className='text-red-500'>Email is required</p>
                    }
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
                    <button className="btn bg-green-700 text-white mt-2">Login</button>
                </fieldset>
                <p><small>Don't have an account <Link state={{from}} className='text-red-400 font-bold btn btn-link -ml-3 mb-1' to='/register'>Register</Link></small></p>
            </form>
            <SocalLogIn></SocalLogIn>
        </div>
    );
};

export default LogIn;