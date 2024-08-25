import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prisma';
import { z } from 'zod';

const tweetSchema = z.object({
  tweet: z.string().min(1, "Tweet cannot be empty"),
  userId: z.number(), // Ensure userId is provided
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = tweetSchema.parse(body);

    const newTweet = await prisma.tweet.create({
      data: {
        tweet: parsed.tweet,
        userId: parsed.userId, // Include the userId field
      },
    });

    return NextResponse.json(newTweet, { status: 201 });
  } catch (error) {
    console.error('Error creating tweet:', error);
    return NextResponse.json({ error: 'Error creating tweet' }, { status: 500 });
  }
}
