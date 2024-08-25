import { getServerSession } from 'next-auth/next';
import AddTweet from '@/components/AddTweet';
import { authOptions } from './lib/auth';

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user?.id) {
    return (
      <div>
        <p>You need to be logged in to post tweets.</p>
      </div>
    );
  }

  const userId = parseInt(session.user.id, 10);

  return (
    <div>
      <h1 className="text-2xl font-bold">Home</h1>
      <AddTweet userId={userId} />
      {/* Other components or content */}
    </div>
  );
}
