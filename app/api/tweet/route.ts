import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';
import { prisma } from '@/prisma/prisma';

const tweetSchema = z.object({
  tweet: z.string().min(1).max(280),
});

export async function POST(req: NextApiRequest, res: NextApiResponse) {
  try {
    const body = await req.json();
    const { tweet } = tweetSchema.parse(body);

    const newTweet = await prisma.tweet.create({
      data: {
        tweet,
        userId: 1,
      },
    });

    return res.status(201).json(newTweet);
  } catch (error) {
    console.error('Failed to post tweet:', error);
    return res.status(400).json({ error: 'Invalid tweet data' });
  }
}
