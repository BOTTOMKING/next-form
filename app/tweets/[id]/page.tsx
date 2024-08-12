import { prisma } from '@/prisma/prisma';

export default async function TweetDetail({ params }) {
  const tweet = await prisma.tweet.findUnique({
    where: { id: parseInt(params.id, 10) },
    include: {
      user: true,
    },
  });

  if (!tweet) {
    return <div>Tweet not found</div>;
  }

  return (
    <div>
      <h1 className="text-xl font-bold">{tweet.tweet}</h1>
      <p>by {tweet.user.username}</p>
      <p>{tweet.createdAt.toDateString()}</p>
    </div>
  );
}
