import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState } from 'react';

const tweetSchema = z.object({
  tweet: z.string().min(1, "Tweet cannot be empty"),
});

type TweetFormData = z.infer<typeof tweetSchema>;

export default function AddTweetPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { register, handleSubmit, formState: { errors } } = useForm<TweetFormData>({
    resolver: zodResolver(tweetSchema),
  });

  const onSubmit: SubmitHandler<TweetFormData> = async (data) => {
    setFormStatus('submitting');
    try {
      await fetch('/api/tweets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      setFormStatus('success');
    } catch (error) {
      console.error('Error posting tweet:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold">Add a Tweet</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label>Tweet</label>
          <textarea {...register('tweet')} className="block w-full" />
          {errors.tweet && <p className="text-red-600">{errors.tweet.message}</p>}
        </div>
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {formStatus === 'submitting' ? 'Posting...' : 'Post Tweet'}
        </button>
        {formStatus === 'success' && (
          <p className="text-sm text-green-600">Tweet posted successfully!</p>
        )}
        {formStatus === 'error' && (
          <p className="text-sm text-red-600">Error posting tweet.</p>
        )}
      </form>
    </div>
  );
}
