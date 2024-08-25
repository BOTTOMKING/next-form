"use client"; // Add this line at the top

import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const schema = z.object({
  tweet: z.string().min(1, "Tweet cannot be empty"),
});

type FormData = z.infer<typeof schema>;

interface AddTweetProps {
  userId: number;
}

const AddTweet: React.FC<AddTweetProps> = ({ userId }) => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const response = await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, userId }),
      });

      if (response.ok) {
        setStatus("Tweet added successfully!");
      } else {
        setStatus("Error adding tweet.");
      }
    } catch (error) {
      setStatus("Error adding tweet.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('tweet')} placeholder="What's happening?" />
        <button type="submit">Tweet</button>
        {formState.isSubmitting && <p>Submitting...</p>}
        {status && <p>{status}</p>}
      </form>
    </div>
  );
};

export default AddTweet;
