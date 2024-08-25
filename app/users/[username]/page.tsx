import prisma from "@/app/lib/prisma";

export default async function UserProfile({ params }: { params: { username: string } }) {
  const user = await prisma.user.findUnique({
    where: { username: params.username },
    include: { tweets: true },
  });

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold">Profile: {user.username}</h1>
      <p>Email: {user.email}</p>
      <p>Bio: {user.bio}</p>
      <h2 className="text-xl font-bold">Tweets</h2>
      {user.tweets.map((tweet) => (
        <div key={tweet.id} className="p-4 border border-gray-200 rounded mb-2">
          <p>{tweet.tweet}</p>
        </div>
      ))}
    </div>
  );
}
