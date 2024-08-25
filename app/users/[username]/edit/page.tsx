import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';
import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import bcrypt from 'bcrypt';

const updateProfileSchema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  email: z.string().email().endsWith('@zod.com', "Email must end with @zod.com"),
  bio: z.string().optional(),
  password: z.string().min(10, "Password must be at least 10 characters long").regex(/[0-9]/, "Password must include at least one number"),
});

type UpdateProfileFormData = z.infer<typeof updateProfileSchema>;

export default function EditProfilePage({ params }: { params: { username: string } }) {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProfileFormData>({
    resolver: zodResolver(updateProfileSchema),
  });

  const onSubmit: SubmitHandler<UpdateProfileFormData> = async (data) => {
    setFormStatus('submitting');
    try {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const response = await fetch('/api/users/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, password: hashedPassword }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      setFormStatus('success');
    } catch (error) {
      console.error('Error updating profile:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold">Edit Profile</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Username</label>
          <input {...register('username')} className="block w-full" />
          {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        </div>
        <div>
          <label>Email</label>
          <input {...register('email')} type="email" className="block w-full" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div>
          <label>Bio</label>
          <input {...register('bio')} className="block w-full" />
        </div>
        <div>
          <label>Password</label>
          <input {...register('password')} type="password" className="block w-full" />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {formStatus === 'submitting' ? 'Saving...' : 'Save Changes'}
        </button>
        {formStatus === 'success' && (
          <p className="text-sm text-green-600">Profile updated successfully!</p>
        )}
        {formStatus === 'error' && (
          <p className="text-sm text-red-600">Error updating profile.</p>
        )}
      </form>
    </div>
  );
}
