// app/search/page.tsx
"use client"; // Add this line at the top

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  keyword: z.string().min(1, "Keyword cannot be empty"),
});

type FormData = z.infer<typeof schema>;

const SearchPage: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [results, setResults] = useState<any[]>([]);
  const [status, setStatus] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch(`/api/tweets/search?keyword=${data.keyword}`);
      const result = await response.json();
      setResults(result);
      setStatus("Search completed.");
    } catch (error) {
      setStatus("Error during search.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register('keyword')} placeholder="Search tweets..." />
        <button type="submit">Search</button>
        {formState.isSubmitting && <p>Searching...</p>}
        {status && <p>{status}</p>}
      </form>
      <ul>
        {results.map(result => (
          <li key={result.id}>{result.tweet}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
