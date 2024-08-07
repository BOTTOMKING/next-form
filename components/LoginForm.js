'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm();
  const [formStatus, setFormStatus] = useState({ success: false, message: '' });
  const router = useRouter();

  const onSubmit = async (data) => {
    clearErrors();
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!result.success) {
      if (Array.isArray(result.errors)) {
        result.errors.forEach((error) => {
          setError(error.path[0], {
            type: 'manual',
            message: error.message,
          });
        });
      } else {
        setFormStatus({ success: false, message: 'An unknown error occurred' });
      }
    } else {
      setFormStatus({ success: result.success, message: result.message });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic mt-2">
                Only @zod.com emails are allowed
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              {...register('username')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && (
              <p className="text-red-500 text-xs italic mt-2">
                Username should be at least 5 characters long.
              </p>
            )}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.password ? 'border-red-500' : ''}`}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-2">
                Password should be at least 10 characters long. Password should contain at least one number (0123456789).
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Log in
            </button>
          </div>
          {formStatus.success && (
            <div className="bg-green-500 text-white p-3 rounded mt-4 flex items-center">
              <svg
                className="w-6 h-6 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m-6 4l-6-6m0 0L3 12m0 0L3 3m0 0h3M12 3h6m0 0h3M21 3v6m0 0v6m0 0v6M3 21h3m0 0h6m0 0h6m0 0h3"
                />
              </svg>
              Welcome back!
            </div>
          )}
          {formStatus.message && !formStatus.success && (
            <p className="text-red-500 text-xs italic mt-2">
              {formStatus.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
