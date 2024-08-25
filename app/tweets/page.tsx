"use client"; // Add this line at the top

import { useState, useEffect } from 'react';

const Tweets: React.FC = () => {
  const [tweets, setTweets] = useState<any[]>([]);

  useEffect(() => {
    const fetchTweets = async () => {
      const response = await fetch('/api/tweets');
      const data = await response.json();
      setTweets(data);
    };

    fetchTweets();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold">Tweets</h1>
      <ul>
        {tweets.map((tweet) => (
          <li key={tweet.id}>{tweet.tweet}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tweets;
