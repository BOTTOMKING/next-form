import { useState, useEffect } from 'react';

export default function SearchPage() {
  const [keyword, setKeyword] = useState('');
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch(`/api/tweets?keyword=${keyword}`);
      const data = await response.json();
      setTweets(data);
    };

    if (keyword) {
      fetchTweets();
    }
  }, [keyword]);

  return (
    <div className="container mx-auto max-w-md py-12">
      <h1 className="text-2xl font-bold">Search Tweets</h1>
      <input
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="block w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div>
        {tweets.map((tweet) => (
          <div key={tweet.id} className="p-4 border border-gray-200 rounded mb-2">
            <p>{tweet.tweet}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
