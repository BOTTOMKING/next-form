import { prisma } from '@/prisma/prisma';
import { useState } from 'react';
import Link from 'next/link';

const TWEETS_PER_PAGE = 10;

type HomeProps = {
  searchParams: { page?: string };
};

export default async function Home({ searchParams }: HomeProps) {
  const page = parseInt(searchParams.page || '1', 10);
  const offset = (page - 1) * TWEETS_PER_PAGE;

  const tweets = await prisma.tweet.findMany({
    skip: offset,
    take: TWEETS_PER_PAGE,
    include: {
      user: true,
    },
  });

  const totalTweets = await prisma.tweet.count();
  const totalPages = Math.ceil(totalTweets / TWEETS_PER_PAGE);

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Tweets</h1>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id} className="mb-2">
            <Link href={`/tweets/${tweet.id}`}>
              <a>{tweet.tweet} by {tweet.user.username}</a>
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex justify-between mt-4">
        {page > 1 && (
          <Link href={`/?page=${page - 1}`}>
            <a>Previous</a>
          </Link>
        )}
        {page < totalPages && (
          <Link href={`/?page=${page + 1}`}>
            <a>Next</a>
          </Link>
        )}
      </div>
    </div>
  );
}
