"use client"; // Add this line at the top

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  username: z.string().min(5, "Username must be at least 5 characters long"),
  email: z.string().email("Invalid email address").endsWith("@zod.com", "Email must be from @zod.com"),
  password: z.string().min(10, "Password must be at least 10 characters long").regex(/\d/, "Password must contain at least one number"),
  bio: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const ProfileEdit: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/users/edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("Profile updated successfully!");
      } else {
        setStatus("Error updating profile.");
      }
    } catch (error) {
      setStatus("Error updating profile.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('username')} placeholder="Username" />
        <input {...register('email')} placeholder="Email" />
        <input {...register('password')} type="password" placeholder="Password" />
        <textarea {...register('bio')} placeholder="Bio" />
        <button type="submit">Update Profile</button>
        {formState.isSubmitting && <p>Submitting...</p>}
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};

export default ProfileEdit;
