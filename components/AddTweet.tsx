'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const tweetSchema = z.object({
  tweet: z.string().min(1, "Tweet can't be empty").max(280, "Tweet can't exceed 280 characters"),
});

type TweetFormData = z.infer<typeof tweetSchema>;

const AddTweet: React.FC = () => {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<TweetFormData>({
    resolver: zodResolver(tweetSchema),
  });

  const onSubmit = async (data: TweetFormData) => {
    try {
      const res = await fetch('/api/tweet', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to post tweet');
      }

      reset();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div>
        <textarea
          {...register('tweet')}
          placeholder="What's happening?"
          className="w-full p-2 border rounded"
        />
        {errors.tweet && <p className="text-red-500">{errors.tweet.message}</p>}
      </div>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
        disabled={isSubmitting}
      >
        Tweet
      </button>
    </form>
  );
};

export default AddTweet;
